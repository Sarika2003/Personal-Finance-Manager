import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeftStartOnRectangleIcon, HomeIcon } from "@heroicons/react/24/solid";
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout=async ()=>{
        try{
            const response = await axios.post("http://localhost:8000/api/auth/logout");
            if(response.data.status ===0){
                console.log("error while loggin out");
                return;
            }
            console.log(response.data.message);
            navigate('/');
           
        }catch(e){
            console.log("error while logging out" + e.message);
        }
    }
    


    return (
        <nav className="navbar navbar-expand-lg p-3">
            <div className="container d-flex align-items-center px-3">
                <NavLink to="/dashboard" className="navbar-brand d-flex align-items-center text-black">
                    <HomeIcon width={28} className="me-2" />
                    <span className="fs-4">Home</span>
                </NavLink>

                <button 
                    type="button" 
                    className="btn btn-warning d-flex align-items-center px-4 py-2"
                    onClick={handleLogout}
                >
                    <ArrowLeftStartOnRectangleIcon width={28} className="me-2" />
                    <span className="fs-5" >Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
