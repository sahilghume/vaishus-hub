import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';

export default function ProductFilter({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  priceFilter,
  setPriceFilter,
  sortOption,
  setSortOption,
  totalCount
}) {
  const categories = ['All', ...CATEGORIES.map(c => c.name)];

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₹1,500', value: 'under1500' },
    { label: '₹1,500 - ₹2,500', value: '1500to2500' },
    { label: 'Above ₹2,500', value: 'above2500' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm mb-8 animate-fade">
      {/* Top Row: Search & Count */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cream-dark">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jewellery (e.g. pearl, gold, moonstone...)"
            className="w-full bg-cream-light text-luxury-black border border-gold/15 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300"
          />
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-luxury-charcoal/40" />
        </div>

        {/* Total Results Count */}
        <div className="text-xs font-medium tracking-wide text-luxury-charcoal/60 uppercase">
          Showing <span className="text-gold font-bold">{totalCount}</span> treasures
        </div>
      </div>

      {/* Bottom Row: Category Pills & Selectors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
        {/* Category Pills (Col 1-8) */}
        <div className="lg:col-span-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-luxury-black text-cream-light shadow-md'
                  : 'bg-cream text-luxury-charcoal hover:bg-cream-dark border border-gold/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Selectors Group (Col 9-12) */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3 w-full justify-end">
          
          {/* Price Range Filter */}
          <div className="relative flex-1 sm:max-w-[180px]">
            <label className="sr-only">Price Range</label>
            <div className="flex items-center bg-cream border border-gold/10 rounded-xl px-3 py-2 text-xs font-medium text-luxury-charcoal">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold mr-2" />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="bg-transparent w-full focus:outline-none cursor-pointer font-sans"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Selector */}
          <div className="relative flex-1 sm:max-w-[180px]">
            <label className="sr-only">Sort by</label>
            <div className="flex items-center bg-cream border border-gold/10 rounded-xl px-3 py-2 text-xs font-medium text-luxury-charcoal">
              <ArrowUpDown className="w-3.5 h-3.5 text-gold mr-2" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent w-full focus:outline-none cursor-pointer font-sans"
              >
                <option value="default">Default Sort</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="nameAZ">Name: A to Z</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
