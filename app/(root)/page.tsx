import { Container, Filters, ProductsGroupList, SortPopup, Title } from '@/shared/components/shared';
import { Categories } from '@/shared/components/shared/categories';
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas';
import { Suspense } from 'react';

const Home = async ({ searchParams }: { searchParams: GetSearchParams }) => {
   const categories = await findPizzas(searchParams);

   return (
      <div className="mt-10">
         <Container className="mt-10">
            <Title text="Все пиццы" size="lg" className="font-bold" />
         </Container>
         <div className="sticky top-0 bg-white py-5 shadow-lg shadow-black/5">
            <Container className="flex items-center justify-between ">
               <Categories items={categories.filter(category => category.products.length > 0)} />
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
                  <Suspense>
                     <Filters />
                  </Suspense>
               </div>
               <div className="flex-1">
                  <div className="flex flex-col gap-16">
                     {categories.map(category => {
                        if (category.products.length === 0) return;
                        return <ProductsGroupList title={category.name} categoryId={category.id} key={category.id} items={category.products} />;
                     })}
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
};

export default Home;
