import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
// import SingleOrderDetails from '@/components/order/singleOrder';
import { useRouter } from 'next/router';
import SingleAddressDetails from '@/components/myAccount/singleAddressDetails';

const Details: NextPage = () => {
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setReady(true);
    }
  }, [router.isReady]);

  if (!ready) return null;

  return (
    <>
      <SingleAddressDetails />
    </>
  );
};

export default Details;