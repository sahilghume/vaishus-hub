import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';
import ProductFilter from '../components/product/ProductFilter';
import { ProductGridSkeleton } from '../components/product/ProductSkeleton';
import { Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';

export default function Products() {
  const location = useLocation();
  const { products, loading, error, isCachedData, refetch } = useProducts();

  // State managers for filter and search queries
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortOption, setSortOption] = useState('default');


  // If redirected from Home Page category clicks, update the active category
  useEffect(() => {
    if (location.state && location.state.category) {
      const timer = setTimeout(() => {
        setActiveCategory(location.state.category);
        window.history.replaceState({}, document.title);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Derived state: calculate filtered products on the fly during render
  const filteredProducts = (() => {
    let result = [...products];

    // 1. Filter by category
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // 2. Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          (p.materials && p.materials.some((m) => m.toLowerCase().includes(query)))
      );
    }

    // 3. Filter by price range
    if (priceFilter === 'under1500') {
      result = result.filter((p) => p.price < 1500);
    } else if (priceFilter === '1500to2500') {
      result = result.filter((p) => p.price >= 1500 && p.price <= 2500);
    } else if (priceFilter === 'above2500') {
      result = result.filter((p) => p.price > 2500);
    }

    // 4. Sort results
    if (sortOption === 'priceLowHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighLow') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'nameAZ') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  })();

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setPriceFilter('all');
    setSortOption('default');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade">

      {/* Page Header */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center justify-center p-2 bg-gold/10 rounded-xl mb-1">
          <Sparkles className="w-5 h-5 text-gold-dark" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-luxury-black">Our Jewellery Catalogue</h1>
        <div className="w-16 h-0.5 bg-gold mx-auto" />
        <p className="text-xs text-luxury-charcoal/65 uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
          Browse our collection of 100% handcrafted treasures. Choose your favorites and message us directly on WhatsApp to place an order.
        </p>
      </div>

      {/* Offline Warning Banner */}
      {error && isCachedData && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-amber-800 text-xs font-sans max-w-4xl mx-auto">
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

      {/* Filter Component */}
      <ProductFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        totalCount={filteredProducts.length}
      />

      {/* Dynamic Display Grid */}
      {loading ? (
        <ProductGridSkeleton count={8} />
      ) : error && !isCachedData && filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-rose-100 max-w-xl mx-auto px-6 shadow-sm">
          <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-luxury-black mb-2">Could Not Load Catalogue</h3>
          <p className="text-xs text-luxury-charcoal/70 mb-6">{error}</p>
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
        /* Empty State */
        <div className="text-center py-20 bg-white rounded-2xl border border-gold/10 max-w-xl mx-auto px-6 shadow-sm">
          <div className="inline-flex p-4 bg-cream rounded-full mb-4">
            <RefreshCw className="w-8 h-8 text-gold-dark animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <h3 className="font-serif text-xl font-bold text-luxury-black mb-2">No Matching Treasures Found</h3>
          <p className="text-xs text-luxury-charcoal/70 leading-relaxed mb-6">
            We couldn't find any items matching your selected criteria. Try adjusting your search keywords, category pills, or price range dropdowns.
          </p>
          <button
            onClick={handleResetFilters}
            className="bg-luxury-black text-cream-light hover:bg-gold hover:text-luxury-black border border-gold/25 px-6 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
}

