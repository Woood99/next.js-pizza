'use client';

import React, { useState } from 'react';
import { Button, Dialog } from '@/shared/components/ui';
import { DialogContent } from '@/shared/components/ui/dialog';
import { signIn } from 'next-auth/react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';

interface Props {
   open: boolean;
   onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
   const [type, setType] = useState<'login' | 'register'>('login');

   const onSwitchType = () => {
      setType(type == 'login' ? 'register' : 'login');
   };

   const handleClose = () => {
      onClose();
   };

   return (
      <Dialog open={open} onOpenChange={handleClose}>
         <DialogContent className="w-[450px] bg-white">
            {type === 'login' ? <LoginForm onClose={handleClose} /> : <RegisterForm />}
            <hr />
            <div className="flex gap-2">
               <Button
                  variant="secondary"
                  onClick={() => {
                     signIn('github', {
                        callbackUrl: '/',
                        redirect: true,
                     });
                  }}
                  type="button">
                  GitHub
               </Button>
               <Button
                  variant="secondary"
                  onClick={() => {
                     signIn('google', {
                        callbackUrl: '/',
                        redirect: true,
                     });
                  }}
                  type="button">
                  Google
               </Button>
            </div>
            <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
               {type !== 'login' ? 'Войти' : 'Регистрация'}
            </Button>
         </DialogContent>
      </Dialog>
   );
};
