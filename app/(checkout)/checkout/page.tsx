'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Container, Title } from '@/shared/components/shared';
import { useCart } from '@/shared/hooks/use-cart';
import { CheckoutSidebar } from '@/shared/components/shared/checkout-sidebar';
import { CheckoutCart } from './checkout-cart';
import { CheckoutPersonalForm } from './checkout-personal-form';
import { CheckoutAddress } from './checkout-address';
import { checkoutSchema, CheckoutValues } from '@/shared/constants/schemas';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Api } from '@/shared/services/api-client';

const CheckoutPage = () => {
   const { totalAmount, items, removeCartItem, loading: loadingItems, updateItemQuantity } = useCart();
   const [submitting, setSubmitting] = useState(false);
   const { data: session } = useSession();
   console.log(session);

   const form = useForm<CheckoutValues>({
      resolver: zodResolver(checkoutSchema),
      defaultValues: {
         firstName: session?.user.name || '',
         lastName: '',
         email: '',
         phone: '',
         address: '',
         comment: '',
      },
   });

   useEffect(() => {
      if (!session) return;

      const fetchUserInfo = async () => {
         const data = await Api.auth.getMe();

         const [firstName, lastName] = data.fullName.split(' ');

         form.setValue('firstName', firstName);
         form.setValue('lastName', lastName);
         form.setValue('email', data.email);
      };

      fetchUserInfo();
   }, [session]);

   const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
      const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
      updateItemQuantity(id, newQuantity);
   };

   const onSubmitForm = async (data: CheckoutValues) => {
      try {
         setSubmitting(true);
         const url = await createOrder(data);
         if (url) {
            toast.success('Заказ успешно создан. Переход на оплату...');
            location.href = url;
         } else {
            toast.error('Произошла ошибка, попробуйте позже', {
               icon: '❌',
            });
            setSubmitting(false);
         }
      } catch (error) {
         console.log(error);

         toast.error('Не удалось создать заказ', {
            icon: '❌',
         });
         setSubmitting(false);
      }
   };

   return (
      <Container className="mt-5">
         <Title text="Оформление заказа" size="xl" className="font-extrabold mb-8" />

         <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className="flex gap-3">
               <div className="flex flex-col gap-3 flex-1 mb-20">
                  <CheckoutCart items={items} onClickCountButton={onClickCountButton} removeCartItem={removeCartItem} loadingItems={loadingItems} />
                  <CheckoutPersonalForm />
                  <CheckoutAddress />
               </div>
               <div className="w-[450px]">
                  <CheckoutSidebar totalAmount={totalAmount} loading={loadingItems || submitting} />
               </div>
            </form>
         </FormProvider>
      </Container>
   );
};

export default CheckoutPage;
