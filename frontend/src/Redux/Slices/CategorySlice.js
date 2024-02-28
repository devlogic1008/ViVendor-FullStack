import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
  const response = await axios.get('http://localhost:5000/v1/category/get-all-categories');
  return response.data;
});

export const addCategory = createAsyncThunk('category/addCategory', async (categoryData) => {
  const response = await axios.post('http://localhost:5000/v1/category/create-category', categoryData);
  return response.data;
});

export const updateCategory = createAsyncThunk('category/updateCategory', async ({ key, formData }) => {
  const response = await axios.put(`http://localhost:5000/v1/category/update-category/${key}`, formData);
  return response.data;
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (key) => {
  await axios.delete(`http://localhost:5000/v1/category/delete-category/${key}`);
  return key;
});

export const createSubCategory = createAsyncThunk('category/createSubCategory', async ({ title, parentCategoryId }) => {
  const response = await axios.post('http://localhost:5000/v1/category/create-sub-category', { title, parentCategoryId });
  return response.data;
});


const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const updatedCategory = action.payload;
        const updatedCategoryId = updatedCategory.id;

        const updatedCategoryIndex = state.categories.findIndex((category) => category.id === updatedCategoryId);

        if (updatedCategoryIndex !== -1) {
          state.categories[updatedCategoryIndex] = updatedCategory;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category.id !== action.payload);
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      });
  },
});

export default categorySlice.reducer;
