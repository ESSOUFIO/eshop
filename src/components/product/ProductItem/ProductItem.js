import React from "react";
import styles from "./ProductItem.module.scss";
import Card from "../../card/Card";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../../redux/cartSlice";

const ProductItem = ({ product, grid, id, name, price, desc, imageURL }) => {
  const shortenText = (text, nbrMaxLetter) => {
    if (text.length > nbrMaxLetter) {
      const shortenedText = text.substring(0, nbrMaxLetter).concat("...");
      return shortenedText;
    }
    return text;
  };
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(ADD_TO_CART(product));
  };
  return (
    <Card cardClass={grid ? styles.grid : styles.list}>
      <div className={styles.img}>
        <Link to={`/product-details/${id}`}>
          <img src={imageURL} alt={name} />
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`$${price}`}</p>
          <h4>{shortenText(name, 20)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}
        <button className="--btn --btn-danger" onClick={addToCart}>
          Add To Cart
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
