import { Search, ShoppingCart, X } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Autocomplete from "../../Searchbar/Autocomplete";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Service", path: "/service" },
    { name: "Contact", path: "/contact" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const fetchUserData = useCallback(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUserData(JSON.parse(storedUser));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  const fetchCartCount = useCallback(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(total);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
    fetchCartCount();

    const handleStorageChange = () => {
      fetchUserData();
      fetchCartCount();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", fetchCartCount);
    window.addEventListener("profileUpdated", fetchUserData);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", fetchCartCount);
      window.removeEventListener("profileUpdated", fetchUserData);
    };
  }, [fetchUserData, fetchCartCount]);

  const userAvatar = useMemo(() => {
    return (
      userData?.avatar ||
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww"
    );
  }, [userData]);

  const userName = useMemo(() => userData?.name || "User", [userData]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Searching for:", searchQuery);
    setSearchQuery("");
    // Add your search navigation or API call here
  };

  return (
    <nav className="bg-gradient-to-r from-green-900 to-gray-800 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 lg:h-16">
          {/* Logo */}
          <NavLink
            to="/home"
            onClick={scrollToTop}
            className="flex items-center text-white text-lg sm:text-xl lg:text-2xl font-bold tracking-tight hover:scale-105 transition-transform duration-300"
          >
            Green<span className="text-green-400">Cart</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={scrollToTop}
                className={({ isActive }) =>
                  `px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 hover:bg-white/10 hover:scale-105 ${
                    isActive
                      ? "text-white bg-white/20 shadow-lg shadow-green-500/20"
                      : "text-gray-300 hover:text-white"
                  }`
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Search Input - Desktop (fixed visibility) */}
          <div className="hidden md:block flex-1 max-w-fit  ">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-10 py-1.5 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5 cursor-pointer" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            {/* Cart */}
            <NavLink
              to="/cart"
              onClick={scrollToTop}
              className="relative text-gray-300 hover:text-white transition-colors duration-300 p-2 hover:bg-white/10 rounded-full"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* Profile */}
            <NavLink
              to="/profile"
              onClick={scrollToTop}
              className="relative group transition duration-300 hover:scale-110"
              aria-label="User profile"
            >
              <img
                src={userAvatar}
                alt={userName}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border-2 border-transparent group-hover:border-green-400 transition-all duration-300"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww";
                }}
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-400 rounded-full border-2 border-gray-800"></span>
            </NavLink>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="pb-4 space-y-1 border-t border-gray-700/50 pt-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-1 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="h-6 w-6 cursor-pointer" />
                  </button>
                )}
              </div>
            </form>

            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => {
                  setIsOpen(false);
                  scrollToTop();
                }}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:pl-6 ${
                    isActive
                      ? "text-white bg-white/20 pl-6"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                {item.name}
              </NavLink>
            ))}

            <div className="block sm:hidden">
              <Link
              onClick={scrollToTop}
                to="/products"
                className="block w-full px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold text-center rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
