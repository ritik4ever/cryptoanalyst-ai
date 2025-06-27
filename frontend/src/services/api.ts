import axios from 'axios';
import { Analysis, AnalysisTypeInfo } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (email: string, password: string) =>
    api.post('/auth/register', { email, password }),
  
  getProfile: () => api.get('/auth/profile'),

  // Wallet authentication
  getNonce: (address: string) =>
    api.post('/auth/nonce', { address }),

  walletLogin: (data: { address: string; message: string; signature: string }) =>
    api.post('/auth/wallet-login', data),
};

export const analysisAPI = {
  getTypes: (): Promise<{ data: AnalysisTypeInfo[] }> =>
    api.get('/analysis/types'),
  
  create: (type: string, parameters: any) =>
    api.post('/analysis', { type, parameters }),
  
  get: (id: string): Promise<{ data: Analysis }> =>
    api.get(`/analysis/${id}`),
  
  process: (id: string) =>
    api.post(`/analysis/${id}/process`),
  
  getUserAnalyses: (page = 1, limit = 10) =>
    api.get('/analysis/user', { params: { page, limit } }),
};

export const paymentAPI = {
  getStatus: (paymentId: string) =>
    api.get(`/payments/${paymentId}/status`),
  
  getRevenueDashboard: () =>
    api.get('/payments/revenue/dashboard'),
};

export const walletAPI = {
  create: () => api.post('/wallet/create'),
  getBalance: (walletId: string) => api.get(`/wallet/${walletId}/balance`),
  getPlatformAddress: () => api.get('/wallet/platform/address'),
};