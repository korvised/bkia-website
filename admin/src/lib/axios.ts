import axios from 'axios';
import { store } from '@/app/store.ts';
import { config } from '@/config';
import { signOut } from '@/modules/auth/api';
import { storage } from './storage.ts';

const api = axios.create({
  baseURL: config.apiBaseUrl
});

// Skip these routes from setting Authorization header
const excludedAuthRoutes = ['/auth/sign-in', '/auth/sign-up', '/auth/verify/'];

api.interceptors.request.use(config => {
  const requestUrl = config.url ?? '';

  // Only add token if route is not excluded
  const shouldAttachToken = !excludedAuthRoutes.some(route =>
    requestUrl.includes(route)
  );

  if (shouldAttachToken) {
    const { accessToken } = storage.getTokens();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const requestUrl: string = error.config?.url || '';

    const isSignInRequest = requestUrl.includes('/sign-in');

    if (status === 401 && !isSignInRequest) {
      store.dispatch(signOut());
    }

    return Promise.reject(error);
  }
);

export default api;
