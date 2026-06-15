import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';
import { WHATSAPP_NUMBER } from '../utils/constants';
import { Phone, ArrowLeft, Sparkles, Check, Heart, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();

  const product = products.find((p) => p.id === parseInt(id));

  // Selected Image State (defaults to null, representing no manual selection)
  const [selectedImage, setSelectedImage] = useState(null);

  // If loading, show a premium skeleton loader for details page
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade">
        <button className="inline-flex items-center text-xs font-semibold text-luxury-charcoal/40 mb-8 uppercase tracking-widest cursor-wait">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Loading...</span>
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse-subtle">
          <div className="lg:col-span-7 aspect-[4/5] bg-cream-dark/30 rounded-2xl" />
          <div className="lg:col-span-5 space-y-6">
            <div className="h-4 bg-cream-dark/40 rounded w-1/4" />
            <div className="h-10 bg-cream-dark/40 rounded w-3/4" />
            <div className="h-6 bg-cream-dark/40 rounded w-1/3" />
            <div className="space-y-2 pt-4">
              <div className="h-4 bg-cream-dark/30 rounded w-full" />
              <div className="h-4 bg-cream-dark/30 rounded w-5/6" />
            </div>
            <div className="space-y-3 pt-8">
              <div className="h-12 bg-cream-dark/40 rounded-2xl w-full" />
              <div className="h-12 bg-cream-dark/30 rounded-2xl w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If product is not found, handle it gracefully
  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center animate-fade">
        <div className="inline-flex p-4 bg-rose-50 text-rose-600 rounded-full mb-4">
          <HelpCircle className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-luxury-black mb-2">Treasure Not Found</h2>
        <p className="text-xs text-luxury-charcoal/70 leading-relaxed mb-6">
          The jewellery piece you are looking for might have been retired, sold out, or moved. Let's head back to our main catalogue to explore active listings.
        </p>
        <Link
          to="/products"
          className="bg-luxury-black text-cream-light hover:bg-gold hover:text-luxury-black border border-gold/25 px-6 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-300"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const { name, category, description, price, materials, images } = product;

  // Compute active image dynamically: fallback to the first product image if no manual selection exists
  const activeImage = (images && images.includes(selectedImage) && selectedImage)
    ? selectedImage
    : (images && images.length > 0 && images[0])
      ? images[0]
      : 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80';

  // Order message customization
  const orderMessage = encodeURIComponent(`Hi Vaishus Hub,

I would like to order this handcrafted item:

*Product ID:* ${product.id}
*Product Name:* ${name}
*Category:* ${category}
*Price:* ₹${price.toLocaleString('en-IN')}

Please guide me regarding payment and delivery. Thank you!`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${orderMessage}`;

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-xs font-semibold text-luxury-charcoal/60 hover:text-gold transition-colors duration-300 mb-8 uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Back</span>
      </button>

      {/* Main Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-gold/10">
        
        {/* Left Side: Image Gallery (Col 1-7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display */}
          <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-gold/10 bg-cream shadow-md relative">
            <img
              src={activeImage}
              alt={name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {/* Handcrafted Badge */}
            <div className="absolute top-4 left-4 bg-luxury-black/85 text-gold border border-gold/30 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center space-x-1 shadow-md">
              <Sparkles className="w-4 h-4 text-gold fill-current" />
              <span>100% Handmade</span>
            </div>
          </div>

          {/* Thumbnail list (Only render if multiple images exist) */}
          {images && images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === img ? 'border-gold shadow-md' : 'border-transparent hover:border-gold/50'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Buying Actions (Col 8-12) */}
        <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-6">
          <div className="space-y-4">
            
            {/* Category Breadcrumb */}
            <div className="text-xs text-gold-dark font-semibold tracking-wider uppercase">
              {category} Collection
            </div>
            
            {/* Name */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black tracking-wide leading-tight">
              {name}
            </h1>
            
            {/* Pricing */}
            <div className="text-2xl font-sans font-semibold text-luxury-black">
              ₹{price.toLocaleString('en-IN')}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-luxury-charcoal/75 leading-relaxed font-sans font-light">
              {description}
            </p>

            {/* Materials List */}
            <div className="space-y-2 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-black">Materials Used:</h3>
              <div className="flex flex-wrap gap-2">
                {materials.map((material, idx) => (
                  <span
                    key={idx}
                    className="bg-cream border border-gold/15 text-luxury-charcoal text-[11px] font-medium px-3.5 py-1.5 rounded-full shadow-2xs"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>

            {/* Quality Commitment Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-gold/10 mt-6">
              <div className="flex items-center space-x-2 text-xs text-luxury-charcoal/70">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Hypoallergenic materials</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-luxury-charcoal/70">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Crafted in small batches</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-luxury-charcoal/70">
                <Heart className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Made in India with love</span>
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-6 lg:pt-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 w-full bg-luxury-black text-cream-light hover:bg-gold hover:text-luxury-black border border-gold/25 py-4 rounded-2xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </a>
            
            <Link
              to="/products"
              className="flex items-center justify-center w-full bg-white text-luxury-charcoal hover:bg-cream border border-gold/15 py-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-3xs"
            >
              Back to Catalogue
            </Link>
          </div>

        </div>
      </div>

      {/* Related Products Section (Only render if there are any) */}
      {relatedProducts.length > 0 && (
        <div className="pt-16">
          <div className="space-y-2 text-left mb-10">
            <h2 className="text-2xl font-serif font-bold text-luxury-black">You May Also Treasure</h2>
            <div className="w-12 h-0.5 bg-gold" />
            <p className="text-xs text-luxury-charcoal/60 uppercase tracking-widest">
              More handpicked products from our {category} catalogue
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
