import { useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../../components/card/Card";
import { db, storage } from "../../../firebase/config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Loader } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/productSlice";

const categories = [
  {
    id: 1,
    name: "Laptop",
  },
  {
    id: 2,
    name: "Electronics",
  },
  {
    id: 3,
    name: "Phone",
  },
  {
    id: 4,
    name: "Fashion",
  },
];

const InitialState = {
  name: "",
  imageURL: "",
  price: "",
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const [product, setProduct] = useState(() => {
    const initState = id === "ADD" ? { ...InitialState } : { ...productEdit };
    return initState;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `eshop/${Date.now() + file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.floor(progress));
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      toast.success("New Product uploaded successfully.");
      setProduct({ ...InitialState });
      setIsLoading(false);
      navigate("/admin/all-products");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const detectForm = (id, f1, f2) => {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  };

  const editProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const desertRef = ref(storage, productEdit.imageURL);
      deleteObject(desertRef);
    }

    const prodRef = doc(db, "products", id);
    await setDoc(prodRef, {
      name: product.name,
      imageURL: product.imageURL,
      price: Number(product.price),
      category: product.category,
      brand: product.brand,
      desc: product.desc,
      createdAt: productEdit.createdAt,
      editedAt: Timestamp.now().toDate(),
    });
    toast.success("Product updated successfully.");
    setIsLoading(false);
    navigate("/admin/all-products");
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Product Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleInputChange}
              required
            />

            <label>Product Image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                  <p>
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}%`
                      : `Uploading Complete ${uploadProgress}%`}
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
              />
              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  required
                  name="imageURL"
                  placeholder="Image URL"
                  value={product.imageURL}
                  onChange={handleInputChange}
                  disabled
                />
              )}
            </Card>

            <label>Product Price:</label>
            <input
              type="number"
              placeholder="Product Price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />

            <label>Product Category:</label>
            <select
              value={product.category}
              name="category"
              onChange={handleInputChange}
            >
              <option value="" disabled>
                -- Choose Product Category --
              </option>
              {categories.map((cat) => {
                return (
                  <option value={cat.name} key={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <label>Product Company/Brand:</label>
            <input
              type="text"
              name="brand"
              placeholder="Product Company/Brand"
              value={product.brand}
              onChange={handleInputChange}
            />

            <label>Product description:</label>
            <textarea
              type="text"
              rows={6}
              name="desc"
              placeholder="Product description"
              value={product.desc}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="--btn --btn-primary">
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
