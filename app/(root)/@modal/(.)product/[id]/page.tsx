import { prisma } from '@/prisma/prisma-client';
import { ChooseProductModal } from '@/shared/components/shared';
import { notFound } from 'next/navigation';
import React from 'react';

async function ProductModal({ params }: { params: Promise<{ id: string }> }) {
   const { id: productId } = await params;

   const product = await prisma.product.findFirst({
      where: {
         id: Number(productId),
      },
      include: {
         ingredients: true,
         variants: true,
      },
   });

   if (!product) {
      return notFound();
   }

   return <ChooseProductModal product={product} />;
}

export default ProductModal;
