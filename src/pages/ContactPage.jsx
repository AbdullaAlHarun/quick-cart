import { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate Form
  const validateForm = () => {
    let newErrors = {};

    if (form.name.length < 3) newErrors.name = "Full name must be at least 3 characters.";
    if (form.subject.length < 3) newErrors.subject = "Subject must be at least 3 characters.";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email address.";
    if (form.message.length < 3) newErrors.message = "Message must be at least 3 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", subject: "", email: "", message: "" });
      setErrors({});
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left: Contact Information & Map */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-6">
            We would love to hear from you! Reach out to us using the details below.
          </p>

          {/* Contact Info */}
          <div className="space-y-4">
            <p className="text-gray-700 font-semibold">📍 Mølleparken 4, 0459 Oslo, Norway</p>
            <p className="text-gray-700 font-semibold">📞 +47 1122334455 </p>
            <p className="text-gray-700 font-semibold">📧 support@quickcart.com</p>
          </div>

          {/* Google Map Embed */}
          <div className="mt-6">
            <iframe
              title="Google Map"
              className="w-full h-56 rounded-lg shadow"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.0352696920354!2d10.755958699999999!3d59.9299189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e625bebdd55%3A0x87598940160b87fa!2sNoroff%20Oslo!5e1!3m2!1sen!2sno!4v1741218840147!5m2!1sen!2sno"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Get in Touch</h2>
          {submitted ? (
            <div className="text-center text-green-500 text-lg font-semibold">
              ✅ Message sent successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              {/* Subject */}
              <div>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
                />
                {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
              </div>

              {/* Email Address */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400 resize-none h-28"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
