import { configureStore } from "@reduxjs/toolkit";
import authReducer from "src/slices/authSlice";
import productReducer from "src/slices/productSlice";
import orderReducer from "src/slices/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type ReduxDispatch = typeof store.dispatch;

export default store;
