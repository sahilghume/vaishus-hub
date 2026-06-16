import { useRef } from 'react';
import { MessageSquare, ArrowDown } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import { WHATSAPP_NUMBER, CATEGORIES } from '../utils/constants';
import heroImg from '../assets/hero_jewellery.png';

export default function Home() {
  const categoriesRef = useRef(null);

  const categories = CATEGORIES.map(c => ({
    name: c.name,
    description: c.description,
    image: c.image,
    path: `/category/${c.slug}`
  }));

  const handleScrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent("Hi VAiSHU's Hub ,I would like to inquire about your premium handcrafted jewellery collections!");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="pb-20 animate-fade">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-center justify-center bg-cream pt-10 sm:pt-6 overflow-hidden">
        {/* Soft background decor */}
        <div className="absolute top-[-30%] left-[-10%] w-[60%] aspect-square rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-gold/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          {/* Copy Column */}
          <div className="space-y-6 text-left max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-gold/10 text-gold-dark border border-gold/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest">
              <span>Handcrafted With Love</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-luxury-black tracking-wide leading-none">
              VAiSHU's Hub
            </h1>

            <p className="font-serif text-lg sm:text-xl md:text-2xl text-gold-dark italic font-light">
              Handcrafted Jewellery Made With Love
            </p>

            <p className="text-sm sm:text-base text-luxury-charcoal/80 leading-relaxed font-sans font-light">
              Discover beautifully handcrafted jewellery designed to celebrate every special moment.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full sm:w-auto">
              <button
                onClick={handleScrollToCategories}
                className="flex items-center justify-center space-x-2 bg-luxury-black text-cream-light hover:bg-gold hover:text-luxury-black border border-gold/15 px-6 py-3.5 md:px-8 md:py-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-white text-luxury-charcoal hover:bg-cream border border-gold/20 px-6 py-3.5 md:px-8 md:py-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow w-full sm:w-auto"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] fill-[#25D366]/10" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Banner Image Column */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src={heroImg}
                alt="Vaishus Hub Premium Handmade Jewellery Banner"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Elegant shadow gradient inside frame */}
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section
        ref={categoriesRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center scroll-mt-24"
      >
        <div className="space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-black">
            Our Collections
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
          <p className="text-xs text-luxury-charcoal/60 uppercase tracking-widest max-w-md mx-auto">
            Browse through our premium categories handcrafted for every style
          </p>
        </div>

        {/* Categories Grid: Desktop 4, Tablet 2, Mobile 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((cat) => (
            <CategoryCard key={cat.name} category={cat} />
          ))}
        </div>
      </section>
    </div>
  );
}
