import { prisma } from '@/prisma/prisma-client';
import { Container, ProductImage, Title } from '@/shared/components/shared';
import { GroupVariants } from '@/shared/components/shared/group-variants';
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
         variants: true,
      },
   });

   if (!product) {
      return notFound();
   }

   return (
      <Container className="flex flex-col my-10">
         <div className="flex">
            <ProductImage imageUrl={product.imageUrl} size={40} className="" />
            <div className="flex-grow ml-10">
               <Title text={product.name} size="md" className="font-extrabold mb-1" />
               <p className="text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus, dolore.</p>
               <GroupVariants
                  className="max-w-[400px] mt-6"
                  value="2"
                  items={[
                     {
                        name: 'Маленькая',
                        value: '1',
                     },
                     {
                        name: 'Средняя',
                        value: '2',
                     },
                     {
                        name: 'Большая',
                        value: '3',
                     },
                  ]}
               />
            </div>
         </div>
      </Container>
   );
}

export default ProductPage;
