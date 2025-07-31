import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Home,
  Car,
  Wrench,
  Calendar,
  FileText,
  Settings,
  User,
  FolderOpen,
  LogOut,
  Menu,
  X,
  Flame,
  Gauge,
} from "lucide-react";
import { logout } from "../features/auth/authSlice";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "dashboard", icon: FileText, label: "Dashboard", path: "/dashboard" },
    { id: "customize", icon: Car, label: "Customize", path: "/customize" },
    { id: "services", icon: Wrench, label: "Services", path: "/services" },
    { id: "builds", icon: FolderOpen, label: "My Builds", path: "/builds" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleNavClick = () => {
    setShowMobileMenu(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors shadow-lg"
        >
          {showMobileMenu ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div
          className="md:hidden fixed inset-0 backdrop-blur-sm bg-opacity-50 z-40"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed left-0 top-0 h-full w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out z-50 ${
          showMobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full py-6">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-8 px-6">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-white font-bold text-lg">ZART</span>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col space-y-2 flex-1 px-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleNavClick}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Profile Section */}
          <div className="px-4 py-4 border-t border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-20 bg-gray-900 flex-col items-center py-6 space-y-8 fixed left-0 top-0 bottom-0 z-50">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-white font-bold text-lg">ZART</span>
        </div>

        {/* Navigation Icons */}
        <div className="flex flex-col space-y-4 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                location.pathname === item.path
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
              title={item.label}
            >
              <item.icon className="w-6 h-6" />
            </Link>
          ))}
        </div>

        {/* User Profile Section */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
            title={user?.name || "User Profile"}
          >
            <User className="w-6 h-6 text-white" />
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute bottom-16 left-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-20 bg-gray-50 md:rounded-l-3xl p-4 md:p-8 overflow-y-auto">
        {children}
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
}
