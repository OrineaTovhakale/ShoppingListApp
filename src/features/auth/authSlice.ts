import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import bcrypt from 'bcryptjs';

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  surname: string;
  cellNumber: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Register
export const register = createAsyncThunk<User, Omit<User, 'id'>, { rejectValue: string }>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const hashedPassword = bcrypt.hashSync(userData.password, 10);
      const response = await axios.post<User>('http://localhost:3001/users', {
        ...userData,
        password: hashedPassword,
      });
      return response.data;
    } catch {
      return rejectWithValue('Registration failed');
    }
  }
);

// Login
export const login = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(`http://localhost:3001/users?email=${email}`);
      if (response.data.length === 0) return rejectWithValue('User not found');
      const user = response.data[0];
      if (!bcrypt.compareSync(password, user.password)) return rejectWithValue('Invalid password');
      return user;
    } catch {
      return rejectWithValue('Login failed');
    }
  }
);

// Update User
export const updateUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'auth/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const hashedPassword = userData.password.startsWith('$2a$')
        ? userData.password
        : bcrypt.hashSync(userData.password, 10);
      const response = await axios.put<User>(`http://localhost:3001/users/${userData.id}`, {
        ...userData,
        password: hashedPassword,
      });
      return response.data;
    } catch {
      return rejectWithValue('Update failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
