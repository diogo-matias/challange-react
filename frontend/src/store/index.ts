import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import clientesReducer from './slices/clientesSlice';
import vendasReducer from './slices/vendasSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clientes: clientesReducer,
    vendas: vendasReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 