

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiBaseUrl = process.env.BACKEND_URL;

export const createProductAsync = createAsyncThunk('products/createProduct', async (productData) => {
  const response = await axios.post('http://localhost:5000/v1/product/products', productData);
  return response.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    newProduct: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.newProduct = action.payload;
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
