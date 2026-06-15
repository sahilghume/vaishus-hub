import { Link } from 'react-router-dom';
import { Phone, Eye, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../../utils/constants';

export default function ProductCard({ product }) {
  const { id, name, category, description, price, images } = product;
  const primaryImage = images && images.length > 0 && images[0] ? images[0] : 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80';

  // WhatsApp order link formation
  const orderMessage = encodeURIComponent(`Hi Vaishus Hub,

I would like to order this handcrafted item:

*Product ID:* ${id}
*Product Name:* ${name}
*Category:* ${category}
*Price:* ₹${price.toLocaleString('en-IN')}

Please guide me regarding payment and delivery. Thank you!`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${orderMessage}`;

  return (
    <div className="group bg-white rounded-2xl border border-gold/10 overflow-hidden shadow-md hover:shadow-xl hover:border-gold/30 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
        <img
          src={primaryImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Handmade Gold Badge */}
        <div className="absolute top-3 left-3 bg-luxury-black/80 backdrop-blur-xs text-gold border border-gold/30 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase flex items-center space-x-1 shadow-sm">
          <Sparkles className="w-3 h-3 text-gold fill-current" />
          <span>Handcrafted</span>
        </div>
        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-cream/90 text-luxury-charcoal px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide uppercase shadow-sm">
          {category}
        </div>
      </div>

      {/* Info Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="font-serif text-lg font-bold text-luxury-black group-hover:text-gold transition-colors duration-300 line-clamp-1 mb-1">
          {name}
        </h3>
        
        {/* Price Tag in INR */}
        <div className="text-gold-dark font-sans font-semibold text-base mb-2">
          ₹{price.toLocaleString('en-IN')}
        </div>

        <p className="text-xs text-luxury-charcoal/70 leading-relaxed mb-5 flex-grow line-clamp-2">
          {description}
        </p>

        {/* Buttons Action Group */}
        <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-2 mt-auto">
          <Link
            to={`/product/${id}`}
            className="flex items-center justify-center space-x-1.5 bg-cream hover:bg-cream-dark text-luxury-charcoal border border-gold/10 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 w-full"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </Link>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1.5 bg-luxury-black text-cream-light hover:bg-gold hover:text-luxury-black px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow w-full"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Order On WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
