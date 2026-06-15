
export default function ProductSkeleton() {
  return (
    <div className="group bg-white rounded-2xl border border-gold/10 overflow-hidden shadow-sm flex flex-col h-full animate-pulse-subtle">
      {/* Product Image Skeleton Container */}
      <div className="relative aspect-[4/5] bg-cream-dark/40">
        {/* Aspect Ratio Box with Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>

      {/* Info Body Skeleton */}
      <div className="p-5 flex flex-col flex-grow space-y-3">
        {/* Title Placeholder */}
        <div className="h-5 bg-cream-dark/50 rounded-lg w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
        
        {/* Price Placeholder */}
        <div className="h-4 bg-cream-dark/50 rounded-lg w-1/4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>

        {/* Description Placeholder */}
        <div className="space-y-2 pt-2 flex-grow">
          <div className="h-3 bg-cream-dark/40 rounded-md w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>
          <div className="h-3 bg-cream-dark/40 rounded-md w-5/6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>

        {/* Buttons Action Group Placeholder */}
        <div className="grid grid-cols-2 gap-2 pt-3 mt-auto">
          <div className="h-9 bg-cream-dark/40 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>
          <div className="h-9 bg-cream-dark/40 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to render multiple skeletons in a grid
export function ProductGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </div>
  );
}
