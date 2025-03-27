import { prisma } from '@/prisma/prisma-client';
import { ChooseProductModal } from '@/shared/components/shared';
import { notFound } from 'next/navigation';
import React from 'react';

interface ProductPageProps {
   params: {
      id: string;
   };
}

const ProductModal = async ({ params }: ProductPageProps) => {
   const product = await prisma.product.findFirst({
      where: { id: Number(params.id) },
      include: {
         ingredients: true,
         variants: true,
      },
   });

   if (!product) {
      return notFound();
   }

   return <ChooseProductModal product={product} />;
};

export default ProductModal;
