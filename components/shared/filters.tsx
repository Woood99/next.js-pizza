'use client';

import React from 'react';

import { Title } from './title';
import { Input } from '../ui';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { RangeSlider } from '../ui/range-slider';
import { useFilters, useIngredients, useQueryFilters } from '@/hooks';

interface Props {
   className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
   const { ingredients, loading } = useIngredients();
   const filters = useFilters();

   useQueryFilters(filters);

   const ingredientsCheckboxes = ingredients.map(item => ({
      text: item.name,
      value: String(item.id),
   }));

   return (
      <div className={className}>
         <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
         <CheckboxFiltersGroup
            title="Тип теста"
            name="pizzaTypes"
            className="mb-5"
            onClickCheckbox={filters.setPizzaTypes}
            value={filters.pizzaTypes}
            items={[
               { text: 'Тонкое', value: '1' },
               { text: 'Традиционное', value: '2' },
            ]}
         />
         <CheckboxFiltersGroup
            title="Размеры"
            name="sizes"
            onClickCheckbox={filters.setSizes}
            value={filters.sizes}
            items={[
               { text: '20 см', value: '20' },
               { text: '30 см', value: '30' },
               { text: '40 см', value: '40' },
            ]}
         />

         <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
               <Input
                  type="number"
                  placeholder="0"
                  min={0}
                  max={1000}
                  value={String(filters.prices.priceFrom)}
                  onChange={e => filters.updatePrice('priceFrom', +e.target.value)}
               />
               <Input
                  type="number"
                  min={100}
                  max={1000}
                  placeholder="1000"
                  value={String(filters.prices.priceTo)}
                  onChange={e => filters.updatePrice('priceTo', +e.target.value)}
               />
            </div>
            <RangeSlider
               min={0}
               max={1000}
               step={10}
               value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
               onValueChange={([priceFrom, priceTo]) => filters.setPrices({ priceFrom, priceTo })}
            />
         </div>
         <CheckboxFiltersGroup
            loading={loading}
            className="mt-5"
            title="Ингредиенты"
            limit={6}
            defaultItems={ingredientsCheckboxes.slice(0, 6)}
            items={ingredientsCheckboxes}
            onClickCheckbox={filters.setSelectedIngredients}
            value={filters.selectedIngredients}
            name="ingredients"
         />
      </div>
   );
};
