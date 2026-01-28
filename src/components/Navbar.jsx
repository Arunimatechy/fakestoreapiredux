import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          ReactMart
        </Link>

        {/* Links */}
        <div className="flex items-center gap-5 text-sm font-medium">
          {!currentUser && (
            <>
              <Link className="hover:text-blue-600 transition" to="/login">
                Login
              </Link>
              <Link className="hover:text-blue-600 transition" to="/register">
                Register
              </Link>
            </>
          )}

          {currentUser && !currentUser.isAdmin && (
            <>
              <Link className="hover:text-blue-600 transition" to="/cart">
                Cart
              </Link>
              <Link className="hover:text-blue-600 transition" to="/orders">
                Orders
              </Link>
            </>
          )}

          {currentUser?.isAdmin && (
            <Link
              to="/admin"
              className="px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Admin
            </Link>
          )}

          {currentUser && (
            <button
              onClick={() => dispatch(logout())}
              className="text-red-600 hover:text-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
