import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { LogOut, Menu, X, User, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

interface NavbarProps {
  showAdminLogout?: boolean;
  onAdminLogout?: () => void;
}

export default function Navbar({ showAdminLogout = false, onAdminLogout }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [authState, setAuthState] = useState(() => ({
    token: localStorage.getItem('dp_app_token') ?? '',
    fullName: localStorage.getItem('dp_applicant_fullName') ?? '',
    email: localStorage.getItem('dp_applicant_email') ?? '',
  }));

  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(authState.token);

  // Re-read auth state whenever the route changes (e.g. after login)
  useEffect(() => {
    setAuthState({
      token: localStorage.getItem('dp_app_token') ?? '',
      fullName: localStorage.getItem('dp_applicant_fullName') ?? '',
      email: localStorage.getItem('dp_applicant_email') ?? '',
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    if (!isUserMenuOpen) return;
    const handler = () => setIsUserMenuOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('dp_app_token');
    localStorage.removeItem('dp_applicant_email');
    localStorage.removeItem('dp_applicant_fullName');
    setAuthState({ token: '', fullName: '', email: '' });
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/', { replace: true });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Franchise', path: '/franchise' },
    { name: 'Branches', path: '/branches' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#7A0000]/90 backdrop-blur-lg border-b border-white/10'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/assets/don-picasos-logo.webp"
              alt="Don Picaso's"
              className="h-12 w-36 rounded-md object-contain object-center shadow-[0_0_20px_rgba(255,215,0,0.25)]"
            />
            <div className="hidden sm:block">
              <div className="text-white font-bold text-xl">DON PICASO'S</div>
              <div className="text-[#FFD700] text-xs tracking-wider">HOUSE OF FRANCHISE</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${isActive(link.path) ? 'text-[#FFD700]' : 'text-gray-300 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {showAdminLogout ? (
              // Admin logout button (passed from AdminDashboard)
              <Button
                type="button"
                onClick={onAdminLogout}
                className="bg-white/10 text-white hover:bg-white/20"
                variant="ghost"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            ) : isLoggedIn ? (
              // Signed-in user dropdown
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors border border-white/10"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FFD700] to-[#B30000] flex items-center justify-center text-black font-bold text-xs flex-shrink-0">
                    {authState.fullName.charAt(0).toUpperCase() || <User className="w-3 h-3" />}
                  </div>
                  <span className="text-white text-sm font-medium max-w-[100px] truncate">
                    {authState.fullName || 'My Account'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#5A0000] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-white text-sm font-semibold truncate">{authState.fullName}</p>
                      <p className="text-gray-400 text-xs truncate">{authState.email}</p>
                    </div>
                    <Link
                      to="/portal"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4 text-[#FFD700]" />
                      My Portal
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors border-t border-white/10"
                    >
                      <LogOut className="w-4 h-4 text-[#FFD700]" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#5A0000]/95 backdrop-blur-lg border-t border-white/10 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${isActive(link.path)
                  ? 'text-[#FFD700] bg-white/5'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="px-4 pt-4 border-t border-white/10 mt-2 space-y-2">
              {showAdminLogout ? (
                <Button
                  type="button"
                  onClick={() => { setIsMobileMenuOpen(false); onAdminLogout?.(); }}
                  className="w-full bg-white/10 text-white hover:bg-white/20"
                  variant="ghost"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              ) : isLoggedIn ? (
                <>
                  {/* Signed-in user info */}
                  <div className="flex items-center gap-3 px-1 pb-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FFD700] to-[#B30000] flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                      {authState.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold truncate">{authState.fullName}</p>
                      <p className="text-gray-400 text-xs truncate">{authState.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/portal"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4 text-[#FFD700]" />
                    My Portal
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-[#FFD700]" />
                    Sign Out
                  </button>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
