import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/toastConfig";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(""); // Reset error on new login attempt

        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/login",
                formData, 
                { withCredentials: true }
            );

            if (response.data.status) {
                showSuccessToast("Successfully logged in");
                navigate("/dashboard"); // Redirect after successful login
            } else {
                throw new Error(response.data.message || "Login failed");
            }
        } catch (err) {
            showErrorToast("Invalid email or password!");
            console.error("Login Failed:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Invalid email or password!");
        }
    };

    return (
        <div className="d-flex vh-100 align-items-center justify-content-center" style={{ backgroundColor: "#2d2d2d" }}>
            <div className="card p-4 mt-4 shadow-lg border-0 rounded" style={{ width: "400px", backgroundColor: "#1a1a1a" }}>
                <h3 className="text-center text-light">Login</h3>
                {error && <p className="text-danger text-center">{error}</p>}
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <input type="email" className="form-control border border-success text-dark"
                            placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control border border-success text-dark"
                            placeholder="Enter password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Log in</button>
                </form>
                <p className="text-center mt-3 text-light">
                    Not registered? <Link to="/register" className="text-success text-decoration-none">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
