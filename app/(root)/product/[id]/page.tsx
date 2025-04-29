import { prisma } from '@/prisma/prisma-client';
import { Container } from '@/shared/components/shared';
import { ChooseProduct } from '@/shared/components/shared/choose-product';
import { notFound } from 'next/navigation';
import React from 'react';

async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
   const { id: productId } = await params;

   const product = await prisma.product.findFirst({
      where: {
         id: Number(productId),
      },
      include: {
         ingredients: true,
         category: {
            include: {
               products: {
                  include: {
                     variants: true,
                  },
               },
            },
         },
         variants: true,
      },
   });

   if (!product) {
      return notFound();
   }

   return (
      <Container className="flex flex-col my-10">
         <ChooseProduct product={product} />
      </Container>
   );
}

export default ProductPage;
