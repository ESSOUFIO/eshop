import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCT(state, action) {
      const { products, category, brand, price, search } = action.payload;
      //Filter by Category
      let filterCategory = [];
      if (category === "All") {
        filterCategory = products;
      } else {
        const filtProducts = products.filter(
          (product) => product.category === category
        );
        filterCategory = filtProducts;
      }
      // Filter by Brand
      let filterBrand = [];
      if (brand === "All") {
        filterBrand = filterCategory;
      } else {
        const filtProducts = filterCategory.filter(
          (product) => product.brand === brand
        );
        filterBrand = filtProducts;
      }
      // Filter by Price
      let filterPrice = filterBrand.filter((product) => product.price <= price);
      //Filter by search
      const filtSearch = filterPrice.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = filtSearch;
    },
    SORT_PRODUCT(state, action) {
      const { sort } = action.payload;

      let tempProducts = [];

      if (sort === "latest") {
        tempProducts = state.filteredProducts.sort((a, b) => {
          return a.createdAt - b.createdAt;
        });
      }

      if (sort === "lowest-price") {
        tempProducts = state.filteredProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempProducts = state.filteredProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "a-z") {
        tempProducts = state.filteredProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }

      if (sort === "z-a") {
        tempProducts = state.filteredProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      state.filteredProducts = tempProducts;
    },
  },
});

export const { SORT_PRODUCT, FILTER_PRODUCT } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
