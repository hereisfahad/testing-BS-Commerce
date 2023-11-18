import React, { FC } from "react";
import Image from "next/image";
import productPic from "../public/product.jpeg";
import { useSelector } from "react-redux";
import { RootState } from "marketplace";

const Products: FC = () => {
  const products = useSelector(
    (state: RootState) => state.productsStore.products
  );

  return (
    <>
      {products?.map((product) => (
        <div className="col mb-5" key={product?._id}>
          <div className="card h-100">
            <Image
              className="card-img-top"
              src={productPic}
              width={450}
              height={300}
              alt="..."
            />
            <div className="card-body p-4">
              <div className="text-center">
                <h5 className="fw-bolder">{product?.name}</h5>
                {product?.price}
              </div>
            </div>
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div className="text-center">
                <a
                  className="btn btn-outline-dark mt-auto"
                  href={`/product/${product?._id}`}
                >
                  View options
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Products;