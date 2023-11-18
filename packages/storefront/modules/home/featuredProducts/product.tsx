import Image from 'next/image';
import Link from 'next/link';

import { CustomerProduct } from '@bs-commerce/models';

import Icon from '@/modules/global/components/icon';
import ProductInfo from '@/modules/global/components/product/productInfo';
interface SingleProduct {
  product: CustomerProduct;
}

const Product = ({ product }: SingleProduct) => {
  return (
    <Link
      href={{
        pathname: `/product/${product?.meta?.friendlyPageName}`,
        // query: {
        //   id: product.id,
        //   name: product.info.name,
        // },
      }}
      passHref
      // as={`product/${product.info.name}`}
    >
      <div className="duration-0 group grid cursor-pointer justify-items-center transition hover:bg-white hover:duration-700">
        <div className="group relative m-auto flex pl-10 md:pl-0 lg:pl-0">
          <Image
            src={product?.photos![0]?.url!}
            height={120}
            width={120}
            alt={product?.tags![0]}
          />
          <div className="absolute bottom-5 left-40 w-36 origin-left scale-0 transition-transform duration-300 group-hover:scale-100 md:left-28">
            <Icon product={product} />
          </div>
          <ProductInfo product={product} />
        </div>
      </div>
    </Link>
  );
};

export default Product;