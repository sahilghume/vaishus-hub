import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { WHATSAPP_NUMBER, CATEGORIES } from '../../utils/constants';

const Instagram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-black text-cream-light/80 border-t border-gold/15 font-sans pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gold/10">

          {/* Brand Info */}
          <div>
            <h3 className="font-serif text-xl font-bold text-gold tracking-widest mb-4">VAiSHU's Hub</h3>
            <p className="text-xs leading-relaxed text-cream-light/65 mb-4 max-w-xs">
              Handcrafted jewellery made with love, patience, and fine attention to detail. Creating timeless treasures that bring classic charm and luxury to your everyday style.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/VAiSHU's_Hub6768"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-light/60 hover:text-gold p-1.5 rounded-full border border-gold/10 hover:border-gold/50 transition-all duration-300"
                aria-label="Instagram Link"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-light/60 hover:text-gold p-1.5 rounded-full border border-gold/10 hover:border-gold/50 transition-all duration-300"
                aria-label="WhatsApp Link"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@vaishushub.com"
                className="text-cream-light/60 hover:text-gold p-1.5 rounded-full border border-gold/10 hover:border-gold/50 transition-all duration-300"
                aria-label="Email Link"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-gold transition-colors duration-300">Home Page</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold transition-colors duration-300">Shop Catalogue</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors duration-300">Our Artisan Story</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors duration-300">Get in Touch</Link>
              </li>
            </ul>
          </div>

          {/* Collections Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold tracking-wider uppercase mb-4">Collections</h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((col) => (
                <li key={col.slug}>
                  <Link to={`/category/${col.slug}`} className="hover:text-gold transition-colors duration-300">
                    {col.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold tracking-wider uppercase mb-4">Contact Info</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:info@vaishushub.com" className="hover:text-gold transition-colors">info@vaishushub.com</a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">Vaishus Hub Studio,<br />Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold tracking-wider uppercase mb-4">Newsletter</h4>
            <p className="text-xs text-cream-light/65 mb-4 leading-relaxed">
              Subscribe to get notified about new collections, seasonal drops, and custom jewellery availability.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex font-sans">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-luxury-charcoal border border-gold/20 text-cream-light placeholder-cream-light/45 rounded-l-2xl px-4 py-2 text-xs w-full focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                required
              />
              <button
                type="submit"
                className="bg-gold hover:bg-gold-dark text-luxury-black font-semibold text-xs rounded-r-2xl px-4 py-2 transition-all duration-300 cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-xs text-cream-light/40 space-y-4 md:space-y-0">
          <div>
            &copy; {currentYear} <span className="font-serif text-gold font-medium">Vaishus Hub</span>. All rights reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>Handcrafted with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
            <span>for lovers of fine art.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
