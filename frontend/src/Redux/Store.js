import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './Slices/CategorySlice';

import tagReducer from './Slices/TagSlice';
import productReducer from './Slices/ProductSlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    tag:tagReducer,
    product:productReducer,
  },
});

export default store;
