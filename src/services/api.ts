import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração da URL base da API com fallback
const BASE_URL = process.env.BASE_URL || 'https://challange-react-backend.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 segundos de timeout
});

api.interceptors.request.use(
  async (config) => {
    // Configuração básica de headers
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('authToken');
    }
    
    return Promise.reject(error);
  } 
);

export { api }; 