import React, { useRef } from 'react';
import {  Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        emailRef.current.value = '';
        passwordRef.current.value = '';
        navigate('/dashboard');
        
    };

    return (
        <div className="d-flex vh-100 align-items-center justify-content-center" style={{ backgroundColor: '#2d2d2d' }}>
            <div className="card p-4 mt-4 shadow-lg border-0 rounded" style={{ width: '400px', backgroundColor: '#1a1a1a' }}>
                <h3 className="text-center text-light">Login</h3>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <input type="email" className="form-control border border-success text-dark" placeholder="Enter your email" ref={emailRef} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control border border-success text-dark" placeholder="Enter password" ref={passwordRef} required />
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
