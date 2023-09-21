import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import styles from "./OrderDetails.module.scss";
import spinnerImg from "../../../asset/spinner.jpg";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";

const OrderDetails = () => {
  const { id } = useParams();
  const order = useFetchDocument("orders", id);

  console.log(order.isLoading);

  return (
    <div className={`container ${styles.table}`}>
      <h2>Order Details</h2>
      <div>
        <Link to="/admin/orders">&larr; Back to Orders</Link>
      </div>
      <br />
      {order.document === null ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <img src={spinnerImg} alt="Loading.." style={{ width: "80px" }} />
        </div>
      ) : (
        <>
          <p>
            <b>Order ID: </b>
            {order.document.id}
          </p>
          <p>
            <b>Order Amount: </b>${order.document.orderAmount}
          </p>
          <p>
            <b>Order Status: </b>
            {order.document.orderStatus}
          </p>
          <p>
            <b>Address Shipping: </b>
            <br />
            Address: {order.document.shippingAddress.line1},{" "}
            {order.document.shippingAddress.line2},{" "}
            {order.document.shippingAddress.city}
            <br />
            State: {order.document.shippingAddress.state}
            <br />
            Country: {order.document.shippingAddress.country}
          </p>
          <br />
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.document.cardItems.map((item, index) => {
                const { id, name, price, imageURL, cartQuantity } = item;
                return (
                  <tr key={id}>
                    <td>
                      <b>{index + 1}</b>
                    </td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <b>${price}</b>
                    </td>
                    <td>
                      <b>{cartQuantity}</b>
                    </td>
                    <td>
                      <b>${(price * cartQuantity).toFixed(2)}</b>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      <br />
      <ChangeOrderStatus orderID={id} order={order.document} />
    </div>
  );
};

export default OrderDetails;
