import { Eye, MessageSquare } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/constants';

export default function ProductCard({ product }) {
  const { name, category, price, description, image } = product;

  // Format Price in Indian Rupees format (e.g. 1,499)
  const formattedPrice = price.toLocaleString('en-IN');

  // WhatsApp Message for "View Details"
  const detailsText = `Hi VAiSHU's Hub,

I would like more details about this product.

Product Name: ${name}
Price: ₹${formattedPrice}
Category: ${category}

Please share additional photos and details.`;

  // WhatsApp Message for "Order on WhatsApp"
  const orderText = `VAiSHU's Hub,

I would like to order:

Product Name: ${name}
Price: ₹${formattedPrice}
Category: ${category}

Please guide me regarding payment and delivery.

Thank you.`;

  const detailsUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(detailsText)}`;
  const orderUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderText)}`;

  return (
    <div className="group bg-white rounded-2xl border border-gold/10 overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1 bg-cream-light/30">
      {/* Product Image Container */}
      <div className="relative aspect-w-4 overflow-hidden bg-cream-dark">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Soft gold category badge */}
        <div className="absolute top-3 right-3 bg-cream-light/90 backdrop-blur-xs text-gold-dark border border-gold/20 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase shadow-xs">
          {category}
        </div>
      </div>

      {/* Info Body */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-serif text-lg font-bold text-luxury-black group-hover:text-gold transition-colors duration-300 line-clamp-1 mb-1">
          {name}
        </h3>

        {/* Price Tag in INR */}
        <div className="text-gold-dark font-sans font-semibold text-base mb-2">
          ₹{formattedPrice}
        </div>

        <p className="text-xs text-luxury-charcoal/70 leading-relaxed mb-5 flex-grow line-clamp-2">
          {description}
        </p>

        {/* Buttons Action Group */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          {/* View Details opens WhatsApp */}
          <a
            href={detailsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1.5 bg-cream hover:bg-cream-dark text-luxury-charcoal border border-gold/15 px-3 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-300"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </a>

          {/* Order on WhatsApp opens WhatsApp */}
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1.5 bg-luxury-black text-cream-light hover:bg-gold hover:text-luxury-black px-3 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-300 shadow-sm hover:shadow"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]/10" />
            <span>Order On WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
