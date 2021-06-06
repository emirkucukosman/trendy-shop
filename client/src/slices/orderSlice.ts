import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/app/store";
import { OrderState } from "src/interfaces/order";
import { ICartItem } from "src/interfaces/product";
import { IOrderItem } from "src/interfaces/order";
import api from "src/utils/api";

const initialState: OrderState = {
  createOrderStatus: "idle",
  fetchOrdersStatus: "idle",
  orders: [],
  createOrderError: null,
  fetchOrdersError: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (cartItems: ICartItem[]) => {
    const orderItems: IOrderItem[] = [];
    cartItems.map((cartItem) => {
      return orderItems.push({
        ...cartItem.product,
        quantity: cartItem.quantity,
      });
    });
    await api.post("/orders", { orderItems });
  }
);

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const response = await api.get("/orders");
  return response.data;
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.createOrderStatus = "idle";
      state.fetchOrdersStatus = "idle";
    },
    clearErrors: (state) => {
      state.createOrderError = null;
      state.fetchOrdersError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.createOrderStatus = "loading";
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.createOrderStatus = "success";
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.createOrderStatus = "error";
      state.createOrderError = action.error.message || "Unexpected error has occured.";
    });
    // --------------------------------------------------------------------------------------
    builder.addCase(fetchOrders.pending, (state) => {
      state.fetchOrdersStatus = "loading";
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.fetchOrdersStatus = "success";
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.fetchOrdersStatus = "error";
      state.fetchOrdersError = action.error.message || "Unexpected error has occured.";
    });
  },
});

export const { clearErrors, clearStatus } = orderSlice.actions;

export const selectCreateOrderStatus = (state: RootState) => state.order.createOrderStatus;
export const selectFetchOrdersStatus = (state: RootState) => state.order.fetchOrdersStatus;
export const selectOrders = (state: RootState) => state.order.orders;
export const selectCreateOrderError = (state: RootState) => state.order.createOrderError;
export const selectFetchOrdersError = (state: RootState) => state.order.fetchOrdersError;

export default orderSlice.reducer;
