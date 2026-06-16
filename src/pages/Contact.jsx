import { Mail, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/constants';

// Instagram icon component
const InstagramIcon = (props) => (
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

// WhatsApp icon component
const WhatsAppIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    fill="currentColor"
    {...props}
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

export default function Contact() {
  const whatsappMessage = encodeURIComponent("Hi VAiSHU'S Hub, I would like to get in touch regarding a handcrafted jewellery inquiry!");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center justify-center p-2.5 bg-gold/10 rounded-xl mb-1">
          <MessageCircle className="w-5 h-5 text-gold-dark" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-luxury-black tracking-wide">
          Connect With Us
        </h1>
        <div className="w-16 h-0.5 bg-gold mx-auto" />
        <p className="text-xs text-luxury-charcoal/65 uppercase tracking-widest max-w-md mx-auto leading-relaxed">
          Order directly or chat with our designer on WhatsApp
        </p>
      </div>

      {/* Contact Channels Card */}
      <div className="bg-white rounded-2xl border border-gold/15 p-8 sm:p-12 shadow-md hover:shadow-lg transition-all duration-300 space-y-10 text-center">
        <p className="text-sm sm:text-base text-luxury-charcoal/85 max-w-xl mx-auto font-sans leading-relaxed font-light">
          Have questions about custom sizing, custom jewellery gift sets, or design availability? Reach out through any of our channels below. We are happy to help!
        </p>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-b border-gold/10 py-10">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-5 rounded-2xl bg-cream hover:bg-cream-dark transition-all duration-300 border border-gold/5"
          >
            <div className="p-3 bg-[#25D366]/10 text-[#25D366] rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <WhatsAppIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-black mb-1">
              WhatsApp
            </h3>
            <p className="text-xs text-luxury-charcoal/70 break-all font-sans font-light">
              +{WHATSAPP_NUMBER}
            </p>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/vaishus_hub6768?igsh=MTlibXV5OTVjeDdjeA=="
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-5 rounded-2xl bg-cream hover:bg-cream-dark transition-all duration-300 border border-gold/5"
          >
            <div className="p-3 bg-pink-500/10 text-pink-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <InstagramIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-black mb-1">
              Instagram
            </h3>
            <p className="text-xs text-luxury-charcoal/70 break-all font-sans font-light">
              @VAiSHU's Hub
            </p>
          </a>

          {/* Email */}
          <a
            href="mailto:vaishuhub6768@gmail.com"
            className="group flex flex-col items-center p-5 rounded-2xl bg-cream hover:bg-cream-dark transition-all duration-300 border border-gold/5"
          >
            <div className="p-3 bg-gold/10 text-gold-dark rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-black mb-1">
              Email Address
            </h3>
            <p className="text-xs text-luxury-charcoal/70 break-all font-sans font-light">
              vaishuhub6768@gmail.com
            </p>
          </a>
        </div>

        {/* Large WhatsApp CTA Button */}
        <div className="pt-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-3 bg-luxury-black text-cream-light hover:bg-gold hover:text-luxury-black px-10 py-5 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-gold/25 w-full sm:w-auto"
          >
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            <span>Chat Directly on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
