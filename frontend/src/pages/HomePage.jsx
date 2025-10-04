import { Link } from "react-router-dom";
import hero from "../assets/hero.png"; 
import {WalletIcon,BanknotesIcon,ChartBarIcon,CurrencyDollarIcon } from '@heroicons/react/24/solid';

const Intro = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg my-4">
                <div className="container">
                    <CurrencyDollarIcon className="text-primary mb-2 mx-2" width={45} /> <h2>PFM</h2>
                    <div className="ms-auto">
                        <Link to="/login" className="btn btn-outline-dark me-3 custom-btn">Login</Link>
                        <Link to="/register" className="btn btn-dark me-3 custom-btn-dark">Register</Link>
                    </div>
                </div>
            </nav>

            <section className="container my-2 py-5">
                <div className="row align-items-center">
                    {/* Text Section */}
                    <div className="col-md-6 text-center text-md-start">
                        <h1 className="display-4 fw-bold mb-4">
                            Welcome to <span className="text-primary">Personal Finance Manager</span>
                        </h1>
                        <p className="lead fs-3 mb-4">
                            A well-planned budget is the key to financial stability. Start your journey today!
                        </p>
                        <Link to="/login" className="btn btn-dark btn-lg px-4">
                            Let's Get Started
                        </Link>
                    </div>
            
                    {/* Image Section */}
                    <div className="col-md-6 text-center mt-4 mt-md-0">
                        <img src={hero} alt="Person with money" className="img-fluid blended-image" width={600} />
                    </div>
                </div>
            </section>
            
            {/* Feature section */}
            <section className="container my-5">
                <h2 className="text-center fw-bold mb-5 fs-1">Why Use Personal Finance Manager?</h2>
                <div className="row g-4">
                    <div className="col-md-4 text-center">
                        <div className="feature-card p-3 border rounded shadow-sm h-100">
                            <WalletIcon className="text-primary mb-2" width={40} />
                            <h5 className="fw-bold mb-3 fs-5">Track Your Expenses</h5>
                            <p className="fs-6">Quickly log and categorize your daily expenses with ease.</p>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="feature-card p-3 border rounded shadow-sm h-100">
                            <BanknotesIcon className="text-success mb-2" width={40} />
                            <h5 className="fw-bold mb-3 fs-5">Set Saving Goals</h5>
                            <p className="fs-6">Create budgets for your savings goals and monitor your progress.</p>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="feature-card p-3 border rounded shadow-sm h-100">
                            <ChartBarIcon className="text-warning mb-2" width={40} />
                            <h5 className="fw-bold mb-3 fs-5">Analyze Spending</h5>
                            <p className="fs-6">Reports help you understand your financial habits better.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
  
export default Intro;