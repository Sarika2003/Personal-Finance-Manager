import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const navigate = useNavigate();


    const submitHandler = (e) => {
        e.preventDefault();
        usernameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        confirmPasswordRef.current.value = '';
        navigate('/');
      
    };

    return (
        <div className="d-flex vh-100 align-items-center justify-content-center" style={{ backgroundColor: '#2d2d2d' }}>
            <div className="card p-4 mt-4 shadow-lg border-0 rounded" style={{ width: '400px', backgroundColor: '#1a1a1a' }}>
                <h3 className="text-center text-light">Register</h3>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <input type="text" className="form-control border border-success text-dark" placeholder="Enter your username" ref={usernameRef} required />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control border border-success text-dark" placeholder="Enter your email" ref={emailRef} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control border border-success text-dark" placeholder="Enter password" ref={passwordRef} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control border border-success text-dark" placeholder="Confirm password" ref={confirmPasswordRef} required />
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
