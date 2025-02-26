import { Container, Filters, SortPopup, Title } from '@/components/shared';
import { Categories } from '@/components/shared/categories';
import { ProductsGroupList } from '@/components/shared/products-group-list';

export default function Home() {
   return (
      <div className="mt-10">
         <Container className="mt-10">
            <Title text="Все пиццы" size="lg" className="font-bold" />
         </Container>
         <div className="sticky top-0 bg-white py-5 shadow-lg shadow-black/5">
            <Container className="flex items-center justify-between ">
               <Categories />
               <SortPopup />
            </Container>
         </div>
         <Container className="grid grid-cols-6 gap-2 my-10">
            <img
               className="rounded-md"
               height={250}
               width={200}
               src="https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496"
            />
            <img
               className="rounded-md"
               height={250}
               width={200}
               src="https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640"
            />
            <img
               className="rounded-md"
               height={250}
               width={200}
               src="https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020"
            />
            <img
               className="rounded-md"
               height={250}
               width={200}
               src="https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496"
            />
            <img
               className="rounded-md"
               height={250}
               width={200}
               src="https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640"
            />
            <img
               className="rounded-md"
               height={250}
               width={200}
               src="https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020"
            />
         </Container>
         <Container className="pb-14">
            <div className="flex gap-[60px]">
               <div className="w-[250px]">
                  <Filters />
               </div>
               <div className="flex-1">
                  <div className="flex flex-col gap-16">
                     <ProductsGroupList
                        title="Пиццы"
                        categoryId={1}
                        items={[
                           {
                              id: 1,
                              name: 'Маргарита',
                              imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                              items: [{ price: 500 }],
                           },
                           {
                              id: 2,
                              name: 'Маргарита',
                              imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                              items: [{ price: 500 }],
                           },
                           {
                              id: 3,
                              name: 'Маргарита',
                              imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                              items: [{ price: 500 }],
                           },
                           {
                              id: 4,
                              name: 'Маргарита',
                              imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                              items: [{ price: 500 }],
                           },
                        ]}
                     />
                     <ProductsGroupList
                        title="Комбо"
                        categoryId={2}
                        items={[
                           {
                              id: 1,
                              name: 'Маргарита',
                              imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                              items: [{ price: 500 }],
                           },
                           {
                              id: 2,
                              name: 'Маргарита',
                              imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                              items: [{ price: 500 }],
                           },
                           {
                              id: 3,
                              name: 'Маргарита',
                              imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                              items: [{ price: 500 }],
                           },
                           {
                              id: 4,
                              name: 'Маргарита',
                              imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                              items: [{ price: 500 }],
                           },
                        ]}
                     />
                     <ProductsGroupList
                        title="Кофе"
                        categoryId={3}
                        items={[
                           {
                              id: 1,
                              name: 'Маргарита',
                              imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                              items: [{ price: 500 }],
                           },
                           {
                              id: 2,
                              name: 'Маргарита',
                              imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                              items: [{ price: 500 }],
                           },
                           {
                              id: 3,
                              name: 'Маргарита',
                              imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                              items: [{ price: 500 }],
                           },
                           {
                              id: 4,
                              name: 'Маргарита',
                              imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                              items: [{ price: 500 }],
                           },
                        ]}
                     />
                     {/* <ProductsGroupList title="Комбо" categoryId={2} items={[6, 7, 8, 9, 10]} /> */}
                  </div>

                  {/* <div className="flex items-center gap-6 mt-12">
                     <Pagination pageCount={3} />
                     <span className="text-sm text-gray-400">5 из 65</span>
                  </div> */}
               </div>
            </div>
         </Container>
      </div>
   );
}
