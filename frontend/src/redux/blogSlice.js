import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axiosInstance.js";

/* 🔹 Fetch All Blogs */
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/blogs");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

/* 🔹 Fetch Limited (3) Blogs */
export const fetchLimitedBlogs = createAsyncThunk(
  "blogs/fetchLimited",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/blogs/limited");
;
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);


/* 🔹 Create Blog (Admin Only) */
export const createBlog = createAsyncThunk(
  "blogs/create",
  async (blogData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.post("/blogs", blogData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    limitedBlogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLimitedBlogs.fulfilled, (state, action) => {
        state.limitedBlogs = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      });
  },
});

export default blogSlice.reducer;
