import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "src/app/store";
import { AuthState } from "src/interfaces/auth";
import api from "src/utils/api";

const initialState: AuthState = {
  isInitialised: false,
  loginStatus: "idle",
  registerStatus: "idle",
  isAuthenticated: false,
  user: null,
  loginError: null,
  registerError: null,
};

export const initialise = createAsyncThunk("auth/initialise", async () => {
  if (!localStorage.getItem("token")) return Promise.reject();
  const response = await api.get("/user/me");
  return response.data;
});

export const login = createAsyncThunk(
  "auth/login",
  async (params: { username: string; password: string }) => {
    const response = await api.post("/user/login", params);
    return {
      user: response.data.user,
      token: response.data.token,
    };
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (params: { username: string; email: string; password: string }) => {
    const response = await api.post("/user/register", params);
    return {
      user: response.data.user,
      token: response.data.token,
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
    },
    clearErrors: (state) => {
      state.loginError = null;
      state.registerError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initialise.fulfilled, (state, action) => {
      state.isInitialised = true;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(initialise.rejected, (state) => {
      state.isInitialised = true;
      state.isAuthenticated = false;
    });
    // ----------------------------------------------------------------------
    builder.addCase(login.pending, (state) => {
      state.loginStatus = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginStatus = "success";
      state.isAuthenticated = true;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginStatus = "fail";
      state.isAuthenticated = false;
      state.loginError = action.error.message || "Unexpected error has occured.";
    });
    // ----------------------------------------------------------------------
    builder.addCase(register.pending, (state) => {
      state.registerStatus = "loading";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.registerStatus = "success";
      state.isAuthenticated = true;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerStatus = "fail";
      state.isAuthenticated = false;
      state.registerError = action.error.message || "Unexpected error has occured.";
    });
  },
});

export const { logout, clearErrors } = authSlice.actions;

export const selectIsInitialised = (state: RootState) => state.auth.isInitialised;
export const selectUser = (state: RootState) => state.auth.user;
export const selectLoginStatus = (state: RootState) => state.auth.loginStatus;
export const selectRegisterStatus = (state: RootState) => state.auth.registerStatus;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectLoginError = (state: RootState) => state.auth.loginError;
export const selectRegisterError = (state: RootState) => state.auth.registerError;

export default authSlice.reducer;
