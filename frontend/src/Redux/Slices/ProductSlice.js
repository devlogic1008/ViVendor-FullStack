import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_BACKEND_URL;

// Create async thunk for fetching all products
export const getAllProductsAsync = createAsyncThunk('product/get-products', async () => {
  const response = await axios.get(`${apiBaseUrl}/v1/product/products`);
  return response.data;
});

// Create async thunk for creating a new product
export const createProductAsync = createAsyncThunk('product/create-products', async (productData) => {
  const response = await axios.post(`${apiBaseUrl}/v1/product/products`, productData);
  return response.data;
});

// Create async thunk for deleting a product
export const deleteProductAsync = createAsyncThunk('product/delete-products', async (productId) => {
  const response = await axios.delete(`${apiBaseUrl}/v1/product/products/${productId}`);
  return response.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    newProduct: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Reducer for fetching all products
    builder
      .addCase(getAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.data;
      })
      .addCase(getAllProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Reducer for creating a new product
    builder
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.newProduct = action.payload.data;
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Reducer for deleting a product
    builder
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        // You can update the state accordingly after a successful delete if needed
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
