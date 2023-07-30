import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: [],
  storeOrders: [],
  totalEarnings: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    MY_ORDERS(state, action) {
      state.orderHistory = action.payload;
    },
    STORE_ORDERS(state, action) {
      state.storeOrders = action.payload;
    },
    CALCULATE_TOTAL_EARNING(state) {
      let totalEarn = 0;
      state.storeOrders.forEach((order) => {
        totalEarn += order.orderAmount;
      });
      state.totalEarnings = totalEarn;
    },
  },
});

export const { MY_ORDERS, STORE_ORDERS, CALCULATE_TOTAL_EARNING } =
  orderSlice.actions;

export const selectOrderHistory = (state) => state.orders.orderHistory;
export const selectStoreOrders = (state) => state.orders.storeOrders;
export const selectTotalEarnings = (state) => state.orders.totalEarnings;

export default orderSlice.reducer;
