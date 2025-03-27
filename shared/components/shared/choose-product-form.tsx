'use client';

import React from 'react';
import { Ingredient, ProductItem } from '@prisma/client';

import { cn } from '@/shared/lib/utils';
import { ProductImage } from './product-image';
import { Title } from './title';
import { GroupVariants } from './group-variants';
import { Button } from '../ui';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { IngredientItem } from './ingredient-item';
import { getPizzaDetails } from '@/shared/lib/get-pizza-details';
import { usePizzaOptions } from '@/shared/hooks/use-pizza-options';

interface Props {
   imageUrl: string;
   name: string;
   ingredients: Ingredient[];
   variants: ProductItem[];
   onSubmit: (itemId?: number, ingredients?: number[]) => void;
   className?: string;
   variant?: 'default' | 'pizza';
}

export const ChooseProductForm: React.FC<Props> = ({ className, name, variants, imageUrl, ingredients, onSubmit, variant }) => {
   const isPizza = variant === 'pizza';

   const { size, type, selectedIngredients, availableSizes, currentItemId, setSize, setType, addIngredient } = usePizzaOptions(variants);

   const { totalPrice, textDetaills } = getPizzaDetails(type, size, variants, ingredients, selectedIngredients, isPizza);

   const handleClickAdd = () => {
      onSubmit(currentItemId, Array.from(selectedIngredients));
   };

   return (
      <div className={cn('flex flex-1', className)}>
         <ProductImage imageUrl={imageUrl} size={size} variant={variant} />

         <div className="flex-grow p-8 flex flex-col">
            <Title text={name} size="md" className="font-extrabold mb-1" />
            {isPizza && (
               <>
                  <p className="text-gray-400">{textDetaills}</p>
                  <div className="mt-6 flex flex-col gap-4 max-w-[400px]">
                     <GroupVariants value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)} items={availableSizes} />
                     <GroupVariants value={String(type)} onClick={value => setType(Number(value) as PizzaType)} items={pizzaTypes} />
                  </div>
                  <div className="mt-6 mb-6 p-0.5 h-[380px] overflow-y-auto overflow-x-hidden scrollbar">
                     <div className="grid grid-cols-3 gap-3">
                        {ingredients.map(ingredient => {
                           return (
                              <IngredientItem
                                 key={ingredient.id}
                                 {...ingredient}
                                 onClick={() => addIngredient(ingredient.id)}
                                 active={selectedIngredients.has(ingredient.id)}
                              />
                           );
                        })}
                     </div>
                  </div>
               </>
            )}

            <Button className="px-10 text-base w-full h-[55px] mt-auto" onClick={handleClickAdd}>
               Добавить в корзину за {totalPrice} ₽
            </Button>
         </div>
      </div>
   );
};
