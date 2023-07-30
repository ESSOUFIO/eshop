import React, { useEffect, useState } from "react";
import styles from "./OrderHistory.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { MY_ORDERS, selectOrderHistory } from "../../redux/orderSlice";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectUserID } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import OrderTable from "../../components/orderTable/OrderTable";

const OrderHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uid = useSelector(selectUserID);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectOrderHistory);

  useEffect(() => {
    const fetchOrders = async () => {
      let ordersFetched = [];
      setIsLoading(true);

      const q = query(collection(db, "orders"), where("userID", "==", uid));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        ordersFetched.push({ id: doc.id, ...doc.data() });
      });
      dispatch(MY_ORDERS(ordersFetched));
      setIsLoading(false);
    };

    fetchOrders();
  }, [dispatch, uid]);

  const orderDetails = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Order History</h2>
        <p>
          Open an order to leave a <b>Product Review.</b>
        </p>
        <br />
        <>
          <OrderTable
            orders={orders}
            isLoading={isLoading}
            orderDetails={orderDetails}
          />
        </>
      </div>
    </section>
  );
};

export default OrderHistory;
