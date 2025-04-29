'use client';

import React from 'react';
import { ChooseProductForm } from './choose-product-form';
import { useCartStore } from '@/shared/store/cart';
import { ProductWithRelations } from '@/@types/prisma';
import toast from 'react-hot-toast';

interface Props {
   product: ProductWithRelations;
   onSubmit?: VoidFunction;
}

export const ChooseProduct: React.FC<Props> = ({ product, onSubmit }) => {
   const firstItem = product.variants[0];
   const isPizzaForm = Boolean(firstItem.pizzaType);
   const { addCartItem, loading } = useCartStore(state => state);

   const onClickAddCart = async (productItemId?: number, ingredients?: number[]) => {
      try {
         const itemId = productItemId ?? firstItem.id;
         await addCartItem({
            productItemId: itemId,
            ingredients,
         });
         toast.success(`${isPizzaForm ? `Пицца ${product.name}` : `${product.name}`} добавлен в корзину`);
      } catch (error) {
         toast.error(`Не удалось добавить ${isPizzaForm ? `пиццу ${product.name}` : `${product.name}`} в корзину`);
         console.log(error);
      } finally {
         onSubmit?.();
      }
   };

   return <ChooseProductForm {...product} onSubmit={onClickAddCart} loading={loading} variant={isPizzaForm ? 'pizza' : 'default'} />;
};
