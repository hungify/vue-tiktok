import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import type { LoginRequest, LoginResponse, RegisterRequest } from '~/interfaces/auth';
import type { FormError } from '~/interfaces/error';
import { AuthService } from '~/services/auth';
import { isAxiosResponse } from '~/utils/axios';

export const useAuthStore = defineStore('auth', () => {
  const authService = new AuthService();

  const token = ref<LoginResponse>({
    accessToken: '',
  });
  const formError = ref<FormError>();

  const login = async (data: LoginRequest) => {
    try {
      const response = await authService.login(data);
      if (!isAxiosResponse(response)) token.value = response;
    } catch (err) {
      if (err instanceof AxiosError && err.status === 422) {
        formError.value = err.response?.data;
      }
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await authService.register(data);
      if (!isAxiosResponse(response)) token.value = response;
    } catch (err) {
      if (err instanceof AxiosError && err.status === 422) {
        formError.value = err.response?.data;
      }
    }
  };

  const refreshToken = async () => {
    const response = await authService.refreshToken();
    if (!isAxiosResponse(response)) token.value = response;
  };

  const logout = async () => {
    const response = await authService.logout();
    // Toast message here
    console.log(response);
  };

  return {
    token,
    formError,

    login,
    register,
    refreshToken,
    logout,
  };
});
