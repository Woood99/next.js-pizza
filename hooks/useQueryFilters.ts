import { useEffect } from 'react';

import qs from 'qs';
import { useRouter } from 'next/navigation';
import { Filters } from './useFilters';

export const useQueryFilters = (filters: Filters) => {
   const router = useRouter();

   useEffect(() => {
      const params = {
         ...filters.prices,
         sizes: Array.from(filters.sizes),
         pizzaTypes: Array.from(filters.pizzaTypes),
         ingredients: Array.from(filters.selectedIngredients),
      };
      const query = qs.stringify(params, {
         arrayFormat: 'comma',
      });

      router.push(`?${query}`, { scroll: false });
   }, [filters.prices, filters.pizzaTypes, filters.selectedIngredients, filters.sizes]);
};
