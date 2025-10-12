// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice";
import blogReducer from "./blogSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    blogs: blogReducer,
    auth: authReducer,
  },
});
