import React from "react";
import { useSelector } from "react-redux";
import styles from "./CheckoutSummary.module.scss";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import Card from "../card/Card";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const totalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div>
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No item in your cart.</p>
            <button className="--btn">
              <Link to="/#products">Back to Shop</Link>
            </button>
          </>
        ) : (
          <>
            <p>
              Cart Item(s): <b>{totalQuantity}</b>
            </p>
            <div className={styles.text}>
              <h4>Subtotal: </h4>
              <h3>${totalAmount.toFixed(2)}</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <Card cardClass={styles.card} key={id}>
                  <h4>Product: {name}</h4>
                  <p>Quantiy: {cartQuantity}</p>
                  <p>Unit Price: ${price}</p>
                  <p>Set Price: ${(price * cartQuantity).toFixed(2)}</p>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
