import Link from 'next/link';
import React, { useState } from 'react';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { userAPI } from 'APIs';
import {
  CustomerProduct,
  Product,
  ResponseItem,
  WishlistItem,
  ICompareItems,
} from '@bs-commerce/models';
import { addToCart, storeAllCartItems } from 'store/slices/cartSlice';
import { setModalState, setLoginModalState } from 'store/slices/modalSlice';
import {
  addToWishlist,
  deleteItemFromWishlist,
  storeWishlist,
} from 'store/slices/productsSlice';
import {
  storeCompare,
  storeProductsToComparePublic,
} from 'store/slices/compareSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks/index';
import useTranslation from 'next-translate/useTranslation';

import Breadcrumb from '@/modules/common/breadcrumbs/breadcrumb';
import ProductImagesSlider from '@/modules/product/productImageSlider';
import ProductDescription from '@/modules/product/productDescription';
import CartModal from '@/modules/global/components/modal/cartModal';
import ModalLogin from '@/modules/global/components//modal/modal';
import SimilarProducts from '@/modules/product/similarProducts';
import CartToast from '../global/components/cartToast';
interface SingleProduct {
  product: Product;
}

const ProductDetailsComponent: React.FC<SingleProduct> = ({
  product,
}: SingleProduct) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState(false);

  const modalStateLogin = useAppSelector(
    (state) => state.persistedReducer.modal.setModalLogin
  );

  const cartData = useAppSelector(
    (state) => state.persistedReducer.cart.allCartItems
  );

  const wishlistData = useAppSelector(
    (state) => state.persistedReducer.product.wishlist
  );
  const findWishlistProduct = wishlistData?.items?.find(
    (item: WishlistItem) => item.productId === product.id
  );

  const token = useAppSelector(
    (state) => state.persistedReducer.auth.access_token
  );

  const compareProducts = useAppSelector(
    (state) => state?.persistedReducer?.compare?.compareList?.items
  );

  const inCompareList = compareProducts?.find(
    (compareProduct: ICompareItems) => compareProduct.productId === product.id
  );

  var isAvailable = true;
  var disableDecrement = false;
  var disableIncrement = false;
  let i = 0;
  let clicked = false;

  const [size, setSize] = useState('s');
  const [color, setColor] = useState('white');
  const [amount, setAmount] = useState(1);
  const [cart, setCart] = useState([{}]);
  const [wishlist, setWishlist] = useState([]);
  const [modalCmp, setModalCmp] = useState(false);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const [alreadyInCart, setAlreadyInCart] = useState<boolean>(false);

  if (findWishlistProduct) {
    clicked = true;
  }

  const handleAddToCompare = async () => {
    if (token) {
      if (inCompareList) {
        dispatch(setModalState(!modalCmp));
      } else {
        try {
          const res = await userAPI.addToCompare(product?.id!);
          if ('data' in res!) {
            dispatch(setModalState(!modalCmp));
            dispatch(storeCompare(res.data));
          }
        } catch (error) {
          toast.error('Error happend.', {
            containerId: 'bottom-right',
          });
        }
      }
    } else {
      const productPhotos = product?.photos!.map((photo) => photo?.url!);
      const productDetails = {
        info: {
          name: product?.info?.name!,
          price: product?.info?.price!,
          shortDescription: product?.info?.shortDescription!,
          fullDescription: product?.info?.shortDescription!,
          oldPrice: product?.info?.oldPrice!,
        },
        meta: {
          friendlyPageName: product?.meta?.friendlyPageName!,
        },
        photos: productPhotos!,
      };
      dispatch(
        storeProductsToComparePublic({
          productId: product?.id!,
          productDetails: productDetails!,
        })
      );
      dispatch(setModalState(!modalCmp));
      //dispatch(setLoginModalState(!modalOn));
    }
  };

  const modalState = useAppSelector(
    (state) => state.persistedReducer.modal.setModal
  );

  const toCart = async () => {
    if (token) {
      const cartProduct = {
        id: product.id!,
        info: product.info!,
        meta: { friendlyPageName: product.meta?.friendlyPageName! },
        photos: product.photos!,
      };
      const cartItem = {
        product: cartProduct!,
        productId: product.id!,
        quantity: amount,
      };
      // console.log(cartItem);
      setAmount(amount);
      if (alreadyInCart) {
        const cart = await userAPI.updateCartItem({
          productId: cartItem.productId,
          quantity: amount,
        });
        dispatch(storeAllCartItems(cart?.data?.items!));
      } else {
        const cart = await userAPI.addToCart({
          productId: cartItem.productId,
          quantity: amount,
        });
        dispatch(storeAllCartItems(cart?.data?.items!));
      }
      // setShowCartModal(true);
      toast(<CartToast product={product} />, {
        containerId: 'bottom-left',
      });
      dispatch(addToCart(cartItem));
    } else {
      dispatch(setLoginModalState(!modalOn));
    }
  };

  const toWishlist = async (id: string, quantity: number) => {
    if (token) {
      const data = {
        productId: id,
        quantity,
      };
      const reduxData = {
        product: {
          id: id,
          info: product.info,
          photos: product.photos,
        },
        productId: id,
        quantity: quantity,
      };
      try {
        await userAPI.addToWishList(data);
        const newList = await userAPI.getCustomerWishlist(token);
        // console.log(newList);
        dispatch(storeWishlist(newList!));
        clicked = true;
        toast.success(`${t('common:item_added_to_wishlist')}`, {
          containerId: 'bottom-right',
        });
      } catch (error) {
        // console.log(error);
        toast.error('Failed to add item to wishlist', {
          containerId: 'bottom-right',
        });
      }
    } else {
      // router.push('/account/sign-in');
      dispatch(setLoginModalState(!modalOn));
    }
  };

  const deleteFromWishlist = async (productId: string) => {
    if (token) {
      try {
        await userAPI.deleteWishlistItem(productId);
        toast.error(`${t('common:item_removed_from_wishlist')}`, {
          containerId: 'bottom-right',
        });
        dispatch(deleteItemFromWishlist(productId));
      } catch (error) {
        toast.error('Failed to remove item from wishlist', {
          containerId: 'bottom-right',
        });
      }
    } else {
      dispatch(setLoginModalState(!modalOn));
    }
  };

  const handleClickToWishlist = () => {
    if (token) {
      router.push('/wishlist');
    } else {
      dispatch(setLoginModalState(!modalOn));
    }
  };

  const closeCartModal = () => {
    setShowCartModal(false);
  };

  useEffect(() => {
    dispatch(setModalState(false));
  }, [router.asPath]);

  useEffect(() => {
    let itemAmountInCart: ResponseItem | undefined = cartData?.find((item) => {
      if (item.productId === product.id) {
        return item;
      }
    });

    if (!itemAmountInCart) {
      const cartProduct = {
        id: product.id!,
        info: product.info!,
        meta: { friendlyPageName: product.meta?.friendlyPageName! },
        photos: product.photos!,
      };
      itemAmountInCart = {
        product: cartProduct!,
        productId: product.id!,
        quantity: 1,
      };
      setAlreadyInCart(false);
    } else {
      setAlreadyInCart(true);
    }
    setAmount(itemAmountInCart?.quantity!);
  }, []);

  return (
    <>
      {modalStateLogin && (
        <ModalLogin
          setModalOn={setModalOn}
          setChoice={setChoice}
          modalTitle="You need to login first."
          bodyText="Proceed to login?"
        />
      )}
      <Breadcrumb
        title={product?.info?.name}
        pathArray={[`${t('common:home')}`, product.info?.name]}
        linkArray={['/', '/product' + product.id]}
      />

      <section className="body-font overflow-hidden bg-white text-gray-700 dark:bg-dark_bg">
        <div className="container mx-auto px-5 pt-24 pb-16">
          <div>
            <div className="mx-auto flex flex-wrap">
              <div className="w-full md:w-1/2">
                <div className="relative inset-0 z-0 bg-cover bg-center">
                  <ProductImagesSlider product={product}></ProductImagesSlider>
                </div>
              </div>
              <div className="mt-10 w-full md:mt-0 md:w-1/2 md:pl-5 ">
                <h2 className="title-font mb-1 text-xl font-normal text-gray-900 dark:text-dark_text">
                  {product.info.name}
                </h2>
                <div className="flex dark:text-dark_text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                <div className="mb-1 mt-2 flex"></div>
                <div className="ml-1 mb-1 mt-2 text-gray-900 dark:text-dark_text">
                  <span className="text-sm">
                    {t('product-details:manufacturer')}:{' '}
                    {product?.manufacturer?.name
                      ? product?.manufacturer?.name
                      : '---'}
                  </span>
                  <span className="ml-2 mr-2 text-sm">|</span>
                  <span className="text-sm dark:text-dark_text">
                    {t('product-details:sku')}: {product?.info?.sku}
                  </span>
                </div>
                <div className="flex">
                  <span className="title-font mt-2 mb-2 ml-1 text-2xl font-medium text-primary dark:text-dark_text">
                    ${product?.info?.price}
                  </span>
                </div>
                <div className="flex">
                  <span className="ml-1 mb-1 mt-2 text-sm text-gray-900 dark:text-dark_text">
                    {t('product-details:availability')}:
                  </span>
                  {isAvailable ? (
                    <span className="ml-2 mb-1 mt-2 text-sm text-primary dark:text-dark_primary">
                      {/*product?.stock*/} Available
                    </span>
                  ) : (
                    <span className="ml-2 mb-1 mt-2 text-sm text-primary">
                      Out of stock
                    </span>
                  )}
                </div>

                <p className="py- ml-1 mb-1 mt-2 text-sm text-gray-900 dark:text-dark_text">
                  {product?.info?.shortDescription}
                </p>
                {/* {product?.info?.size && (
                  <div className="mt-2 mb-2 flex items-center">
                    <div className="ml-1 flex items-center">
                      <span className="mr-3">Size:</span>
                      <div className="flex">
                        <button
                          onClick={() => setSize('s')}
                          className="m-2 hover:text-primary"
                        >
                          s
                        </button>
                        <button
                          onClick={() => setSize('m')}
                          className="m-2 hover:text-primary"
                        >
                          m
                        </button>
                        <button
                          onClick={() => setSize('l')}
                          className="m-2 hover:text-primary"
                        >
                          l
                        </button>
                        <button
                          onClick={() => setSize('xl')}
                          className="m-2 hover:text-primary"
                        >
                          xl
                        </button>
                      </div>
                    </div>
                  </div>
                )} */}

                {/* {product?.info?.color && (
                  <div className="mt-2 mb-2 flex items-center">
                    <div className="flex">
                      <span className="mr-3">Color:</span>
                      <button
                        onClick={() => setColor('white')}
                        className="h-6 w-6 border-2 border-gray-300 active:outline"
                      ></button>
                      <button
                        onClick={() => setColor('black')}
                        className="ml-3 h-6 w-6 border-2 border-gray-300 bg-gray-700 active:outline"
                      ></button>
                      <button
                        onClick={() => setColor('red')}
                        className="ml-3 h-6 w-6 border-2 border-gray-300 bg-red-500 active:outline"
                      ></button>
                    </div>
                  </div>
                )} */}

                <div className="flex text-black dark:text-dark_text">
                  <div className="title-text flex items-center lg:mx-2">
                    {t('product-details:quantity')}
                    <div className="m-1 rounded border-2 border-gray-200 md:ml-4">
                      <button
                        onClick={() =>
                          amount > 1 ? setAmount(amount - 1) : ''
                        }
                        // {...(amount <= 1 ? (disableDecrement = true) : null)}
                        disabled={disableDecrement}
                        className="p-2"
                      >
                        -
                      </button>
                      <span className="p-2">{amount}</span>
                      <button
                        onClick={() => setAmount(amount + 1)}
                        disabled={disableIncrement}
                        className="p-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {isAvailable ? (
                    <button
                      onClick={() => {
                        toCart();
                      }}
                      className="my-1 ml-2 rounded bg-primary px-2 text-white hover:bg-gray-600 focus:outline-none dark:bg-dark_primary sm:px-12 lg:px-16"
                      type="button"
                      data-modal-toggle="popup-modal"
                    >
                      {t('product-details:add_to_cart')}
                    </button>
                  ) : (
                    <button
                      disabled={true}
                      className="my-1 ml-2 rounded bg-primary px-2 text-white hover:bg-gray-600 focus:outline-none dark:bg-dark_primary sm:px-12 lg:px-16"
                    >
                      Soldout
                    </button>
                  )}
                </div>
                <div className=" flex flex-wrap">
                  <button
                    disabled={!isAvailable}
                    className="mt-5 ml-1 flex w-full items-center justify-center rounded bg-black py-2 text-white  transition duration-200 ease-out hover:bg-primary hover:ease-in dark:bg-white dark:text-black dark:hover:bg-dark_primary dark:hover:bg-dark_primary dark:hover:text-white md:px-32	"
                    onClick={toCart}
                  >
                    <span className="mx-auto">
                      {t('product-details:buy_now')}
                    </span>
                  </button>
                </div>
                <div className="text-grey-700 ml-1 dark:text-dark_text">
                  <div className="flex flex-row items-start gap-x-2">
                    <button
                      onClick={() =>
                        clicked
                          ? deleteFromWishlist(product?.id!)
                          : toWishlist(product?.id!, 1)
                      }
                      // disabled={clicked ? true : false}
                      className="mt-10 hover:text-primary"
                    >
                      {clicked
                        ? `${t('product-details:remove_from_wishlist')}`
                        : `${t('product-details:add_to_wishlist')}`}
                    </button>
                    <div
                      className="mt-10 underline hover:text-primary dark:hover:text-dark_primary"
                      hidden={!clicked}
                    >
                      <button onClick={handleClickToWishlist}>
                        Go to wishlist
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      className="mt-2 hover:text-primary dark:hover:text-dark_primary"
                      onClick={() => {
                        handleAddToCompare();
                      }}
                    >
                      {inCompareList
                        ? `${t('product-details:show_in_compare')}`
                        : `${t('product-details:compare')}`}
                    </button>
                  </div>
                  {/* <div>
                    <button className=" mt-2 flex hover:text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Ask about this product
                    </button>
                  </div> */}
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <ProductDescription product={product}></ProductDescription>
        </div>
        <div>
          <SimilarProducts />
        </div>
      </section>
    </>
  );
};

export default ProductDetailsComponent;