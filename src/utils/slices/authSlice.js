import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../api";
import $api from "../api";
import { toast } from "react-toastify";

const notifyFailedLogin = () => toast("Невірні дані!");
export const loginAsync = createAsyncThunk('auth/login', async (credentials, { rejectWithValue, dispatch }) => {
  try {
    const { email, password } = credentials
    const response = await $api.post('/login', { email, password }, {withCredentials:true})
    localStorage.setItem('token', response.data.accessToken);
    return { user: { id: response.data.id, email: response.data.email } };
  } catch (e) {
    notifyFailedLogin()
    console.error("Error during login:", e);
    return rejectWithValue(e.response?.data?.message);
  }
});

export const registrationAsync = createAsyncThunk('auth/registration', async (credentials, { rejectWithValue }) => {
  try {
    const { email, password } = credentials
    const response = await $api.post('/registration', { email, password })
    localStorage.setItem('token', response.data.accessToken);
    return { user: response.data.user };
  } catch (e) {
    console.error("Error during registration:", e);
    return rejectWithValue(e.response?.data?.message);
  }
});

export const logoutAsync = createAsyncThunk('auth/logout', async (credentials, { rejectWithValue }) => {
  try {
    const { user } = credentials
    await $api.post('/logout', { user },{ withCredentials: true })
    localStorage.removeItem('token');
    return {};
  } catch (e) {
    console.error("Error during logout:", e);
    return rejectWithValue("Logout failed");
  }
});

export const checkAuthAsync = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true }); // спроба створити нову пару токенів
    localStorage.setItem('token', response.data.accessToken); // встановлення токена доступу в Local Storage
    return { user: { id: response.data.id, email: response.data.email } };
  } catch (e) {
    console.error("Помилка при перевірці авторизації:", e);
    return rejectWithValue(e.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    isAuth: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(registrationAsync.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registrationAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuth = false;
        state.user = {};
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'), (state) => {
        state.isLoading = false;
      });
  },
});

export const { setAuth, setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
