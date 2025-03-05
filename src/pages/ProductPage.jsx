import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch(); // ✅ Moved inside the function
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data.data);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading product...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-lg rounded-lg p-6 md:flex md:space-x-6">
        {/* Product Image */}
        <img
          src={product.image.url}
          alt={product.image.alt || product.title}
          className="w-full md:w-1/3 object-cover rounded-md"
          loading="lazy"
        />

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-gray-600 text-lg mt-2">{product.description}</p>

          {/* Pricing Section */}
          <div className="mt-4">
            {product.price !== product.discountedPrice ? (
              <>
                <span className="text-red-500 font-bold text-2xl mr-2">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through text-xl">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-gray-900 font-bold text-2xl">${product.price.toFixed(2)}</span>
            )}
          </div>

          {/* Rating */}
          <div className="mt-4">
            <span className="text-yellow-500 font-semibold" aria-label={`Product rating: ${product.rating} out of 5`}>
              ⭐ {product.rating}/5
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-6 w-full md:w-auto bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          <div className="mt-4 space-y-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="border p-4 rounded-md shadow-sm bg-gray-50">
                <p className="font-bold">{review.username}</p>
                <p className="text-yellow-500">⭐ {review.rating}/5</p>
                <p className="text-gray-700">{review.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
