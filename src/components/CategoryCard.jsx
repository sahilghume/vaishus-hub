import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  const { name, description, image, path } = category;

  return (
    <Link
      to={path}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-md border border-gold/10 hover:border-gold/30 hover:shadow-xl transition-all duration-500 bg-cream-dark transform hover:-translate-y-1"
    >
      {/* Category Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />

      {/* Elegant Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/95 via-luxury-black/40 to-transparent transition-opacity duration-300" />

      {/* Card Contents */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 text-cream-light">
        <h3 className="font-serif text-xl font-bold tracking-wider mb-2 group-hover:text-gold transition-colors duration-300">
          {name}
        </h3>
        
        <p className="text-xs text-cream-light/70 leading-relaxed mb-4 font-sans max-w-xs line-clamp-2">
          {description}
        </p>

        {/* View Collection Button */}
        <div className="inline-flex items-center space-x-1 text-xs font-semibold tracking-widest uppercase text-gold group-hover:text-white transition-colors duration-300">
          <span>View Collection</span>
          <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
        </div>
      </div>
    </Link>
  );
}
