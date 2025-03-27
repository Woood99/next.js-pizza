import React from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
   imageUrl: string;
   className?: string;
   size: 20 | 30 | 40;
   variant?: 'default' | 'pizza';
}

export const ProductImage: React.FC<Props> = ({ imageUrl, className, size, variant = 'default' }) => {
   return (
      <div className={cn('flex items-center justify-center relative w-[600px] bg-[#FFF7EE] rounded-3xl', className)}>
         <img
            src={imageUrl}
            alt="Logo"
            className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
               'w-[300px] h-[300px]': size === 20,
               'w-[400px] h-[400px]': size === 30,
               'w-[500px] h-[500px]': size === 40,
            })}
         />
         {variant === 'pizza' && (
            <>
               <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
               <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
            </>
         )}
      </div>
   );
};
