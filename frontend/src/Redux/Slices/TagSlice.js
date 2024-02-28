import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const response = await axios.get('http://localhost:5000/v1/tag/getAllTags');
  return response.data;
});

export const addTag = createAsyncThunk('tag/addTag', async (TagData) => {
  const response = await axios.post('http://localhost:5000/v1/tag/createTag', TagData);
  return response.data;
});



export const deleteTag = createAsyncThunk('tag/deleteTag', async (key) => {
    await axios.delete(`http://localhost:5000/v1/tag/deleteTag/${key}`);
    return key;
  });

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tags: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTag.fulfilled, (state, action) => {
        state.tags.push(action.payload);
      })
      
      
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.tags = state.tags.filter((tag) => tag.id !== action.payload);
      });
  },
});

export default tagSlice.reducer;
