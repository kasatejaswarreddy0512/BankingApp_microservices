import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../API/Api";

// --- Async Thunks ---
export const depositSlice = createAsyncThunk(
  "transaction/deposit",
  async ({ accountId, amount, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/transaction/deposit/${accountId}`,
        null,
        {
          params: { amount },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const withdrawSlice = createAsyncThunk(
  "transaction/withdraw",
  async ({ accountId, amount, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/transaction/withdraw/${accountId}`,
        null,
        {
          params: { amount },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const transferSlice = createAsyncThunk(
  "transaction/transfer",
  async ({ fromAccountId, toAccountId, amount, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/transaction/transfer/${fromAccountId}/to/${toAccountId}`,
        null,
        {
          params: { amount },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --- Slice ---
const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [], // all past transactions
    lastTransaction: null, // most recent transaction
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Deposit
      .addCase(depositSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(depositSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.lastTransaction = action.payload;
        state.transactions.push(action.payload);
      })
      .addCase(depositSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Withdraw
      .addCase(withdrawSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(withdrawSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.lastTransaction = action.payload;
        state.transactions.push(action.payload);
      })
      .addCase(withdrawSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Transfer
      .addCase(transferSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transferSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.lastTransaction = action.payload;
        state.transactions.push(action.payload);
      })
      .addCase(transferSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
