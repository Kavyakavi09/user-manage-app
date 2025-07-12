import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as api from '../../api/users';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  total: number;
  perPage: number;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  total: 0,
  perPage: 6,
};

//  Fetch users
export const fetchUsers = createAsyncThunk<
  { users: User[]; total: number; per_page: number },
  void,
  { rejectValue: string }
>('users/fetchUsers', async (_, thunkAPI) => {
  try {
    const { users, total, per_page } = await api.fetchAllUsers();
    return { users, total, per_page };
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch users');
  }
});

//  Create user
export const createUser = createAsyncThunk<
  User,                  // return type (payload with id)
  Omit<User, 'id'>,      // argument type (user data without id)
  { rejectValue: string }
>(
  'users/createUser',
  async (user, thunkAPI) => {
    try {
      const response = await api.createUser(user);
      const createdUser: User = response.data;
      // Return the full user object with id
      return createdUser;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to create user');
    }
  }
);

//  Update user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user: User, thunkAPI) => {
    if (!user.id) {
      return thunkAPI.rejectWithValue('User ID is required for update');
    }
    try {
      const response = await api.updateUser(user.id, user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to update user');
    }
  }
);


//  Delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number, thunkAPI) => {
  try {
    await api.deleteUser(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to delete user');
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.total = action.payload.total;
       state.perPage = action.payload.per_page;
        })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // create
      .addCase(createUser.fulfilled, (state, action) => {
        console.log('User created:', action.payload);
        state.users.push(action.payload);
      })
      // update
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((u) => (u.id === action.payload.id ? action.payload : u));
      })
      // delete
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
