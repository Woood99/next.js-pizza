'use client';

import React, { useEffect, useRef } from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/shared/store/category';

interface Props {
   title: string;
   items: any[];
   categoryId: number;
   className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ title, items, className, categoryId }) => {
   const setActiveCategoryId = useCategoryStore(state => state.setActiveId);
   const intersectionRef = useRef<HTMLDivElement>(null!);
   const intersection = useIntersection(intersectionRef, {
      threshold: 0.4,
   });

   useEffect(() => {
      if (intersection?.isIntersecting) {
         setActiveCategoryId(categoryId);
      }
   }, [categoryId, intersection?.isIntersecting]);

   return (
      <div className={className} id={title} ref={intersectionRef}>
         <Title text={title} size="lg" className="font-extrabold mb-5" />
         <div className="grid grid-cols-3 gap-[50px]">
            {items.map(item => (
               <ProductCard key={item.id} data={{ ...item, price: item.variants[0]?.price }} />
            ))}
         </div>
      </div>
   );
};
