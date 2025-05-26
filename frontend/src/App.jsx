import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import { Toaster } from "react-hot-toast";
import BudgetPage from "./pages/BudgetPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/budget/:_id" element={<BudgetPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
