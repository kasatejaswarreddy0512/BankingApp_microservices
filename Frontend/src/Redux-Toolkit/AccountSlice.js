import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../API/Api";

// ---------------------- CREATE ACCOUNT ----------------------
export const createAccount = createAsyncThunk(
  "account/createAccount",
  async ({ userId, accountData, token }) => {
    const { data } = await axios.post(
      `${BASE_URL}/api/account/create/${userId}`,
      accountData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  }
);

// ---------------------- GET ALL ACCOUNTS ----------------------
export const getAllAccounts = createAsyncThunk(
  "account/getAllAccounts",
  async (token) => {
    const { data } = await axios.get(`${BASE_URL}/api/account`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

// ---------------------- GET ACCOUNT BY ID ----------------------
export const getAccountById = createAsyncThunk(
  "account/getAccountById",
  async ({ accountId, token }) => {
    const { data } = await axios.get(`${BASE_URL}/api/account/${accountId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

// ---------------------- UPDATE ACCOUNT ----------------------
export const updateAccount = createAsyncThunk(
  "account/updateAccount",
  async ({ accountId, accountData, token }) => {
    const { data } = await axios.put(
      `${BASE_URL}/api/account/${accountId}`,
      accountData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  }
);

// ---------------------- DELETE ACCOUNT ----------------------
export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async ({ accountId, token }) => {
    await axios.delete(`${BASE_URL}/api/account/${accountId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return accountId;
  }
);

// ---------------------- GET ACCOUNTS BY USER ID ----------------------
export const getAccountsByUserId = createAsyncThunk(
  "account/getAccountsByUserId",
  async ({ userId, token }) => {
    const { data } = await axios.get(`${BASE_URL}/api/account/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched accounts for user:", data);
    return data;
  }
);

// ---------------------- GET ACCOUNT BY ACCOUNT NUMBER ----------------------
export const getAccountByAccountNumber = createAsyncThunk(
  "account/getAccountByAccountNumber",
  async ({ accountNumber, token }) => {
    const { data } = await axios.get(
      `${BASE_URL}/api/account/accountNumber/${accountNumber}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  }
);

// ---------------------- UPDATE ACCOUNT BALANCE ----------------------
export const updateAccountBalance = createAsyncThunk(
  "account/updateAccountBalance",
  async ({ accountId, amount, token }) => {
    const { data } = await axios.put(
      `${BASE_URL}/api/account/updateBalance/${accountId}?amount=${amount}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  }
);

// ---------------------- SLICE ----------------------
const accountSlice = createSlice({
  name: "account",
  initialState: {
    accounts: [],
    accountDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE ACCOUNT
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts.push(action.payload);
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // GET ALL ACCOUNTS
      .addCase(getAllAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(getAllAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // GET ACCOUNT BY ID
      .addCase(getAccountById.fulfilled, (state, action) => {
        state.loading = false;
        state.accountDetails = action.payload;
      })

      // UPDATE ACCOUNT
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = state.accounts.map((acc) =>
          acc.id === action.payload.id ? { ...acc, ...action.payload } : acc
        );
      })

      // DELETE ACCOUNT
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = state.accounts.filter(
          (acc) => acc.id !== action.payload
        );
      })

      // GET ACCOUNTS BY USER
      .addCase(getAccountsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })

      // GET ACCOUNT BY ACCOUNT NUMBER
      .addCase(getAccountByAccountNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.accountDetails = action.payload;
      })

      // UPDATE ACCOUNT BALANCE
      .addCase(updateAccountBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = state.accounts.map((acc) =>
          acc.id === action.payload.id ? { ...acc, ...action.payload } : acc
        );
      });
  },
});

export default accountSlice.reducer;
