import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';
import { NavigateFunction } from 'react-router-dom';
import { login } from '../../api/users';

// Define the login payload structure
interface LoginPayload {
  email: string;
  password: string;
}

// Define the state structure
interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

// Thunk for login
export const loginUser = createAsyncThunk<
  string, // what we return (token)
  LoginPayload, // what we accept
  {
    rejectValue: string;
  }
>('auth/loginUser', async (payload, { rejectWithValue }) => {
  try {
    const response = await login(payload);
    const { token } = response.data;
    localStorage.setItem('token', token);
    message.success('Login successful');
    return token;
  } catch (error: any) {
    const errMsg = error.response?.data?.error || 'Login failed';
    message.error(errMsg);
    return rejectWithValue(errMsg);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
      message.info('Logged out');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
