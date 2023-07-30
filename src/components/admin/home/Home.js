import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import InfoBox from "../../InfoBox/InfoBox";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import spinnerImg from "../../../asset/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_TOTAL_EARNING,
  STORE_ORDERS,
  selectStoreOrders,
  selectTotalEarnings,
} from "../../../redux/orderSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { STORE_PRODUCTS, selectProducts } from "../../../redux/productSlice";
import Chart from "../../chart/Chart";

//icons
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productsIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;

const Home = () => {
  const dispatch = useDispatch();

  //Orders
  const fbOrders = useFetchCollection("orders");
  const orders = useSelector(selectStoreOrders);

  //Products
  const fbProducts = useFetchCollection("products");
  const products = useSelector(selectProducts);

  //Earnings
  const earnings = useSelector(selectTotalEarnings);

  useEffect(() => {
    dispatch(STORE_PRODUCTS(fbProducts.data));
    dispatch(STORE_ORDERS(fbOrders.data));
    dispatch(CALCULATE_TOTAL_EARNING());
  }, [dispatch, fbOrders, fbProducts]);

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      {fbProducts.isLoading === true || fbOrders.isLoading === true ? (
        <img src={spinnerImg} alt="Loading.." style={{ width: "50px" }} />
      ) : (
        <>
          <div className={styles["info-box"]}>
            <InfoBox
              cardClass={`${styles.card} ${styles.card1}`}
              title={"Earnings"}
              count={`$${earnings}`}
              icon={earningIcon}
            />
            <InfoBox
              cardClass={`${styles.card} ${styles.card2}`}
              title={"Products"}
              count={products.length}
              icon={productsIcon}
            />
            <InfoBox
              cardClass={`${styles.card} ${styles.card3}`}
              title={"Orders"}
              count={orders.length}
              icon={ordersIcon}
            />
          </div>
          <Chart orders={orders} />
        </>
      )}
    </div>
  );
};

export default Home;
