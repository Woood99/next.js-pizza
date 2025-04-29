import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useSession } from 'next-auth/react';
import { CircleUser, User } from 'lucide-react';
import { Button } from '../ui';
import Link from 'next/link';

interface Props {
   onClickSignIn: () => void;
   className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
   const { data: session, status } = useSession();

   return (
      <div className={cn(className)}>
         {!session ? (
            <Button onClick={onClickSignIn} variant="outline" loading={status === 'loading'} className={cn('min-w-[120px] gap-1.5')}>
               <User size={16} />
               Войти
            </Button>
         ) : (
            <Link href="/profile">
               <Button variant="secondary" className="gap-2">
                  <CircleUser size={18} />
                  Профиль
               </Button>
            </Link>
         )}
      </div>
   );
};
