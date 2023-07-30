import React from "react";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import styles from "./Orders.module.scss";
import OrderTable from "../../orderTable/OrderTable";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const orders = useFetchCollection("orders");
  const orderDetails = (orderId) => {
    navigate(`/admin/order-details/${orderId}`);
  };

  return (
    <div className={styles.table}>
      <h2>All Orders</h2>
      <p>
        Open an order to <b>Change Order Status </b>
      </p>
      <OrderTable
        orders={orders.data}
        isLoading={orders.isLoading}
        orderDetails={orderDetails}
      />
    </div>
  );
};

export default Orders;
