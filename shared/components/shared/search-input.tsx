'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useClickAway, useDebounce } from 'react-use';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { Product } from '@prisma/client';
import { Api } from '@/shared/services/api-client';

export const SearchInput = () => {
   const [focused, setFocused] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const searchRef = useRef(null);
   const [products, setProducts] = useState<Product[]>([]);

   useClickAway(searchRef, () => {
      setFocused(false);
   });

   useDebounce(
      async () => {
         try {
            const items = await Api.products.search(searchQuery);
            setProducts(items);
         } catch (error) {}
      },
      350,
      [searchQuery]
   );

   const onClickProduct = () => {
      setFocused(false);
      setSearchQuery('');
      setProducts([]);
   };

   return (
      <>
         {focused && <div className="fixed inset-0 bg-black/50 z-30" />}
         <div ref={searchRef} className="flex rounded-2xl flex-1 justify-between h-11 relative z-30">
            <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
            <input
               className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
               type="text"
               placeholder="Найти пиццу..."
               onFocus={() => setFocused(true)}
               value={searchQuery}
               onChange={e => setSearchQuery(e.target.value)}
            />

            {products.length > 0 && (
               <div
                  className={cn(
                     'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                     focused && 'visible opacity-100 top-12'
                  )}>
                  {products.map(product => (
                     <Link
                        onClick={onClickProduct}
                        key={product.id}
                        className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                        href={`/product/${product.id}`}>
                        <img className="rounded-sm size-8" src={product.imageUrl} alt={product.name} />
                        <span>{product.name}</span>
                     </Link>
                  ))}
               </div>
            )}
         </div>
      </>
   );
};
