import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center">
              <div className="relative h-8 w-14 mb-4">
                <div className="absolute left-0 h-8 w-8 rounded-full bg-white"></div>
                <div className="absolute left-6 h-8 w-8 rounded-full bg-black border-2 border-white"></div>
              </div>
            </div>
            <p className="text-sm mb-4">
              Premium footwear for every occasion. Discover the latest styles from top brands.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/brand/nike" className="text-sm hover:text-white transition-colors">
                  Nike
                </Link>
              </li>
              <li>
                <Link to="/brand/adidas" className="text-sm hover:text-white transition-colors">
                  Adidas
                </Link>
              </li>
              <li>
                <Link to="/brand/puma" className="text-sm hover:text-white transition-colors">
                  Puma
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-sm hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5" />
                <span className="text-sm">support@shoestore.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5" />
                <span className="text-sm">+1 (800) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 text-sm text-neutral-500 text-center">
          <p>© 2025 Shoe Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;