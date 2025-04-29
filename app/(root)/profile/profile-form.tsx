'use client';

import React, { useState } from 'react';
import { User } from '@prisma/client';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authRegisterSchema, AuthRegisterValues } from '@/shared/constants/schemas';
import { signOut } from 'next-auth/react';
import { Container, Title } from '@/shared/components/shared';
import { FormInput } from '@/shared/components/shared/form-components';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { updateUserInfo } from '@/app/actions';

interface Props {
   data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
   const [loadingSignOut, setLoadingSignOut] = useState(false);

   const form = useForm<AuthRegisterValues>({
      resolver: zodResolver(authRegisterSchema),
      defaultValues: {
         fullName: data.fullName,
         email: data.email,
         password: '',
         confirmPassword: '',
      },
   });

   const onSubmit = async (data: AuthRegisterValues) => {
      try {
         await updateUserInfo({
            email: data.email,
            fullName: data.fullName,
            password: data.password,
         });
         toast.success('Данные обновлены');
      } catch (error) {
         console.log(error);
         toast.error('Ошибка при обновлении данных');
      }
   };

   const onClickSignOut = () => {
      setLoadingSignOut(true);
      signOut({
         callbackUrl: '/',
      });
   };

   return (
      <Container className="my-10">
         <Title text={`Личные данные | #${data.id}`} size="md" className="font-bold" />

         <FormProvider {...form}>
            <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
               <FormInput name="email" label="E-Mail" required />
               <FormInput name="fullName" label="Полное имя" required />

               <FormInput type="password" name="password" label="Новый пароль" required />
               <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

               <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
                  Сохранить
               </Button>

               <Button
                  onClick={onClickSignOut}
                  variant="secondary"
                  disabled={form.formState.isSubmitting}
                  loading={loadingSignOut}
                  className="text-base"
                  type="button">
                  Выйти
               </Button>
            </form>
         </FormProvider>
      </Container>
   );
};
