import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ products }) => {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter products dynamically
  useEffect(() => {
    if (query.length > 1) {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  return (
    <div className="relative w-full max-w-lg">
      {/* Search Input */}
      <div className="flex items-center border rounded-md bg-gray-200">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 text-black bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button className="bg-yellow-500 text-black p-2 rounded-md hover:bg-yellow-600 focus:outline-none">
          <FaSearch />
        </button>
      </div>

      {/* Search Results Dropdown */}
      {filteredProducts.length > 0 && (
        <ul className="absolute left-0 w-full bg-white border rounded-lg shadow-md mt-1 max-h-60 overflow-y-auto z-50">
          {filteredProducts.map((product) => (
            <li key={product.id} className="p-2 cursor-pointer hover:bg-gray-100 flex items-center">
              {/* Product Image */}
              <img
                src={product.image.url}
                alt={product.title}
                className="w-10 h-10 rounded mr-3 object-cover"
              />

              {/* Product Title */}
              <span className="text-black font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                {product.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
