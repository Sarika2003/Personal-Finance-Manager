import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeftStartOnRectangleIcon, HomeIcon } from "@heroicons/react/24/solid";
import useAuthStore from "../../store/authStore";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const authLoading = useAuthStore((state) => state.loading);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/');
    }
  };

  return (
    <nav className="navbar bg-card   p-3">
      <div className="container d-flex align-items-center px-3">
        <NavLink to="/dashboard" className="navbar-brand d-flex align-items-center text-heading">
          <HomeIcon width={28} className="me-2 text-primary" />
          <span className="fs-4">Home</span>
        </NavLink>

        <button
          type="button"
          className="btn btn-dark d-flex align-items-center px-2 py-1"
          onClick={handleLogout}
          disabled={authLoading}
        >
          <ArrowLeftStartOnRectangleIcon width={20} className="me-2 text-light" />
          <span className=" d-none d-md-inline">
            {authLoading ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
