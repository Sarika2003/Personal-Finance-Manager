import { create } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../utils/axios';
import { showSuccessToast, showErrorToast } from '../utils/toastConfig';
import useAuthStore from './authStore';

axios.defaults.withCredentials = true;

const useFinanceStore = create((set, get) => ({
  budgets: [],
  transactions: [],
  loading: false,
  error: null,

  clearFinanceData: () => {
    set({ budgets: [], transactions: [], loading: false, error: null });
  },

  initializeFinanceStore: () => {
    useAuthStore.setState({ clearFinanceData: get().clearFinanceData });
  },

  fetchBudgetsAndTransactions: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      set({ budgets: [], transactions: [], loading: false, error: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      const [budgetResponse, transactionResponse] = await Promise.all([
        axios.get(`${BASE_URL}/budget`),
        axios.get(`${BASE_URL}/transaction`),
      ]);
      set({
        budgets: budgetResponse.data.data || [],
        transactions: transactionResponse.data.data || [],
        loading: false,
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch financial data.";
      set({ loading: false, error: errorMessage });
      showErrorToast(errorMessage);
    }
  },

  addBudget: async (newBudget) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BASE_URL}/budget`, newBudget);
      set((state) => ({
        budgets: [...state.budgets, response.data.data],
        loading: false,
      }));
      showSuccessToast("Budget added successfully!");
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add budget.";
      set({ loading: false, error: errorMessage });
      showErrorToast(errorMessage);
      throw err;
    }
  },

  deleteBudget: async (budgetId) => {
    set({ loading: true, error: null });
    try {
      const associatedTransactionIds = get().transactions
        .filter((txn) => txn.category?._id === budgetId)
        .map((txn) => txn._id);

      await Promise.all(
        associatedTransactionIds.map((txnId) =>
          axios.delete(`${BASE_URL}/transaction/${txnId}`)
        )
      );

      await axios.delete(`${BASE_URL}/budget/${budgetId}`);
      set((state) => ({
        budgets: state.budgets.filter((budget) => budget._id !== budgetId),
        transactions: state.transactions.filter((txn) => txn.category?._id !== budgetId),
        loading: false,
      }));
      showSuccessToast("Budget and associated transactions deleted successfully!");
      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to delete budget.";
      set({ loading: false, error: errorMessage });
      showErrorToast(errorMessage);
      throw err;
    }
  },

  addTransaction: async (newTransaction) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BASE_URL}/transaction`, newTransaction);
      set((state) => ({
        transactions: [...state.transactions, response.data.data],
        loading: false,
      }));
      showSuccessToast("Transaction added successfully!");
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add transaction.";
      set({ loading: false, error: errorMessage });
      showErrorToast(errorMessage);
      throw err;
    }
  },

  updateTransaction: async (transactionId, updatedTransaction) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${BASE_URL}/transaction/${transactionId}`, updatedTransaction);
      set((state) => ({
        transactions: state.transactions.map((txn) =>
          txn._id === transactionId ? response.data.data : txn
        ),
        loading: false,
      }));
      showSuccessToast("Transaction updated successfully!");
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update transaction.";
      set({ loading: false, error: errorMessage });
      showErrorToast(errorMessage);
      throw err;
    }
  },

  deleteTransaction: async (transactionId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${BASE_URL}/transaction/${transactionId}`);
      set((state) => ({
        transactions: state.transactions.filter((txn) => txn._id !== transactionId),
        loading: false,
      }));
      showSuccessToast("Transaction deleted successfully!");
      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to delete transaction.";
      set({ loading: false, error: errorMessage });
      showErrorToast(errorMessage);
      throw err;
    }
  },
}));

useFinanceStore.getState().initializeFinanceStore();

export default useFinanceStore;
