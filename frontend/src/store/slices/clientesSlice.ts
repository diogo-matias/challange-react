import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ClientesState, CreateClienteData, UpdateClienteData } from '../types';
import { api } from '../../services/api';

const initialState: ClientesState = {
  clientes: [],
  isLoading: false,
  error: null,
  selectedCliente: null,
};

export const fetchClientes = createAsyncThunk(
  'clientes/fetchClientes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/clientes');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao carregar clientes');
    }
  }
);

export const createCliente = createAsyncThunk(
  'clientes/createCliente',
  async (clienteData: CreateClienteData, { rejectWithValue }) => {
    try {
      const response = await api.post('/clientes', clienteData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao criar cliente');
    }
  }
);

export const updateCliente = createAsyncThunk(
  'clientes/updateCliente',
  async (clienteData: UpdateClienteData, { rejectWithValue }) => {
    try {
      const { id, ...updateData } = clienteData;
      const response = await api.patch(`/clientes/${id}`, updateData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao atualizar cliente');
    }
  }
);

export const deleteCliente = createAsyncThunk(
  'clientes/deleteCliente',
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/clientes/test/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao excluir cliente');
    }
  }
);

const clientesSlice = createSlice({
  name: 'clientes',
  initialState,
  reducers: {
    setSelectedCliente: (state: ClientesState, action) => {
      state.selectedCliente = action.payload;
    },
    clearSelectedCliente: (state: ClientesState) => {
      state.selectedCliente = null;
    },
    clearError: (state: ClientesState) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Clientes
      .addCase(fetchClientes.pending, (state: ClientesState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClientes.fulfilled, (state: ClientesState, action) => {
        state.isLoading = false;
        state.clientes = action.payload;
      })
      .addCase(fetchClientes.rejected, (state: ClientesState, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Cliente
      .addCase(createCliente.fulfilled, (state: ClientesState, action) => {
        state.clientes.push(action.payload);
      })
      .addCase(createCliente.rejected, (state: ClientesState, action) => {
        state.error = action.payload as string;
      })
      // Update Cliente
      .addCase(updateCliente.fulfilled, (state: ClientesState, action) => {
        const index = state.clientes.findIndex(cliente => cliente.id === action.payload.id);
        if (index !== -1) {
          state.clientes[index] = action.payload;
        }
      })
      .addCase(updateCliente.rejected, (state: ClientesState, action) => {
        state.error = action.payload as string;
      })
      // Delete Cliente
      .addCase(deleteCliente.fulfilled, (state: ClientesState, action) => {
        state.clientes = state.clientes.filter(cliente => cliente.id !== action.payload);
      })
      .addCase(deleteCliente.rejected, (state: ClientesState, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCliente, clearSelectedCliente, clearError } = clientesSlice.actions;
export default clientesSlice.reducer; 