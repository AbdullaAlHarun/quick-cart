import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL
const API_URL = "https://v2.api.noroff.dev/online-shop";

// ✅ Fix: Extract `data` from API response
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch(API_URL);
  const result = await response.json();
  console.log("API Response:", result); // ✅ Check API response in console

  return result.data; // ✅ Ensure only `data` array is returned
});

// Product Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // ✅ Ensure it's an array
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
        console.log("Products stored in Redux:", action.payload); // ✅ Check if products are stored
        state.status = "succeeded";
        state.products = action.payload || []; // ✅ Ensure an array is stored
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
