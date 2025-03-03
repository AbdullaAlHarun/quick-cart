import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Footer Content - Flex for Large Screens, Grid for Small Screens */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          
          {/* Logo (Left Side on Large Screens) */}
          <div className="lg:w-1/4">
            <Link to="/" className="text-2xl font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-400">
              Quick<span className="text-yellow-600">Cart</span>
            </Link>
          </div>

          {/* Footer Links Grid - Organized for Large Screens */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-sm text-gray-400 w-full">
            
            {/* Product */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400">Features</Link></li>
                <li><Link to="/integrations" className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400">Integrations</Link></li>
                <li><Link to="/pricing" className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400">Pricing</Link></li>
                <li><Link to="/faq" className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400">FAQ</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Developers */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Developers</h3>
              <ul className="space-y-2">
                <li><Link to="/api" className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400">Public API</Link></li>
                <li><Link to="/docs" className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400">Documentation</Link></li>
                <li><Link to="/guides" className="hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400">Guides</Link></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-yellow-400 focus:ring-2 focus:ring-yellow-400">
                  <FaFacebook size={20} />
                </a>
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-yellow-400 focus:ring-2 focus:ring-yellow-400">
                  <FaTwitter size={20} />
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-yellow-400 focus:ring-2 focus:ring-yellow-400">
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} QuickCart. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
