import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../components/CartIcon";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://v2.api.noroff.dev/online-shop");
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle input change and filter products
  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.length > 0) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(value)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  // Navigate to product page
  const handleSelectProduct = (productId) => {
    navigate(`/product/${productId}`);
    setQuery("");
    setFilteredProducts([]);
  };

  return (
    <header className="bg-gray-900 text-white py-2 shadow-md relative">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-6">

        {/* Left Side: Burger Menu & Logo */}
        <div className="flex items-center space-x-4">
          {/* Burger Menu for Mobile */}
          <button
            className="text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-400">
            Quick<span className="text-yellow-600">Cart</span>
          </Link>
        </div>

        {/* Center: Search Bar with Lookahead Feature */}
        <div className="relative flex-1 mx-4 hidden md:flex max-w-lg">
          <label htmlFor="search" className="sr-only">Search for products</label>
          <input
            id="search"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search QuickCart..."
            className="w-full px-4 py-2 text-black bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-300"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
            <FaSearch />
          </button>

        
          {/* Search Dropdown for Desktop */}
          {filteredProducts.length > 0 && (
            <ul className="absolute w-full bg-white border rounded-lg shadow-md z-50 
                          left-0 top-full max-h-60 overflow-y-auto">
              {filteredProducts.map((product) => (
                <li key={product.id} className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={() => handleSelectProduct(product.id)}>
                  <img src={product.image.url} alt={product.title} className="w-10 h-10 rounded mr-3 object-cover" />
                  <span className="text-black font-semibold">{product.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Side: Navigation Links + Cart */}
        <div className="flex items-center space-x-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400">Home</Link>
            <Link to="/contact" className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400">Contact</Link>
          </nav>

          {/* Cart Icon */}
          <CartIcon />
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 py-2 bg-gray-800 flex items-center space-x-2">
        <label htmlFor="mobile-search" className="sr-only">Search for products</label>
        <input
          id="mobile-search"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="w-full px-4 py-2 text-black bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-300"
        />
        <button className="bg-yellow-500 text-black p-2 rounded-md hover:bg-yellow-600">
          <FaSearch />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 absolute w-full left-0 top-[40px] shadow-md">
          <nav className="flex flex-col space-y-4 py-4 items-center">
            <Link to="/" className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/contact" className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}

      {/* Mobile Dropdown for Search Results */}
      {filteredProducts.length > 0 && (
        <ul className="absolute left-0 w-full bg-white border rounded-lg shadow-md mt-1 max-h-60 overflow-y-auto z-50 md:hidden">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
              onClick={() => handleSelectProduct(product.id)}
            >
              <img
                src={product.image.url}
                alt={product.title}
                className="w-10 h-10 rounded mr-3 object-cover"
              />
              <span className="text-black">{product.title}</span>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
