import { FC } from 'react';
import { useAppSelector } from 'customHooks/hooks';
import CategoryProductCard from '@/components/cateoryProducts/categoryProducts/categoryProductCard';
import { CustomerProduct } from '@bs-commerce/models';

interface props {
  products: CustomerProduct[];
}

const CategoryProductSegment: FC<props> = ({ products }) => {
  return (
    <>
      {/* {console.log(currentPage)} */}
      <div className="py-5">
        {products && products[0] ? (
          <div className="grid grid-cols-2 justify-items-center gap-2 md:w-fit lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-3 xl:gap-[25px]">
            {products.map((product) => (
              <CategoryProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="m-auto text-center">
            There is no product in this category
          </p>
        )}
      </div>
    </>
  );
};

export default CategoryProductSegment;
