import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogSlice.js';
import jobReducer from './jobSlice.js';

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    jobs: jobReducer,
  },
});
