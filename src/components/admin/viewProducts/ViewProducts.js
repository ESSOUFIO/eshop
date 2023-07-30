import React, { useEffect, useState } from "react";
import styles from "./ViewProducts.module.scss";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "../../../redux/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Search from "../../search/Search";
import {
  FILTER_PRODUCT,
  selectFilteredProducts,
} from "../../../redux/filterSlice";
import Pagination from "../../pagination/Pagination";
import spinnerImg from "../../../asset/spinner.jpg";

const ViewProducts = () => {
  const { data, isLoading } = useFetchCollection("products");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const filtredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(STORE_PRODUCTS(data));
  }, [dispatch, data]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {},
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const desertRef = ref(storage, imageURL);
      await deleteObject(desertRef);
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    dispatch(
      FILTER_PRODUCT({
        products,
        category: "All",
        brand: "All",
        price: 50000,
        search,
      })
    );
  }, [dispatch, search, products]);

  //Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  // const [productsPerPage, setProductsPerPage] = useState(9);
  const productsPerPage = 9;
  //Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filtredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <div className={styles.table} style={{ overflowX: "auto" }}>
        <h2>View All Products</h2>
        <div className={styles.search}>
          {filtredProducts === null ? null : (
            <p>
              <b>{filtredProducts.length} products</b> found.
            </p>
          )}

          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filtredProducts === null ? (
          <p>No product found.</p>
        ) : (
          <>
            {isLoading === true ? (
              <img src={spinnerImg} alt="Loading.." style={{ width: "50px" }} />
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((prod, index) => {
                    const { id, name, imageURL, category, price } = prod;
                    return (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>
                          <img src={imageURL} alt={name} width={100} />
                        </td>
                        <td>{name}</td>
                        <td>{category}</td>
                        <td>{`$${price}`}</td>
                        <td className={styles.icons}>
                          <Link to={`/admin/add-product/${id}`}>
                            <FaEdit color="green" size={20} />
                          </Link>
                          &nbsp;
                          <FaTrashAlt
                            color="red"
                            size={18}
                            onClick={() => confirmDelete(id, imageURL)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filtredProducts.length}
      />
    </>
  );
};

export default ViewProducts;
