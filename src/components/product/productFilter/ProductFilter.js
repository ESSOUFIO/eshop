import styles from "./ProductFilter.module.scss";
import { useSelector } from "react-redux";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../../redux/productSlice";

const ProductFilter = ({
  category,
  price,
  getCategory,
  getBrand,
  getPrice,
  clearFilters,
}) => {
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const allCategory = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const AllBrand = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  return (
    <div className={styles.filter}>
      <h4>Category</h4>
      <div className={styles.category}>
        {allCategory.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={cat === category ? `${styles.active}` : null}
              onClick={() => getCategory(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>

      <h4>Brands</h4>
      <div className={styles.brand}>
        <select name="brand" onChange={(e) => getBrand(e.target.value)}>
          {AllBrand.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>

      <h4>Price</h4>
      <p>${price}</p>
      <div className={styles.price}>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={(e) => getPrice(e.target.value)}
        />
      </div>
      <button className="--btn --btn-danger" onClick={clearFilters}>
        Clear Filter
      </button>
    </div>
  );
};

export default ProductFilter;
