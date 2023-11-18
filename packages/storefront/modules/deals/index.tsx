import type { NextComponentType } from 'next';

import DealsFilter from '@/modules/deals/filter/main';
import PageTitle from '@/modules/global/components/pageTitle';
import DealProductSegment from '@/modules/deals/dealProducts/main';
import ProductSort from '@/modules/deals/sort/index';
import Breadcrumb from '../common/breadcrumbs/breadcrumb';
import useTranslation from 'next-translate/useTranslation';

const DealsComponent: NextComponentType = () => {
  const { t } = useTranslation();
  
  return (
    <div className="mt-20">
       <Breadcrumb
        title={'Deals'}
        pathArray={[`${t('common:home')}`, `${'Deals'} `]}
        linkArray={['/', '/']}
      />
      <div className="grid grid-cols-1 px-4 lg:grid-cols-5 lg:px-24 xl:grid-cols-5 xl:px-60">
        <div>
          <DealsFilter />
        </div>
        <div className="col-span-4 grid">
          <div className="py-14 px-4 md:px-12 lg:px-12 xl:px-14">
            <ProductSort />
          </div>
          <DealProductSegment />
        </div>
      </div>
    </div>
  );
};

export default DealsComponent;