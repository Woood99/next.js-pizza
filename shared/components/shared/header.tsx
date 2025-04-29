'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { Container } from './container';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';

interface Props {
   hasSearch?: boolean;
   hasCart?: boolean;
   className?: string;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [openAuthModal, setOpenAuthModal] = useState(false);

   useEffect(() => {
      if (!searchParams.has('paid')) return;
      toast.success('Заказ успешно оплачен! Информация отправлена на почту.');
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete('paid');

      router.replace(`?${newSearchParams.toString()}`, { scroll: false });
   }, []);
   
   useEffect(() => {
      if (!searchParams.has('verified')) return;
      toast.success('Почта подтверждена');
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete('verified');

      router.replace(`?${newSearchParams.toString()}`, { scroll: false });
   }, []);

   return (
      <header className={cn('border-b', className)}>
         <Container className="flex items-center justify-between py-8">
            <Link href="/">
               <div className="flex items-center gap-4">
                  <Image src="/logo.png" alt="Logo" width={35} height={35} />
                  <div>
                     <h1 className="text-2xl uppercase font-black">NEXT PIZZA</h1>
                     <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
                  </div>
               </div>
            </Link>

            {hasSearch && (
               <div className="mx-10 flex-1">
                  <SearchInput />
               </div>
            )}

            <div className="flex items-center gap-3">
               <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
               <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
               {hasCart && (
                  <div>
                     <CartButton />
                  </div>
               )}
            </div>
         </Container>
      </header>
   );
};
