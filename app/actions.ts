'use server';

import { PayOrderTemplate } from './../shared/components/shared/email-templates/pay-order';

import { CheckoutValues } from '@/shared/constants/schemas';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus, Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { sendEmail } from '@/shared/lib/send-email';
import { ReactNode } from 'react';
import { createPayment } from '@/shared/lib/create-payment';
import { getUserSession } from '@/shared/lib/get-user-session';
import { hashSync } from 'bcrypt';
import { VerificationUserTemplate } from '@/shared/components/shared/email-templates/verification-user-template';

export async function createOrder(data: CheckoutValues) {
   try {
      const cookieStore = await cookies();
      const cartToken = cookieStore.get('cartToken')?.value;

      if (!cartToken) {
         throw new Error('Token not found');
      }

      const userCart = await prisma.cart.findFirst({
         include: {
            user: true,
            items: {
               include: {
                  ingredients: true,
                  productItem: {
                     include: {
                        product: true,
                     },
                  },
               },
            },
         },
         where: {
            token: cartToken,
         },
      });

      if (!userCart) {
         throw new Error('Cart not found');
      }

      if (userCart?.totalAmount === 0) {
         throw new Error('Cart is empty');
      }

      const order = await prisma.order.create({
         data: {
            token: cartToken,
            status: OrderStatus.PENDING,
            totalAmount: userCart.totalAmount,
            items: JSON.stringify(userCart.items),
            fullName: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            address: data.address,
            comment: data.comment,
         },
      });

      const paymentData = await createPayment({
         amount: order.totalAmount,
         orderId: order.id,
         description: `Оплата заказа #${order.id}`,
      });

      if (!paymentData) {
         throw new Error('Payment data not found');
      }

      await prisma.order.update({
         where: {
            id: order.id,
         },
         data: {
            paymentId: paymentData.id,
         },
      });

      const paymentUrl = paymentData.confirmation.confirmation_url;

      await sendEmail(
         data.email,
         `Next Pizza / Оплатите заказ #${order.id}`,
         PayOrderTemplate({
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl: paymentUrl,
         }) as ReactNode
      );

      return paymentUrl;
   } catch (error) {
      console.log(error);
   }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
   try {
      const currentUser = await getUserSession();

      if (!currentUser) {
         throw new Error('Пользователь не найден');
      }

      const findUser = await prisma.user.findFirst({
         where: {
            id: Number(currentUser.id),
         },
      });

      await prisma.user.update({
         where: {
            id: Number(currentUser.id),
         },
         data: {
            fullName: body.fullName,
            email: body.email,
            password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
         },
      });
   } catch (err) {
      console.log('Error [UPDATE_USER]', err);
      throw err;
   }
}

export async function registerUser(body: Prisma.UserCreateInput) {
   try {
      const user = await prisma.user.findFirst({
         where: {
            email: body.email,
         },
      });

      if (user) {
         if (!user.verified) {
            throw new Error('Почта не подтверждена');
         }

         throw new Error('Пользователь уже существует');
      }

      const createdUser = await prisma.user.create({
         data: {
            fullName: body.fullName,
            email: body.email,
            password: hashSync(body.password, 10),
         },
      });

      const code = Math.floor(100000 + Math.random() * 900000).toString();

      await prisma.verificationCode.create({
         data: {
            code,
            userId: createdUser.id,
         },
      });

      await sendEmail(
         createdUser.email,
         'Next Pizza / 📝 Подтверждение регистрации',
         VerificationUserTemplate({
            code,
         }) as ReactNode
      );
   } catch (err) {
      console.log('Error [CREATE_USER]', err);
      throw err;
   }
}
