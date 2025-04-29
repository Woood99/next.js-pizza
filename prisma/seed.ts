import { hashSync } from 'bcrypt';
import { prisma } from './prisma-client';
import { INGREDIENTS_DATA, CATEGORIES_DATA, PRODUCTS_DATA } from './constants';

const randomDecimalNumber = (min: number = 10, max: number = 600) => {
   return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

async function up() {
   await prisma.user.createMany({
      data: [
         {
            fullName: 'User1',
            email: 'user1@test.ru',
            password: hashSync('user1password', 10),
            verified: new Date(),
            role: 'USER',
         },
         {
            fullName: 'admin',
            email: 'admin@test.ru',
            password: hashSync('adminPassword', 10),
            verified: new Date(),
            role: 'ADMIN',
         },
      ],
   });

   await prisma.category.createMany({
      data: CATEGORIES_DATA,
   });

   await prisma.ingredient.createMany({
      data: INGREDIENTS_DATA,
   });

   await prisma.product.createMany({
      data: PRODUCTS_DATA,
   });

   const pizza1 = await prisma.product.create({
      data: {
         name: 'Пепперони фреш',
         imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
         categoryId: 1,
         ingredients: {
            connect: INGREDIENTS_DATA.slice(0, 5),
         },
      },
   });

   const pizza2 = await prisma.product.create({
      data: {
         name: 'Сырная',
         imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
         categoryId: 1,
         ingredients: {
            connect: INGREDIENTS_DATA.slice(5, 10),
         },
      },
   });

   const pizza3 = await prisma.product.create({
      data: {
         name: 'Чоризо фреш',
         imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
         categoryId: 1,
         ingredients: {
            connect: INGREDIENTS_DATA.slice(10, 40),
         },
      },
   });

   await prisma.productItem.createMany({
      data: [
         // Пицца "Пепперони фреш"
         { productId: pizza1.id, pizzaType: 1, size: 20, price: randomDecimalNumber() },
         { productId: pizza1.id, pizzaType: 2, size: 30, price: randomDecimalNumber() },
         { productId: pizza1.id, pizzaType: 2, size: 40, price: randomDecimalNumber() },

         // Пицца "Сырная"
         { productId: pizza2.id, pizzaType: 1, size: 20, price: randomDecimalNumber() },
         { productId: pizza2.id, pizzaType: 1, size: 30, price: randomDecimalNumber() },
         { productId: pizza2.id, pizzaType: 1, size: 40, price: randomDecimalNumber() },
         { productId: pizza2.id, pizzaType: 2, size: 20, price: randomDecimalNumber() },
         { productId: pizza2.id, pizzaType: 2, size: 30, price: randomDecimalNumber() },
         { productId: pizza2.id, pizzaType: 2, size: 40, price: randomDecimalNumber() },

         // Пицца "Чоризо фреш"
         { productId: pizza3.id, pizzaType: 1, size: 20, price: randomDecimalNumber() },
         { productId: pizza3.id, pizzaType: 2, size: 30, price: randomDecimalNumber() },
         { productId: pizza3.id, pizzaType: 2, size: 40, price: randomDecimalNumber() },

         // Остальные продукты
         { productId: 1, price: randomDecimalNumber() },
         { productId: 2, price: randomDecimalNumber() },
         { productId: 3, price: randomDecimalNumber() },
         { productId: 4, price: randomDecimalNumber() },
         { productId: 5, price: randomDecimalNumber() },
         { productId: 6, price: randomDecimalNumber() },
         { productId: 7, price: randomDecimalNumber() },
         { productId: 8, price: randomDecimalNumber() },
         { productId: 9, price: randomDecimalNumber() },
         { productId: 10, price: randomDecimalNumber() },
         { productId: 11, price: randomDecimalNumber() },
         { productId: 12, price: randomDecimalNumber() },
         { productId: 13, price: randomDecimalNumber() },
         { productId: 14, price: randomDecimalNumber() },
         { productId: 15, price: randomDecimalNumber() },
         { productId: 16, price: randomDecimalNumber() },
         { productId: 17, price: randomDecimalNumber() },
      ],
   });

   await prisma.cart.createMany({
      data: [
         {
            userId: 1,
            totalAmount: 0,
            token: '11111',
         },
         {
            userId: 2,
            totalAmount: 0,
            token: '222222',
         },
      ],
   });

   await prisma.cartItem.create({
      data: {
         productItemId: 1,
         cartId: 1,
         quantity: 2,
         ingredients: {
            connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
         },
      },
   });

   await prisma.story.createMany({
      data: [
         {
            previewImageUrl:
               'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
         },
         {
            previewImageUrl:
               'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
         },
         {
            previewImageUrl:
               'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
         },
         {
            previewImageUrl:
               'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
         },
         {
            previewImageUrl:
               'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
         },
         {
            previewImageUrl:
               'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
         },
      ],
   });

   await prisma.storyItem.createMany({
      data: [
         {
            storyId: 1,
            sourceUrl: 'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
         },
         {
            storyId: 1,
            sourceUrl: 'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
         },
         {
            storyId: 1,
            sourceUrl: 'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
         },
         {
            storyId: 1,
            sourceUrl: 'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
         },
         {
            storyId: 1,
            sourceUrl: 'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
         },
      ],
   });
}

async function down() {
   await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
   await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
   try {
      await down();
      await up();
   } catch (error) {
      console.log(error);
   }
}

main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async e => {
      console.log(e);
      await prisma.$disconnect();
      process.exit(1);
   });
