import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      {/* Product Image */}
      <img
        src={product.image.url}
        alt={product.image.alt || product.title}
        className="w-full h-48 object-cover rounded-md"
      />

      {/* Product Title */}
      <h2 className="text-xl font-bold mt-2 text-gray-900">{product.title}</h2>

      {/* Product Description */}
      <p className="text-gray-700 text-sm mt-1">{product.description}</p>

      {/* Price Display */}
      <div className="mt-2">
        {product.price !== product.discountedPrice ? (
          <>
            <span className="text-red-500 font-bold text-lg mr-2">
              ${product.discountedPrice.toFixed(2)}
            </span>
            <span className="text-gray-600 line-through">${product.price.toFixed(2)}</span>
          </>
        ) : (
          <span className="text-gray-900 font-bold text-lg">${product.price.toFixed(2)}</span>
        )}
      </div>

      {/* View Product Button */}
      <Link
        to={`/product/${product.id}`}
        className="block mt-4 bg-yellow-500 text-white text-center py-2 rounded-md hover:bg-yellow-600 transition-all"
        aria-label={`View details about ${product.title}`}
      >
        View Product
      </Link>
    </div>
  );
};

export default ProductCard;
