export const mapPizzaSize = {
   20: 'Маленькая',
   30: 'Средняя',
   40: 'Большая',
};

export const mapPizzaType = {
   1: 'тонкое',
   2: 'традиционное',
};

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
   value,
   name,
}));
export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
   value,
   name,
}));

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;
