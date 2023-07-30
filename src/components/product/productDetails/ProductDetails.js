import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductDetails.module.scss";
import spinnerImg from "../../../asset/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  DECREASE_QTY_CART,
  selectCartItems,
} from "../../../redux/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [reviews, setReviews] = useState([]);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const { document } = useFetchDocument("products", id);

  const increaseCartQty = () => {
    dispatch(ADD_TO_CART(document));
  };

  const decreaseCartQty = () => {
    dispatch(DECREASE_QTY_CART({ item: document }));
  };

  useEffect(() => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      setCartQuantity(item.cartQuantity);
    } else {
      setCartQuantity(0);
    }
  }, [cartItems, id]);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  useEffect(() => {
    const getReviews = async () => {
      let array = [];
      const q = query(collection(db, "reviews"), where("productID", "==", id));

      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        array.push(doc.data());
      });
      setReviews(array);
    };

    getReviews();
  }, [id]);

  return (
    <div className={`container ${styles.product}`}>
      <h2>Product Details</h2>
      <div>
        <Link to="/#products">&larr; Back To Products</Link>
      </div>
      {product === null ? (
        <div className={`--centred-all ${styles.spinner}`}>
          <img src={spinnerImg} alt="Loading.." style={{ width: "75px" }} />
        </div>
      ) : (
        <>
          <div className={styles.details}>
            <div className={styles.img}>
              <img src={product.imageURL} alt={product.name} />
            </div>
            <div className={styles.content}>
              <h3>{product.name}</h3>
              <p className={styles.price}>{`$${product.price}`}</p>
              <p>{product.desc}</p>
              <p>
                <b>SKU:</b> {product.id}
              </p>
              <p>
                <b>Brand:</b> {product.brand}
              </p>
              {cartQuantity !== 0 ? (
                <div className={styles.count}>
                  <div className={styles.count}>
                    <button className="--btn" onClick={() => decreaseCartQty()}>
                      -
                    </button>
                    <p>
                      <b>{cartQuantity}</b>
                    </p>
                    <button className="--btn" onClick={() => increaseCartQty()}>
                      +
                    </button>
                  </div>
                </div>
              ) : null}
              <button className="--btn --btn-danger" onClick={increaseCartQty}>
                ADD TO CARD
              </button>
            </div>
          </div>
        </>
      )}

      <Card cardClass={styles.card}>
        <h3>Product Reviews</h3>
        <div>
          {reviews.length === 0 ? (
            <p>There are no Reviews for this product yet.</p>
          ) : (
            reviews.map((item, index) => {
              const { rate, review, userName, reviewDate } = item;
              return (
                <div className={styles.review} key={index}>
                  <StarsRating value={rate} />
                  <p>{review}</p>
                  <br />
                  <span>
                    <b>{reviewDate}</b>
                  </span>
                  <br />
                  <span>
                    by:<b> {userName}</b>
                  </span>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;
