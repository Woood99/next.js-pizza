'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import { CountButton } from './count-button';
import { Button, Dialog } from '../ui';
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details';
import { ChooseProductModal } from './modals';
import { DialogContent, DialogTitle } from '../ui/dialog';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
   className?: string;
   data: ProductWithRelations & {
      price: number;
      count?: number;
   };
}

export const ProductCard: React.FC<Props> = ({ data, className }) => {
   const [openModal, setOpenModal] = useState(false);

   return (
      <>
         <div className={cn(className)}>
            <div onClick={() => setOpenModal(true)}>
               <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                  <img className="w-[215px] h-[215px]" src={data.imageUrl} alt="Logo" />
               </div>
               <Title text={data.name} size="sm" className="mb-1 mt-3 font-bold" />
               {Boolean(data.ingredients.length) && <p className="text-sm text-gray-400">{getCartItemDetails(data.ingredients)}</p>}
               <div className="flex justify-between items-center mt-4">
                  <span className="text-[20px]">
                     от <b>{data.price} ₽</b>
                  </span>

                  {data.count ? (
                     <CountButton value={data.count} size="lg" />
                  ) : (
                     <Button variant="secondary">
                        <Plus size={20} className="mr-1" />
                        Добавить
                     </Button>
                  )}
               </div>
            </div>
         </div>
         <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
            <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden')}>
               <DialogTitle className="visually-hidden">{data.name}</DialogTitle>
               <ChooseProductModal product={data} onSubmit={() => setOpenModal(false)} />;
            </DialogContent>
         </Dialog>
      </>
   );
};
