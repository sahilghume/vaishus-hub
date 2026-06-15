import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';
import { ProductGridSkeleton } from '../components/product/ProductSkeleton';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function CategoryPage({ category }) {
  const { products, loading, error, isCachedData, refetch } = useProducts();

  // Category metadata mapping for banner styling
  const categoryMeta = {
    'Earrings': {
      title: 'Earrings Collection',
      description: 'Delicate handcrafted earrings for everyday elegance.',
      bannerImage: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1600&q=80'
    },
    'Necklaces': {
      title: 'Necklaces Collection',
      description: 'Timeless necklace designs made with love and care.',
      bannerImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80'
    },
    'Bracelets': {
      title: 'Bracelets Collection',
      description: 'Stylish bracelets to complement every outfit.',
      bannerImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1600&q=80'
    },
    'Custom Gifts': {
      title: 'Custom Gifts Collection',
      description: 'Personalized jewellery crafted for special moments.',
      bannerImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80'
    }
  };

  const meta = categoryMeta[category] || {
    title: `${category} Collection`,
    description: 'Beautiful handcrafted jewellery made with love.',
    bannerImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80'
  };

  // Filter products by current category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="pb-24 animate-fade">
      {/* Category Banner */}
      <section className="relative h-[25vh] min-h-[220px] md:h-[45vh] md:min-h-[300px] flex items-center justify-center bg-luxury-black overflow-hidden">
        {/* Banner Background Image */}
        <img
          src={meta.bannerImage}
          alt={meta.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />
        {/* Luxury Dark Overlays */}
        <div className="absolute inset-0 bg-luxury-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/95 via-luxury-black/40 to-transparent" />

        {/* Banner Texts */}
        <div className="relative z-10 text-center px-4 max-w-3xl space-y-4 animate-fade">
          <span className="font-sans text-xs sm:text-sm font-semibold tracking-widest text-gold uppercase bg-luxury-black/80 px-4 py-1.5 rounded-full border border-gold/25 inline-block shadow-md">
            VAiSHU's Hub Collection
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide shadow-xs">
            {meta.title}
          </h1>
          <p className="font-sans text-sm sm:text-base text-cream-light/80 font-light leading-relaxed max-w-xl mx-auto">
            {meta.description}
          </p>
        </div>
      </section>

      {/* Products Grid section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        
        {/* Offline Warning Banner */}
        {error && isCachedData && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-amber-800 text-xs font-sans">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button 
              onClick={refetch} 
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center pb-6 border-b border-gold/10 mb-10">
          <p className="text-xs font-sans text-luxury-charcoal/60 tracking-wider uppercase font-medium">
            {loading ? 'Loading collection...' : `Showing ${filteredProducts.length} unique handcrafted items`}
          </p>
          <div className="w-12 h-px bg-gold/50 sm:hidden my-2" />
          <p className="text-xs font-serif text-gold-dark italic">
            Each piece is custom-made to order
          </p>
        </div>

        {/* Dynamic Display Logic */}
        {loading ? (
          <ProductGridSkeleton count={4} />
        ) : error && !isCachedData && filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-rose-100 p-8 max-w-xl mx-auto shadow-sm">
            <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <p className="font-serif text-xl text-luxury-charcoal/80 mb-2">Could Not Load Collection</p>
            <p className="text-xs text-luxury-charcoal/65 mb-6">{error}</p>
            <button
              onClick={refetch}
              className="bg-luxury-black text-cream-light hover:bg-gold hover:text-luxury-black border border-gold/25 px-6 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer inline-flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Loading</span>
            </button>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gold/10 p-8">
            <p className="font-serif text-xl text-luxury-charcoal/60 mb-2">No products found</p>
            <p className="text-sm text-luxury-charcoal/45">We are currently updating this collection. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
}

