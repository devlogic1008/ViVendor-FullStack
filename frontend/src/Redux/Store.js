import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './Slices/CategorySlice';

import tagReducer from './Slices/TagSlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    tag:tagReducer,
  },
});

export default store;
