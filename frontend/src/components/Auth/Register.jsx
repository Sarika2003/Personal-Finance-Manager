import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const authLoading = useAuthStore((state) => state.loading);
  const authError = useAuthStore((state) => state.error);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match!");
      return;
    }

    const success = await register(
      formData.name,
      formData.email,
      formData.password
    );
    if (success) {
      navigate("/login");
    } else {
      setLocalError(authError);
    }
  };

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center">
      <div className="card p-4 shadow-lg border-0 rounded budget-card">
        <h3 className="text-center fw-bold mb-3 text-heading">Register</h3>

        {(localError || authError) && (
          <p className="text-danger text-center fw-semibold">
            {localError || authError}
          </p>
        )}

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control  border border-subtle rounded-3 bg-card"
              placeholder="Enter your username"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control  border border-subtle rounded-3 bg-card"
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
          <div className="mb-3">
            <input
              type="password"
              className="form-control  border border-subtle rounded-3 bg-card"
              placeholder="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark w-100 py-2 fw-semibold"
            disabled={authLoading}
          >
            {authLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-3 text-light">
          Already have an account?{" "}
          <Link to="/login" className="fw-semibold text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
