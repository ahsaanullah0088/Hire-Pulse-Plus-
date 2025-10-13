import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axiosInstance.js";

/* -------------------- 🔹 FETCH ALL BLOGS -------------------- */
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

/* -------------------- 🔹 CREATE BLOG (Admin Only) -------------------- */
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

/* -------------------- 🔹 UPDATE BLOG (Admin Only) -------------------- */
export const updateBlog = createAsyncThunk(
  "blogs/update",
  async ({ id, blogData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.put(`/blogs/${id}`, blogData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

/* -------------------- 🔹 DELETE BLOG (Admin Only) -------------------- */
export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

/* -------------------- 🔹 SLICE -------------------- */
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* 🟢 FETCH BLOGS */
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

      /* 🟢 CREATE BLOG */
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* 🟢 UPDATE BLOG */
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(
          (blog) => blog._id === action.payload._id
        );
        if (index !== -1) state.blogs[index] = action.payload;
      })

      /* 🟢 DELETE BLOG */
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
