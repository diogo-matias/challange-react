import { api } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

describe('api service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve adicionar o token no header Authorization se existir', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue('fake-token');
    const request = { headers: {} };
    // @ts-ignore
    const config = await api.interceptors.request.handlers[0].fulfilled(request);
    expect(config.headers.Authorization).toBe('Bearer fake-token');
  });

  it('não deve adicionar o header Authorization se não houver token', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue(null);
    const request = { headers: {} };
    // @ts-ignore
    const config = await api.interceptors.request.handlers[0].fulfilled(request);
    expect(config.headers.Authorization).toBeUndefined();
  });

  it('deve remover o token do AsyncStorage em resposta 401', async () => {
    jest.spyOn(AsyncStorage, 'removeItem').mockResolvedValue();
    const error = { response: { status: 401 } };
    // @ts-ignore
    await api.interceptors.response.handlers[0].rejected(error);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('authToken');
  });
}); 