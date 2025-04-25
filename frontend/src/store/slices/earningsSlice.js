import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch earnings for a specific interviewer
export const fetchEarnings = createAsyncThunk(
  'earnings/fetchEarnings',
  async (interviewerId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/earnings/${interviewerId}`);
      return response.data; // Assuming this returns the earnings object
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
);
const earningsSlice = createSlice({
  name: "earnings",
  initialState: { amount: 0 },
  reducers: {
    addEarnings: (state, action) => {
      state.amount += action.payload; // ✅ Add earnings amount
    },
    resetEarnings: (state) => {
      state.amount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchEarnings.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchEarnings.fulfilled, (state, action) => {
      state.loading = false;
      state.amount = action.payload.totalEarnings || 0; // Store the fetched earnings
    })
    .addCase(fetchEarnings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { addEarnings, resetEarnings } = earningsSlice.actions; // ✅ Export addEarnings
export default earningsSlice.reducer;
