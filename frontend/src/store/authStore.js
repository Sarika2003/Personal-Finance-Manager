import { create } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../utils/axios';
import { showSuccessToast, showErrorToast } from '../utils/toastConfig';

axios.defaults.withCredentials = true;

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: true, // Initial loading state for auth check
  error: null,

  // Initialize auth state from localStorage if token exists
  initAuth: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${BASE_URL}/user/me`);
        set({ user: response.data.data, isAuthenticated: true, loading: false, error: null });
      } else {
        set({ user: null, isAuthenticated: false, loading: false, error: null });
      }
    } catch (err) {
      console.error("Auth initialization failed:", err);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      set({ user: null, isAuthenticated: false, loading: false, error: err });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      if (response.data.status) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        set({ user, isAuthenticated: true, loading: false });
        showSuccessToast("Login successful!");
        return true;
      } else {
        throw new Error(response.data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || "Invalid email or password!";
      set({ user: null, isAuthenticated: false, loading: false, error: errorMessage });
      showErrorToast(errorMessage);
      return false;
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, { name, email, password });
      if (response.data.status) {
        set({ loading: false });
        showSuccessToast("Registration successful! Please log in.");
        return true;
      } else {
        throw new Error(response.data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || "Registration failed. Try again!";
      set({ loading: false, error: errorMessage });
      showErrorToast(errorMessage);
      return false;
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await axios.post(`${BASE_URL}/auth/logout`);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      set({ user: null, isAuthenticated: false, loading: false });
      showSuccessToast("Logged out successfully.");
      get().clearFinanceData(); // Clear finance data on logout
      return true;
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || "Logout failed.";
      set({ loading: false, error: errorMessage });
      showErrorToast(errorMessage);
      return false;
    }
  },

  clearFinanceData: () => {}, 
}));

export default useAuthStore;
