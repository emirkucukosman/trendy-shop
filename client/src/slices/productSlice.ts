import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem, IProductFilter, ProductState } from "src/interfaces/product";
import type { RootState } from "src/app/store";
import api from "src/utils/api";

const initialState: ProductState = {
  fetchProductsStatus: "idle",
  fetchProductStatus: "idle",
  products: [],
  cart: [],
  cartTotal: 0,
  product: null,
  categoryFilter: undefined,
};

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (filter: IProductFilter) => {
    const { category, brands } = filter;
    const response = await api.post(`/products/${category ? category : ""}`, { brands });
    return {
      products: response.data,
      categoryFilter: category ? category : undefined,
    };
  }
);

export const fetchProductBySlug = createAsyncThunk(
  "product/fetchProductBySlug",
  async (slug: string) => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      state.cart.push(action.payload);
      state.cartTotal += action.payload.product.price * action.payload.quantity;
    },
    removeFromCart: (state, action: PayloadAction<ICartItem>) => {
      state.cart = state.cart.filter((c) => c.uid !== action.payload.uid);
      state.cartTotal -= action.payload.product.price * action.payload.quantity;
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartTotal = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.fetchProductsStatus = "loading";
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.fetchProductsStatus = "success";
      state.products = action.payload.products;
      state.categoryFilter = action.payload.categoryFilter;
    });
    builder.addCase(fetchAllProducts.rejected, (state) => {
      state.fetchProductsStatus = "fail";
    });
    // ----------------------------------------------------------------
    builder.addCase(fetchProductBySlug.pending, (state) => {
      state.fetchProductStatus = "loading";
    });
    builder.addCase(fetchProductBySlug.fulfilled, (state, action) => {
      state.fetchProductStatus = "success";
      state.product = action.payload;
    });
    builder.addCase(fetchProductBySlug.rejected, (state) => {
      state.fetchProductStatus = "fail";
    });
  },
});

export const { addToCart, removeFromCart, clearCart } = productSlice.actions;

export const selectProductsStatus = (state: RootState) =>
  state.product.fetchProductsStatus;
export const selectProductStatus = (state: RootState) => state.product.fetchProductStatus;
export const selectProducts = (state: RootState) => state.product.products;
export const selectCart = (state: RootState) => state.product.cart;
export const selectCartTotal = (state: RootState) => state.product.cartTotal;
export const selectProduct = (state: RootState) => state.product.product;
export const selectCategoryFilter = (state: RootState) => state.product.categoryFilter;

export default productSlice.reducer;
