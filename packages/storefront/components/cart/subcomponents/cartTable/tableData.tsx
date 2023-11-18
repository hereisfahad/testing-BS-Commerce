import { useAppSelector } from "customHooks/hooks";
import ShowData from "@/components/cart/subcomponents/cartTable/showData";

const TableData = () => {
  const cartData = useAppSelector(
    (state) => state.persistedReducer.cart.allCartItems
  );
  return (
    <>
      {cartData ? (
        cartData?.map((data) => {
          return <ShowData key={data.productId} data={data} />;
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default TableData;