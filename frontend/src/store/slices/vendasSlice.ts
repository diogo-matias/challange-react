import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { VendasState, CreateVendaData } from '../types';
import { api } from '../../services/api';

const initialState: VendasState = {
  vendas: [],
  vendasPorDia: [],
  estatisticas: null,
  isLoading: false,
  error: null,
};

export const fetchVendasPorDia = createAsyncThunk(
  'vendas/fetchVendasPorDia',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/vendas/por-dia');
      const vendasOrdenadas = response.data.sort((a: any, b: any) => 
        new Date(a.data).getTime() - new Date(b.data).getTime()
      );
      return vendasOrdenadas;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao carregar vendas por dia');
    }
  }
);

export const fetchEstatisticas = createAsyncThunk(
  'vendas/fetchEstatisticas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/vendas/estatisticas');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao carregar estatísticas');
    }
  }
);

export const createVenda = createAsyncThunk(
  'vendas/createVenda',
  async (vendaData: CreateVendaData, { rejectWithValue }) => {
    try {
      const response = await api.post('/vendas', vendaData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao criar venda');
    }
  }
);

export const fetchVendasByCliente = createAsyncThunk(
  'vendas/fetchVendasByCliente',
  async (clienteId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/vendas/cliente/${clienteId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao carregar vendas do cliente');
    }
  }
);

const vendasSlice = createSlice({
  name: 'vendas',
  initialState,
  reducers: {
    clearError: (state: VendasState) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Vendas por Dia
      .addCase(fetchVendasPorDia.pending, (state: VendasState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVendasPorDia.fulfilled, (state: VendasState, action) => {
        state.isLoading = false;
        state.vendasPorDia = action.payload;
      })
      .addCase(fetchVendasPorDia.rejected, (state: VendasState, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Estatísticas
      .addCase(fetchEstatisticas.fulfilled, (state: VendasState, action) => {
        state.estatisticas = action.payload;
      })
      .addCase(fetchEstatisticas.rejected, (state: VendasState, action) => {
        state.error = action.payload as string;
      })
      // Create Venda
      .addCase(createVenda.fulfilled, (state: VendasState, action) => {
        state.vendas.push(action.payload);
      })
      .addCase(createVenda.rejected, (state: VendasState, action) => {
        state.error = action.payload as string;
      })
      // Fetch Vendas by Cliente
      .addCase(fetchVendasByCliente.fulfilled, (state: VendasState, action) => {
        state.vendas = action.payload;
      })
      .addCase(fetchVendasByCliente.rejected, (state: VendasState, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = vendasSlice.actions;
export default vendasSlice.reducer; 