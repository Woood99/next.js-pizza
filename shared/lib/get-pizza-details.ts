import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType, mapPizzaType } from '../constants/pizza';
import { calcTotalPizzaPrice } from './calc-total-pizza-price';

export const getPizzaDetails = (
   type: PizzaType,
   size: PizzaSize,
   variants: ProductItem[],
   ingredients: Ingredient[],
   selectedIngredients: Set<number>,
   isPizza?: boolean
) => {
   const totalPrice = calcTotalPizzaPrice(type, size, variants, ingredients, selectedIngredients, isPizza);
   const textDetaills = `${size} см, ${mapPizzaType[type]} пицца`;

   return { totalPrice, textDetaills };
};
