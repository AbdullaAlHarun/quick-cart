import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between">
      
      {/* Product Image */}
      <div className="relative w-full h-48">
        <img
          src={product.image.url}
          alt={product.image.alt || product.title}
          className="w-full h-full object-cover rounded-md"
        />

        {/* Discount Badge */}
        {product.price !== product.discountedPrice && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
          </span>
        )}
      </div>

      {/* Product Title - Full Title (No Truncate) */}
      <h2 className="text-md font-semibold mt-3 text-gray-900 leading-tight">
        {product.title}
      </h2>

      {/* Product Description - Limited to Two Lines */}
      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
        {product.description}
      </p>

      {/* Price Display */}
      <div className="mt-3 flex justify-start items-center gap-2">
        <span className="text-lg font-bold text-gray-900">
          ${product.discountedPrice.toFixed(0)}
        </span>
        {product.price !== product.discountedPrice && (
          <span className="text-sm text-gray-500 line-through">
            ${product.price.toFixed(0)}
          </span>
        )}
      </div>

      {/* Button  */}
      <Link
        to={`/product/${product.id}`}
        className="mt-auto w-full bg-gray-900 text-white font-medium text-[11px] lg:text-sm px-5 py-2 rounded-full hover:bg-gray-800 transition-all focus:ring-2 focus:ring-gray-500 focus:outline-none text-center"
        aria-label={`View details about ${product.title}`}
      >
        View Product
      </Link>
    </div>
  );
};

export default ProductCard;
