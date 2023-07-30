import React, { useState, useEffect } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";
import ProductItem from "../ProductItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  SORT_PRODUCT,
  selectFilteredProducts,
} from "../../../redux/filterSlice";
import Pagination from "../../pagination/Pagination";

const ProductList = ({ search, getSearch }) => {
  const [grid, setGrid] = useState(true);
  const [sort, setSort] = useState("latest");
  const filteredProducts = useSelector(selectFilteredProducts);

  //Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  // const [productsPerPage, setProductsPerPage] = useState(9);
  const productsPerPage = 9;
  //Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCT({ sort }));
  }, [dispatch, filteredProducts, sort]);

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          {grid && (
            <BsFillGridFill
              size={22}
              color="orangered"
              onClick={() => setGrid(true)}
            />
          )}
          {!grid && (
            <BsFillGridFill
              size={22}
              color="#0066d4"
              onClick={() => setGrid(true)}
            />
          )}
          {grid && (
            <FaListAlt
              size={24}
              color="#0066d4"
              onClick={() => setGrid(false)}
            />
          )}
          {!grid && (
            <FaListAlt
              size={24}
              color="orangered"
              onClick={() => setGrid(false)}
            />
          )}
          <p>
            <b>{filteredProducts.length}</b> Products found.
          </p>
        </div>

        {/* Search product */}
        <div>
          <Search value={search} onChange={(e) => getSearch(e.target.value)} />
        </div>
        {/* Sort product */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid ? styles.grid : styles.list}>
        {filteredProducts.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {currentProducts.map((product) => (
              <div key={product.id}>
                <ProductItem {...product} grid={grid} product={product} />
              </div>
            ))}
          </>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};

export default ProductList;
