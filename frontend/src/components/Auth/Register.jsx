import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showFailureToast, showSuccessToast } from "../../utils/toastConfig";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");

        //  Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            if (response.data.status === 0) {  
                console.log("Registration failed:", response.data.message);
                showFailureToast("Registration failed. Try again!")
                setError(response.data.message);
                return;
            }
            console.log("Registration Successful:", response.data);
            showSuccessToast("Registration successful!")
            navigate("/"); // Redirect to login page after success
        } catch (err) {
            console.error("Registration Failed:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="d-flex vh-100 align-items-center justify-content-center" style={{ backgroundColor: "#2d2d2d" }}>
            <div className="card p-4 mt-4 shadow-lg border-0 rounded" style={{ width: "400px", backgroundColor: "#1a1a1a" }}>
                <h3 className="text-center text-light">Register</h3>
                
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control border border-success text-dark"
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
                            className="form-control border border-success text-dark"
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
                            className="form-control border border-success text-dark"
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
                            className="form-control border border-success text-dark"
                            placeholder="Confirm password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Register</button>
                </form>
                
                <p className="text-center mt-3 text-light">
                    Already have an account? <Link to="/" className="text-success text-decoration-none">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
