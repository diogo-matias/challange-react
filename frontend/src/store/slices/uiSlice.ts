import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '../types';

const initialState: UIState = {
  modals: {
    addCliente: false,
    addVenda: false,
    vendas: false,
  },
  loading: {
    addingCliente: false,
    addingVenda: false,
    updatingCliente: false,
    deletingCliente: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state: UIState, action: PayloadAction<keyof UIState['modals']>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state: UIState, action: PayloadAction<keyof UIState['modals']>) => {
      state.modals[action.payload] = false;
    },
    setLoading: (state: UIState, action: PayloadAction<{ key: keyof UIState['loading']; value: boolean }>) => {
      state.loading[action.payload.key] = action.payload.value;
    },
    clearAllModals: (state: UIState) => {
      state.modals = {
        addCliente: false,
        addVenda: false,
        vendas: false,
      };
    },
  },
});

export const { openModal, closeModal, setLoading, clearAllModals } = uiSlice.actions;
export default uiSlice.reducer; 