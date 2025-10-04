import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const authLoading = useAuthStore((state) => state.loading);
  const authError = useAuthStore((state) => state.error);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLocalError("");

    const success = await login(formData.email, formData.password);
    if (success) {
      navigate("/dashboard");
    } else {
      setLocalError(authError);
    }
  };

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center">
      <div className="card p-4 shadow-lg border-0 rounded budget-card">
        <h3 className="text-center fw-bold mb-3 text-heading">Login</h3>

        {(localError || authError) && (
          <p className="text-danger text-center fw-semibold">
            {localError || authError}
          </p>
        )}

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control   border border-subtle rounded-3 bg-card"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control  border border-subtle rounded-3 bg-card"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark w-100 py-2 fw-semibold"
            disabled={authLoading}
          >
            {authLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-center mt-3 text-light">
          Not registered?{" "}
          <Link to="/register" className="fw-semibold text-primary">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
