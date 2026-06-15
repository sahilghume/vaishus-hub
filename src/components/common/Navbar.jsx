import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import logo from '../../assets/Bryndan_Write-removebg-preview.png';
import { WHATSAPP_NUMBER, CATEGORIES } from '../../utils/constants';

export default function Navbar() {
  console.log('Logo path:', logo);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();

  // Handle transparent to white/glass transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      setMobileDropdownOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location]);

  const collections = CATEGORIES.map(c => ({
    name: c.name,
    path: `/category/${c.slug}`
  }));

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-cream-light/95 backdrop-blur-md shadow-sm border-b border-gold/10 py-3'
        : 'bg-cream-light/80 backdrop-blur-xs border-b border-gold/5 py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Vaishus Hub Logo" className="h-10 sm:h-12 w-auto object-contain" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative font-sans text-sm font-medium tracking-wider transition-colors duration-300 hover:text-gold ${isActive ? 'text-gold' : 'text-luxury-charcoal/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold rounded-full animate-fade" />
                  )}
                </>
              )}
            </NavLink>

            {/* Premium Collections Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center space-x-1 font-sans text-sm font-medium tracking-wider transition-colors duration-300 hover:text-gold cursor-pointer ${location.pathname.startsWith('/category/')
                  ? 'text-gold'
                  : 'text-luxury-charcoal/80'
                  }`}
              >
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu Box */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-cream-light border border-gold/15 rounded-2xl shadow-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 z-50">
                {collections.map((col) => (
                  <Link
                    key={col.path}
                    to={col.path}
                    className="block px-5 py-2.5 text-xs font-medium tracking-wider text-luxury-charcoal/80 hover:bg-gold/10 hover:text-gold-dark transition-all duration-200"
                  >
                    {col.name}
                  </Link>
                ))}
              </div>
            </div>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `relative font-sans text-sm font-medium tracking-wider transition-colors duration-300 hover:text-gold ${isActive ? 'text-gold' : 'text-luxury-charcoal/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Shop Catalogue
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold rounded-full animate-fade" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative font-sans text-sm font-medium tracking-wider transition-colors duration-300 hover:text-gold ${isActive ? 'text-gold' : 'text-luxury-charcoal/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Our Story
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold rounded-full animate-fade" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative font-sans text-sm font-medium tracking-wider transition-colors duration-300 hover:text-gold ${isActive ? 'text-gold' : 'text-luxury-charcoal/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Contact Us
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold rounded-full animate-fade" />
                  )}
                </>
              )}
            </NavLink>
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex items-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Vaishus%20Hub,%20I'm%20interested%20in%20your%20jewellery%20collection!`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-luxury-black text-cream-light hover:bg-gold hover:text-luxury-black border border-gold/20 px-5 py-2.5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-luxury-black hover:text-gold p-2 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-luxury-black/30 backdrop-blur-xs z-40 transition-opacity duration-300 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-3/4 max-w-xs bg-cream-light border-l border-gold/10 shadow-2xl z-50 p-6 transform transition-transform duration-300 md:hidden flex flex-col justify-between ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div>
          <div className="flex justify-between items-center pb-6 border-b border-gold/10">
            <span className="font-serif font-bold text-lg text-gradient-gold">VAISHUS HUB</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-luxury-black hover:text-gold p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col space-y-5 mt-8 overflow-y-auto max-h-[calc(100vh-220px)] pr-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-sans text-sm font-medium tracking-wide pb-1 transition-colors ${isActive ? 'text-gold border-b border-gold/25' : 'text-luxury-charcoal/80 hover:text-gold'
                }`
              }
            >
              Home
            </NavLink>

            {/* Mobile Accordion for Collections */}
            <div>
              <button
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className={`flex items-center justify-between w-full font-sans text-sm font-medium tracking-wide pb-1 transition-colors text-left border-b border-gold/5 ${mobileDropdownOpen ? 'text-gold' : 'text-luxury-charcoal/80'
                  }`}
              >
                <span>Collections</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${mobileDropdownOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden pl-4 ${mobileDropdownOpen ? 'max-h-48 opacity-100 mt-2 space-y-3' : 'max-h-0 opacity-0'
                  }`}
              >
                {collections.map((col) => (
                  <Link
                    key={col.path}
                    to={col.path}
                    className="block font-sans text-xs font-medium text-luxury-charcoal/70 hover:text-gold transition-colors py-1"
                  >
                    {col.name}
                  </Link>
                ))}
              </div>
            </div>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `font-sans text-sm font-medium tracking-wide pb-1 transition-colors ${isActive ? 'text-gold border-b border-gold/25' : 'text-luxury-charcoal/80 hover:text-gold'
                }`
              }
            >
              Shop Catalogue
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-sans text-sm font-medium tracking-wide pb-1 transition-colors ${isActive ? 'text-gold border-b border-gold/25' : 'text-luxury-charcoal/80 hover:text-gold'
                }`
              }
            >
              Our Story
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `font-sans text-sm font-medium tracking-wide pb-1 transition-colors ${isActive ? 'text-gold border-b border-gold/25' : 'text-luxury-charcoal/80 hover:text-gold'
                }`
              }
            >
              Contact Us
            </NavLink>
          </div>
        </div>

        <div className="pb-8">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Vaishus%20Hub,%20I'm%20interested%20in%20your%20jewellery%20collection!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 w-full bg-luxury-black text-cream-light hover:bg-gold hover:text-luxury-black py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md"
          >
            <Phone className="w-4 h-4" />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
