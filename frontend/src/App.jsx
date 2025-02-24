import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      </Routes>
  )
}

export default App
