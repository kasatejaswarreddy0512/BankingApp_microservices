import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, BASE_URL, setAuthHeader } from "../API/Api";
import axios from "axios";

// ---------------------- LOGIN ----------------------
export const login = createAsyncThunk("api/login", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, userData);

    if (data?.token) {
      localStorage.setItem("token", data.token);
      setAuthHeader(data.token);
      console.log("Login successful:", data);
      return data;
    } else {
      return rejectWithValue("Login failed");
    }
  } catch (err) {
    console.log("Login error:", err);
    return rejectWithValue(err.response?.data?.error || err.message || "Login failed");
  }
});

// ---------------------- REGISTER ----------------------
export const register = createAsyncThunk("api/register", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/register`, userData);

    if (data?.token) {
      localStorage.setItem("token", data.token);
      console.log("Registration successful:", data);
      return data;
    } else {
      return rejectWithValue("Registration failed: No token returned");
    }
  } catch (err) {
    console.error("Registration error:", err);
    return rejectWithValue(err.response?.data?.error || err.message || "Registration failed");
  }
});

// ---------------------- LOGOUT ----------------------
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  return true;
});

// ---------------------- Get User Profile ----------------------
export const getUserProfile = createAsyncThunk("auth/getUserProfile", async (jwt, { rejectWithValue }) => {
  try {
    setAuthHeader(jwt);
    const { data } = await api.get(`${BASE_URL}/api/user/profile`);
    console.log("User Profile Success", data);
    return data;
  } catch (err) {
    console.log("Get user profile error:", err);
    return rejectWithValue(err.response?.data?.error || err.message || "Failed to get user profile");
  }
});

// ---------------------- Get User Profile List ----------------------
export const getuserProfileList = createAsyncThunk("auth/getuserProfileList", async (jwt, { rejectWithValue }) => {
  try {
    setAuthHeader(jwt);
    const { data } = await api.get(`${BASE_URL}/api/user`);
    console.log("User Profile List Success", data);
    return data;
  } catch (err) {
    console.log("Get user profile list error:", err);
    return rejectWithValue(err.response?.data?.error || err.message || "Failed to get user profile list");
  }
});

// ---------------------- SLICE ----------------------
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loggedIn: false,
    loading: false,
    error: null,
    jwt: null,
    users: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.token; // ✅ use token
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.token; // ✅ use token
        state.loggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // GET USER PROFILE
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // GET USER LIST
      .addCase(getuserProfileList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getuserProfileList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getuserProfileList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
        state.users = [];
        state.loggedIn = false;
        state.error = null;
      });
  }
});

export default authSlice.reducer;
