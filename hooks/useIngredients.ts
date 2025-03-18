import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';

export const useIngredients = () => {
   const [ingredients, setIngredients] = useState<Ingredient[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchIngredients = async () => {
         try {
            setLoading(true);
            const res = await Api.ingredients.getAll();
            setIngredients(res);
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false);
         }
      };

      fetchIngredients();
   }, []);

   return { ingredients, loading };
};
