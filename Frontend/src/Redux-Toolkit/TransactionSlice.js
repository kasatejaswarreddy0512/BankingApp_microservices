import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../API/Api";

// --- Async Thunks ---
export const depositMoney = createAsyncThunk(
  "transaction/deposit",
  async ({ accountNumber, amount, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/transaction/deposit/${accountNumber}`,
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

export const withdrawMoney = createAsyncThunk(
  "transaction/withdraw",
  async ({ accountNumber, amount, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/transaction/withdraw/${accountNumber}`,
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

export const transferMoney = createAsyncThunk(
  "transaction/transfer",
  async ({ fromAccountNumber, toAccountNumber, amount, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/transaction/transfer/${fromAccountNumber}/to/${toAccountNumber}`,
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


export const transferMoneyToUpi = createAsyncThunk(
  "transaction/transferUpi",
  async ({ fromUpi, toUpi, amount, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/transaction/upi/${fromUpi}/to/${toUpi}`,
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

export const fetchTransactions = createAsyncThunk(
  "transaction/fetch",
  async ({ accountNumber, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/transaction/${accountNumber}`,
        {
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
    transactions: [],
    lastTransaction: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Deposit
      .addCase(depositMoney.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(depositMoney.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Deposit successful!";
        state.lastTransaction = action.payload;
        state.transactions.push(action.payload);
      })
      .addCase(depositMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Withdraw
      .addCase(withdrawMoney.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(withdrawMoney.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Withdraw successful!";
        state.lastTransaction = action.payload;
        state.transactions.push(action.payload);
      })
      .addCase(withdrawMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Transfer
      .addCase(transferMoney.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(transferMoney.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Transfer successful!";
        state.lastTransaction = action.payload;
        state.transactions.push(action.payload);
      })
      .addCase(transferMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Transfer to UPI
      .addCase(transferMoneyToUpi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(transferMoneyToUpi.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "UPI Transfer successful!";
        state.lastTransaction = action.payload;
        state.transactions.push(action.payload);
      })
      .addCase(transferMoneyToUpi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // Fetch Transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = transactionSlice.actions;
export default transactionSlice.reducer;
