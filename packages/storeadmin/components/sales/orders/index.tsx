import React, { useEffect, useState } from "react";
import OrderList from "./List/ordersList";
import { userAPI } from "../../../APIs";
import moment from "moment";

const OrderListMain = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [shippingStatus, setShippingStatus] = useState("");
  const [id, setId] = useState("");
  const [orderListData, setOrderListData] = useState<any>();

  const getAllOrderList = async () => {
    const res = await userAPI.getAllOrderList(
      orderStatus,
      paymentStatus,
      shippingStatus,
      startDate,
      endDate
    );
    res ? setOrderListData(res) : "";
  };

  useEffect(() => {
    getAllOrderList();
  }, []);

  const handleSearch = (event: any) => {
    event.preventDefault();

    if (id) {
      const singleOrderList = orderListData?.orders?.filter(
        (order: any) => order.orderId === id
      );
      const order = {
        orders: singleOrderList,
      };
      setOrderListData(order);
    } else {
      setStartDate(moment(startDate).toJSON());
      setEndDate(moment(endDate).toJSON());
      getAllOrderList();
    }
  };
  return (
    <>
      <main>
        <div
          className="d-flex justify-content-between flex-md-nowrap align-items-center border-bottom mb-3 flex-wrap pt-3 pb-2"
          style={{ paddingLeft: "10px" }}
        >
          <h1 className="h2">Orders</h1>
        </div>
        <div>
          <div className="card border-1 mt-3 rounded">
            <div className="card-header">
              <span className="ms-2 fs-4">Search</span>
            </div>

            <div>
              <form
                style={{
                  padding: "5px",
                  margin: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "5px",
                    margin: "5px",
                  }}
                  className="form-col"
                >
                  <div
                    style={{
                      padding: "5px",
                      marginRight: "100px",
                      marginBottom: "5px",
                    }}
                    className="col"
                  >
                    Start Date
                    <input
                      type="datetime-local"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => {
                        setStartDate(e.target.value);
                      }}
                    />
                  </div>
                  <div
                    style={{
                      padding: "5px",
                      marginRight: "100px",
                      marginBottom: "5px",
                    }}
                    className="col"
                  >
                    End Date
                    <input
                      type="datetime-local"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => {
                        setEndDate(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    padding: "5px",
                    margin: "5px",
                  }}
                  className="form-col"
                >
                  <div
                    style={{
                      padding: "5px",
                      marginRight: "100px",
                    }}
                    className="col"
                  >
                    Order Status
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setOrderStatus(e.target.value);
                      }}
                    >
                      <option selected> </option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div
                    style={{
                      padding: "5px",
                      marginRight: "100px",
                    }}
                    className="col"
                  >
                    Payment Status
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setPaymentStatus(e.target.value);
                      }}
                    >
                      <option selected> </option>
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div
                    style={{
                      padding: "5px",
                      marginRight: "100px",
                    }}
                    className="col"
                  >
                    Shipping Status
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setShippingStatus(e.target.value);
                      }}
                    >
                      <option selected> </option>
                      <option value="NotYetShipped">NotYetShipped</option>
                      <option value="PartiallyShipped">PartiallyShipped</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  <div
                    style={{
                      padding: "5px",
                      marginRight: "100px",
                    }}
                    className="col"
                  >
                    Order ID
                    <input
                      type="text"
                      className="form-control"
                      id="orderId"
                      placeholder=""
                      onChange={(e) => {
                        setId(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    style={{
                      height: "40px",
                      width: "120px",
                      margin: "15px",
                    }}
                    className="btn btn-primary"
                    onClick={handleSearch}
                  >
                    <i className="bi bi-search"></i> Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="card border-1 mt-3 rounded px-2">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-start">
                <p>
                  Learn more about
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      marginLeft: "5px",
                    }}
                  >
                    Orders
                  </a>
                </p>
              </div>
            </div>

            {orderListData ? (
              <OrderList orderListData={orderListData} />
            ) : (
              "No Order Data Found"
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderListMain;