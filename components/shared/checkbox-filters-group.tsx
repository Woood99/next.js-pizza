'use client';

import React, { useState } from 'react';
import { FilterCheckbox, FilterChecboxProps } from './filter-checkbox';
import { Input } from '../ui/input';

type Item = FilterChecboxProps;

interface Props {
   title: string;
   items: Item[];
   defaultItems: Item[];
   limit?: number;
   searchInputPlaceholder?: string;
   className?: string;
   onChange?: (values: string[]) => void;
   defaultValue?: string[];
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
   title,
   items,
   defaultItems,
   limit = 5,
   searchInputPlaceholder = 'Поиск...',
   className,
   onChange,
   defaultValue,
}) => {
   const [showAll, setShowAll] = useState(false);
   const [searchValue, setSearchValue] = useState('');

   const onChangeSearchInput = (value: string) => {
      setSearchValue(value);
   };

   const list = showAll ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase())) : defaultItems.slice(0, limit);

   return (
      <div className={className}>
         <p className="font-bold mb-3">{title}</p>

         {showAll && (
            <div className="mb-5">
               <Input
                  placeholder={searchInputPlaceholder}
                  value={searchValue}
                  onChange={e => onChangeSearchInput(e.target.value)}
                  className="bg-gray-50 border-none"
               />
            </div>
         )}

         <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
            {list.map(item => (
               <FilterCheckbox
                  key={String(item.value)}
                  text={item.text}
                  value={item.value}
                  endAdornment={item.endAdornment}
                  checked={false}
                  onCheckedChange={ids => console.log(ids)}
               />
            ))}
         </div>

         {items.length > limit && (
            <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
               <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                  {showAll ? 'Скрыть' : '+ Показать все'}
               </button>
            </div>
         )}
      </div>
   );
};
