import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL
const API_URL = "https://v2.api.noroff.dev/online-shop";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch(API_URL);
  const result = await response.json();
  return result.data;
});

// Product Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [], 
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
