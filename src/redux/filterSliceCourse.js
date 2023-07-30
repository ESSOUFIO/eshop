import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const filtProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = filtProducts;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      if (category === "All") {
        state.filteredProducts = products;
      } else {
        const filtProducts = products.filter(
          (product) => product.category === category
        );
        state.filteredProducts = filtProducts;
      }
    },
    FILTER_BY_BRAND(state, action) {
      const { products, brand } = action.payload;
      if (brand === "All") {
        state.filteredProducts = products;
      } else {
        const filtProducts = products.filter(
          (product) => product.brand === brand
        );
        state.filteredProducts = filtProducts;
      }
    },
    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload;
      const filtProducts = products.filter((product) => product.price <= price);
      state.filteredProducts = filtProducts;
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

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCT,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
