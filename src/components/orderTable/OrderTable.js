import React from "react";
import styles from "./OrderTable.module.scss";
import spinnerImg from "../../asset/spinner.jpg";

const OrderTable = ({ orders, isLoading, orderDetails }) => {
  return (
    <div className={styles.table}>
      {isLoading === true ? (
        <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
      ) : (
        <div className={styles.table}>
          {orders.length === 0 ? (
            <p>No order found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const { id, orderDate, orderTime, orderAmount, orderStatus } =
                    order;
                  return (
                    <tr key={index} onClick={() => orderDetails(id)}>
                      <td>{index + 1}</td>
                      <td>
                        {orderDate} at {orderTime}
                      </td>
                      <td>{id}</td>
                      <td>${orderAmount}</td>
                      <td>
                        <p
                          className={
                            orderStatus !== "Delivered"
                              ? styles.pending
                              : styles.delivered
                          }
                        >
                          {orderStatus}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderTable;
