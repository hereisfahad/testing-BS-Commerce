import { FC } from 'react';
import Image from 'next/image';

import { Product } from '@bs-commerce/models';
import SingleView from '@/components/products/singleView';

const PhotosCard: FC<{
  product: Product;
}> = (props: { product: Product }) => {
  const { product } = props;

  return (
    <>
      <div
        className="card card-secondary card-outline my-4"
        data-card-name="meta"
        id="meta"
      >
        <div className="card-header with-border d-flex justify-content-between align-items-center">
          <div className="card-title row align-items-center  ps-2 pt-2">
            <i
              className="bi bi-image-fill col-1"
              style={{ fontSize: '25px' }}
            />
            <div className="fs-5 col px-3 text-start">Photos</div>
          </div>
        </div>
        <div className="" id="metaTab">
          <div className="card-body">
            <div className="row justify-content-center">
              {product?.photos![0]?.url ? (
                <Image
                  className="col-2"
                  src={product?.photos[0]?.url}
                  alt="No Image"
                  width={150}
                  height={150}
                />
              ) : (
                'Not a valid image!!'
              )}
            </div>
            <SingleView label="URL" value={product?.photos![0]?.url} />
            <SingleView label="ID" value={product?.photos![0]?.id} />
            <SingleView label="Title" value={product?.photos![0]?.title} />
            <SingleView label="alt" value={product?.photos![0]?.alt} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotosCard;