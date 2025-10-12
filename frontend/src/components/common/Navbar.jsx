import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for menu icons

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img className="h-12 w-auto" src="/logo.png" alt="HirePulse+" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/allUserJobs">Jobs</Link></li>
            <li><Link to="/browse">Browse</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>

            {token && (
              <li>
                <Link
                  to="/admin-dashboard"
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col items-start gap-4 p-4 font-medium">
            <li><Link onClick={() => setMenuOpen(false)} to="/">Home</Link></li>
            <li><Link onClick={() => setMenuOpen(false)} to="/jobs">Jobs</Link></li>
            <li><Link onClick={() => setMenuOpen(false)} to="/browse">Browse</Link></li>
            <li><Link onClick={() => setMenuOpen(false)} to="/blogs">Blogs</Link></li>

            {token && (
              <li>
                <Link
                  onClick={() => setMenuOpen(false)}
                  to="/admin-dashboard"
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {token && (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
