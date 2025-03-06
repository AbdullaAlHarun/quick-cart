import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import "animate.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [featuredProduct, setFeaturedProduct] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (products.length > 0) {
      setFeaturedProduct(products[Math.floor(Math.random() * products.length)]);
    }
  }, [products]);

  // Skeleton Loading Animation
  if (status === "loading")
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-pulse space-y-4 w-1/2">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-48 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
        <p className="text-lg text-gray-700 font-semibold">Loading Products...</p>
      </div>
    );

  if (status === "failed") return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Banner */}
      {featuredProduct && (
        <div className="relative bg-gray-900 text-white rounded-lg overflow-hidden p-6 mb-8 flex flex-col lg:flex-row items-center">
          <img
            src={featuredProduct.image.url}
            alt={featuredProduct.title}
            className="w-48 h-48 object-cover rounded-md shadow-md"
          />
          <div className="lg:ml-6 mt-4 lg:mt-0 text-center lg:text-left">
            <h2 className="text-3xl font-bold">{featuredProduct.title}</h2>
            <p className="text-lg text-gray-300 mt-2">{featuredProduct.description.substring(0, 100)}...</p>
            <Link
              to={`/product/${featuredProduct.id}`}
              className="mt-4 inline-block bg-yellow-500 text-black px-6 py-2 rounded-md text-lg font-semibold hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
            >
              View Product
            </Link>
          </div>
        </div>
      )}

      {/* Trending & Deals Sections */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Trending Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <h1 className="text-3xl font-bold mt-12 mb-6 text-gray-900">Best Deals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
          .filter((product) => product.price > product.discountedPrice)
          .slice(0, 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
