import { NextComponentType } from 'next';

import Container from '@/modules/global/components/container';
import { ImageCom } from '@/modules/global/components/image';
import useTranslation from 'next-translate/useTranslation';

const HomeShipping: NextComponentType = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container className="container">
        <div className="flex flex-wrap py-16">
          <div className="flex w-full px-3 pb-2 md:w-1/2 lg:w-1/4 lg:pb-0">
            <div className="mr-3 mt-1">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="red"
                // stroke="#40a944"
                strokeWidth="1"
                viewBox="0 0 32 32"
                className="h-10 w-10"
              >
                <path d="M11.403 27.46a.502.502 0 0 1-.422-.232l-2.415-3.795-3.795-2.415a.502.502 0 0 1-.085-.775L6.1 18.828a.496.496 0 0 1 .533-.113l2.62 1.008 6.402-7.396-8.067-5.459a.5.5 0 0 1-.073-.767l1.414-1.414a.505.505 0 0 1 .55-.107l9.397 4.027.81-.936A7.495 7.495 0 0 1 25.339 5.1c.887 0 1.56.673 1.56 1.5 0 2.228-.937 4.288-2.57 5.712l-.937.811 4.027 9.397a.503.503 0 0 1-.106.551l-1.414 1.414a.52.52 0 0 1-.401.145.505.505 0 0 1-.366-.218l-5.459-8.068-7.396 6.402 1.008 2.62a.5.5 0 0 1-.113.533l-1.415 1.414a.5.5 0 0 1-.354.147zm-5.569-6.95 3.363 2.14a.496.496 0 0 1 .153.153l2.14 3.363.745-.744-1.018-2.645a.5.5 0 0 1 .14-.558l8.087-7.001c.106-.094.251-.138.393-.118s.269.098.349.216l5.436 8.033.746-.746-4.038-9.422a.5.5 0 0 1 .133-.575l1.212-1.049a6.497 6.497 0 0 0 2.226-4.897c0-.335-.225-.56-.5-.56-1.938 0-3.724.812-4.958 2.227l-1.048 1.211a.498.498 0 0 1-.575.133L9.396 5.633l-.746.746 8.033 5.436a.499.499 0 0 1 .098.742L9.78 20.643a.501.501 0 0 1-.558.14l-2.645-1.018-.743.745z" />
              </svg> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                // stroke="#40a944"
                className="h-9 w-9 stroke-primary dark:stroke-dark_primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </div>
            <div className="">
              <h3 className="mb-1 text-base md:mb-2">
                {t('home:free_shipping.title')}
              </h3>
              <p>{t('home:free_shipping.body')}</p>
            </div>
          </div>
          <div className="flex w-full px-3 pb-2 md:w-1/2 lg:w-1/4 lg:pb-0">
            <div className="mr-3 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // stroke="#40a944"
                className="h-9 w-9 stroke-primary dark:stroke-dark_primary"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div className="">
              <h3 className="mb-1 text-base md:mb-2">
                {t('home:support.title')}
              </h3>
              <p>{t('home:support.body')}</p>
            </div>
          </div>
          <div className="flex w-full px-3 pb-2 md:w-1/2 lg:w-1/4 lg:pb-0">
            <div className="mr-3 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 stroke-primary dark:stroke-dark_primary"
                fill="none"
                viewBox="0 0 24 24"
                // stroke="#40a944"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                />
              </svg>
              {/* <ImageCom
                className="lazyload"
                alt=""
                src="https://cdn.shopify.com/s/files/1/0359/6350/2651/files/shipping3_50x50.jpg?v=1588047617"
                height={55}
                width={55}
              /> */}
            </div>
            <div className="">
              <h3 className="mb-1 text-base md:mb-2">
                {t('home:return.title')}
              </h3>
              <p>{t('home:return.body')}</p>
            </div>
          </div>
          <div className="flex w-full px-3 pb-2 md:w-1/2 lg:w-1/4 lg:pb-0">
            <div className="mr-3 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 stroke-primary dark:stroke-dark_primary"
                fill="none"
                viewBox="0 0 24 24"
                // stroke="#40a944"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <div className="">
              <h3 className="mb-1 text-base md:mb-2">
                {t('home:payment_secure.title')}
              </h3>
              <p>{t('home:payment_secure.body')}</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomeShipping;