import { Link } from 'react-router';
import { Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#5A0000] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/assets/don-picasos-logo.jpg"
                alt="Don Picaso's"
                className="h-10 w-32 rounded-md object-contain object-center shadow-[0_0_18px_rgba(255,215,0,0.2)]"
              />
              <div>
                <div className="text-white font-bold">DON PICASO'S</div>
                <div className="text-[#FFD700] text-xs">HOUSE OF FRANCHISE</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">
              Don Picaso's Fast Food Chain — Building Entrepreneurs, Creating Jobs, Growing Communities. 
            </p>
            <p className="text-[#FFD700] text-xs italic mb-4">
              "We Season Your Success."
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61584873088991"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FFD700] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=donpicasofoodservices@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FFD700] transition-colors"
                aria-label="Email Don Picaso Food Services"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#FFD700] text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#FFD700] text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/franchise" className="text-gray-400 hover:text-[#FFD700] text-sm transition-colors">
                  Franchise Opportunities
                </Link>
              </li>
              <li>
                <Link to="/branches" className="text-gray-400 hover:text-[#FFD700] text-sm transition-colors">
                  Our Branches
                </Link>
              </li>
            </ul>
          </div>

          {/* Franchise Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Franchise Packages</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/franchise" className="text-gray-400 hover:text-[#FFD700] text-sm transition-colors">
                  Starter — ₱299,000
                </Link>
              </li>
              <li>
                <Link to="/franchise" className="text-gray-400 hover:text-[#FFD700] text-sm transition-colors">
                  Pro — ₱599,000
                </Link>
              </li>
              <li>
                <Link to="/franchise" className="text-gray-400 hover:text-[#FFD700] text-sm transition-colors">
                  Elite — ₱1,000,000
                </Link>
              </li>
              <li>
                <Link to="/apply" className="text-gray-400 hover:text-[#FFD700] text-sm transition-colors">
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin size={16} className="mt-1 text-[#FFD700] flex-shrink-0" />
                <span>Mamburao, Occidental Mindoro, Philippines</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone size={16} className="text-[#FFD700] flex-shrink-0" />
                <span>0956-293-1985</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail size={16} className="text-[#FFD700] flex-shrink-0" />
                <span>donpicasofoodservices@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2026 Don Picaso Food Services. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#FFD700] text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FFD700] text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
