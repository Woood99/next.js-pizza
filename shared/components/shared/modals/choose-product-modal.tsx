'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { Dialog } from '../../ui';
import { DialogContent, DialogTitle } from '../../ui/dialog';
import { useCartStore } from '@/shared/store/cart';

interface Props {
   product: ProductWithRelations;
   className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
   const router = useRouter();
   const firstItem = product.variants[0];
   const isPizzaForm = Boolean(firstItem.pizzaType);
   const addCartItem = useCartStore(state => state.addCartItem);

   const onClickAddCart = (productItemId?: number, ingredients?: number[]) => {
      if (isPizzaForm) {
         if (productItemId && ingredients) {
            addCartItem({
               productItemId,
               ingredients,
            });
         }
      } else {
         addCartItem({
            productItemId: firstItem.id,
         });
      }
   };

   return (
      <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
         <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
            <DialogTitle className="visually-hidden">{product.name}</DialogTitle>
            <ChooseProductForm {...product} onSubmit={onClickAddCart} variant={isPizzaForm ? 'pizza' : 'default'} />
         </DialogContent>
      </Dialog>
   );
};
