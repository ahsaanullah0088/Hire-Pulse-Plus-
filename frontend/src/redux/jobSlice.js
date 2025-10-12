import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axiosInstance.js";

// ✅ Fetch all jobs
export const fetchJobs = createAsyncThunk("jobs/fetchAll", async () => {
  const { data } = await API.get("/jobs");
  return data;
});

// ✅ Create a new job (admin only)
export const createJob = createAsyncThunk(
  "jobs/create",
  async (jobData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.post("/jobs", jobData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ✅ Update a job (admin only)
export const updateJob = createAsyncThunk(
  "jobs/update",
  async ({ id, jobData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.put(`/jobs/${id}`, jobData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ✅ Delete a job (admin only)
export const deleteJob = createAsyncThunk(
  "jobs/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id; // return the deleted job's ID
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
      })

      // Update job
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex((job) => job._id === action.payload._id);
        if (index !== -1) state.jobs[index] = action.payload;
      })

      // Delete job
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
      });
  },
});

export default jobSlice.reducer;
