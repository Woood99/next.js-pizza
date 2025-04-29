import React from 'react';
import { cn } from '@/shared/lib/utils';
import { WhiteBlock } from '@/shared/components/shared/white-block';
import { RepeatContent } from '@/shared/components/ui';
import { CheckoutItemSkeleton } from '@/shared/components/shared/checkout-item-skeleton';
import { CheckoutItem } from '@/shared/components/shared/checkout-item';
import { getCartItemDetails } from '@/shared/lib/get-cart-item-details';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '@/shared/lib/get-cart-details';

interface Props {
   items: CartStateItem[];
   onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
   removeCartItem: (id: number) => void;
   loadingItems: boolean;
   className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ className, items, loadingItems, onClickCountButton, removeCartItem }) => {
   return (
      <WhiteBlock className={cn(className)} title="1. Корзина">
         <div className="flex flex-col gap-5">
            {loadingItems ? (
               <RepeatContent count={5}>
                  <CheckoutItemSkeleton />
               </RepeatContent>
            ) : (
               <>
                  {items.map(item => (
                     <CheckoutItem
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
                        disabled={item.disabled}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
                        onClickRemove={() => removeCartItem(item.id)}
                     />
                  ))}
               </>
            )}
         </div>
      </WhiteBlock>
   );
};
