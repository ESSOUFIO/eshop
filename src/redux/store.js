import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import prodReducer from "./productSlice";
import filterReducer from "./filterSlice";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice";
import orderReducer from "./orderSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: prodReducer,
  filter: filterReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orders: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
