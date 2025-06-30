import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginData } from '../types';
import { api } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { access_token, user } = response.data;
      
      await AsyncStorage.setItem('authToken', access_token);
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      return { token: access_token, user };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro no login');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem('authToken');
      delete api.defaults.headers.common['Authorization'];
      return null;
    } catch (error: any) {
      return rejectWithValue('Erro no logout');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('No token found');
      }
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/auth/profile');
      
      return { token, user: response.data };
    } catch (error: any) {
      await AsyncStorage.removeItem('authToken');
      delete api.defaults.headers.common['Authorization'];
      return rejectWithValue('Token inválido');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state: AuthState) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state: AuthState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state: AuthState, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state: AuthState, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.fulfilled, (state: AuthState) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Check Auth
      .addCase(checkAuth.pending, (state: AuthState) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state: AuthState, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state: AuthState) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer; 