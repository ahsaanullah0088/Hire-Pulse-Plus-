import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axiosInstance.js";

// ✅ Fetch all blogs
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const { data } = await API.get("/blogs");
  return data;
});

// ✅ Create a new blog (admin only)
export const createBlog = createAsyncThunk("blogs/createBlog", async (blogData, { rejectWithValue }) => {
  try {
    const { data } = await API.post("/blogs", blogData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch blogs
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
      // Create blog
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      });
  },
});

export default blogSlice.reducer;
