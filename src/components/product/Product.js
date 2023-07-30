import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
  selectMaxPrice,
  selectProducts,
} from "../../redux/productSlice";
import ProductList from "./productList/ProductList";
import spinnerImg from "../../asset/spinner.jpg";
import { FILTER_PRODUCT } from "../../redux/filterSlice";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);
  const [showFilter, setShowFilter] = useState(false);

  const maxPrice = useSelector(selectMaxPrice);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    setPrice(maxPrice);
  }, [maxPrice]);

  const getSearch = (text) => {
    setSearch(text);
  };
  const getCategory = (item) => {
    setCategory(item);
  };
  const getBrand = (item) => {
    setBrand(item);
  };
  const getPrice = (item) => {
    setPrice(item);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  useEffect(() => {
    dispatch(STORE_PRODUCTS(data));
    dispatch(GET_PRICE_RANGE({ products: data }));
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_PRODUCT({ products, category, brand, price, search }));
  }, [dispatch, products, category, brand, price, search]);

  return (
    <section>
      <div className={`container ${styles.product}`} id="products">
        {isLoading ? (
          <img
            src={spinnerImg}
            alt="Loading.."
            style={{ width: "50px" }}
            className="--center-all"
          />
        ) : (
          <>
            <aside
              className={
                showFilter ? `${styles.filter} ${styles.show}` : styles.filter
              }
            >
              <ProductFilter
                category={category}
                price={price}
                getCategory={getCategory}
                getBrand={getBrand}
                getPrice={getPrice}
                clearFilters={clearFilters}
              />
            </aside>

            <div className={styles.content}>
              <ProductList search={search} getSearch={getSearch} />
              <div
                className={styles.icon}
                onClick={() => setShowFilter(!showFilter)}
              >
                <FaCogs size={20} color="orangered" />
                <p>
                  <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Product;
