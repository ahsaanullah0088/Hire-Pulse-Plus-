import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axiosInstance.js";

// ✅ Fetch all jobs
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const { data } = await API.get("/jobs");
  return data;
});

// ✅ Create a new job (admin only)
export const createJob = createAsyncThunk("jobs/createJob", async (jobData, { rejectWithValue }) => {
  try {
    const { data } = await API.post("/jobs", jobData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create job
      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
      });
  },
});

export default jobSlice.reducer;
