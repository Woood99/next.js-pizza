import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

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

   return 123;
}

export default ProductModal;
