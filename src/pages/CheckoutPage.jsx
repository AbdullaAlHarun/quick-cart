import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate Form
  const validateForm = () => {
    let newErrors = {};

    if (form.name.length < 3) newErrors.name = "Full name must be at least 3 characters.";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email address.";
    if (form.address.length < 5) newErrors.address = "Address must be at least 5 characters.";
    if (!/^\d{8}$/.test(form.phone)) newErrors.phone = "Enter a valid 10-digit phone number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(clearCart());
    navigate("/checkout-success");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Order Summary */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold border-b pb-3">Order Summary</h2>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-6">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b">
                <img src={item.image.url} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-1 ml-4">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-500 text-sm">${item.discountedPrice.toFixed(2)} x {item.quantity}</p>
                </div>
                <p className="font-bold">${(item.discountedPrice * item.quantity).toFixed(2)}</p>
              </div>
            ))
          )}

          <div className="py-3 text-lg flex justify-between font-semibold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Right: Shipping Form */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold border-b pb-3">Shipping Details</h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block font-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block font-semibold">Shipping Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            <div>
              <label className="block font-semibold">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-600 focus:ring-2 focus:ring-green-400"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
