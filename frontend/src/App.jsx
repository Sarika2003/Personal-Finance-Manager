import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import { Toaster } from "react-hot-toast";
import BudgetPage from "./pages/BudgetPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import useFinanceStore from "./store/financeStore"; 
const App = () => {
  const initAuth = useAuthStore((state) => state.initAuth);
  const initializeFinanceStore = useFinanceStore((state) => state.initializeFinanceStore);

  useEffect(() => {
    initAuth(); 
    initializeFinanceStore(); 
  }, [initAuth, initializeFinanceStore]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/budget/:_id" element={<BudgetPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;