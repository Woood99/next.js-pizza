import { useSet } from 'react-use';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export interface PriceRangeProps {
   priceFrom?: number;
   priceTo?: number;
}

export interface QueryFilters extends PriceRangeProps {
   pizzaTypes: string;
   sizes: string;
   ingredients: string;
}

export interface Filters {
   sizes: Set<string>;
   pizzaTypes: Set<string>;
   selectedIngredients: Set<string>;
   prices: PriceRangeProps;
}

interface ReturnProps extends Filters {
   updatePrice: (name: keyof PriceRangeProps, value: number) => void;
   setPrices: (value: PriceRangeProps) => void;
   setPizzaTypes: (value: string) => void;
   setSizes: (value: string) => void;
   setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
   const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

   const [selectedIngredients, { toggle: setIngredients }] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));

   const [sizes, { toggle: setSizes }] = useSet(new Set<string>(searchParams.get('sizes')?.split(',')) || []);

   const [pizzaTypes, { toggle: setPizzaTypes }] = useSet(new Set<string>(searchParams.get('pizzaTypes')?.split(',') || []));

   const [prices, setPrices] = useState<PriceRangeProps>({
      priceFrom: Number(searchParams.get('priceFrom')) || undefined,
      priceTo: Number(searchParams.get('priceTo')) || undefined,
   });

   const updatePrice = (name: keyof PriceRangeProps, value: number) => {
      setPrices(prev => ({
         ...prev,
         [name]: value,
      }));
   };

   return useMemo(
      () => ({
         selectedIngredients,
         setSelectedIngredients: setIngredients,
         sizes,
         setSizes,
         pizzaTypes,
         setPizzaTypes,
         prices,
         setPrices,
         updatePrice,
      }),
      [selectedIngredients, sizes, pizzaTypes, prices]
   );
};
