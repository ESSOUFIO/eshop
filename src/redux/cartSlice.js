import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totalQuantity: localStorage.getItem("totalQuantity")
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0,
  totalAmount: localStorage.getItem("totalAmount")
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0,
  previousURL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`"${action.payload.name}" increased by one`, {
          position: "top-left",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`"${action.payload.name}" added to the cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_QTY_CART(state, action) {
      const { item } = action.payload;
      const index = state.cartItems.findIndex((el) => el.id === item.id);
      if (state.cartItems[index].cartQuantity > 1) {
        state.cartItems[index].cartQuantity -= 1;
        toast.info(`"${item.name}" decresed by one.`, {
          position: "top-left",
        });
      } else if (state.cartItems[index].cartQuantity === 1) {
        const newCartItems = state.cartItems.filter((el) => el.id !== item.id);
        state.cartItems = newCartItems;
        toast.warning(`"${item.name}" removed from cart`, {
          position: "top-left",
        });
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    REMOVE_FROM_CART(state, action) {
      const { item } = action.payload;
      const tempArray = state.cartItems.filter((el, i) => el.id !== item.id);
      state.cartItems = tempArray;
      toast.warning(`"${item.name}" removed from cart`, {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_SUBTOTAL(state) {
      let totalAmount = 0;
      state.cartItems.forEach((item) => {
        totalAmount += item.price * item.cartQuantity;
      });
      state.totalAmount = totalAmount;
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
    },
    CLEAR_CART(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      toast.info("Cart cleared", {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_TOTAL_QUANTITY(state) {
      let totalQuantity = 0;
      state.cartItems.forEach((item) => {
        totalQuantity += item.cartQuantity;
      });
      state.totalQuantity = totalQuantity;
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },
    SAVE_URL(state, action) {
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_QTY_CART,
  REMOVE_FROM_CART,
  CALCULATE_SUBTOTAL,
  CLEAR_CART,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer;
