import { Heart, Sparkles, Hammer, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-24 animate-fade">
      {/* Page Header */}
      <section className="bg-cream-dark/20 py-20 text-center border-b border-gold/10">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <div className="inline-flex p-2 bg-gold/10 rounded-xl mb-1">
            <Heart className="w-5 h-5 text-gold-dark fill-gold-dark/10" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-black tracking-wide">
            Our Artisan Story
          </h1>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
          <p className="text-xs text-luxury-charcoal/60 uppercase tracking-widest leading-relaxed">
            Discover the passion, patience, and purpose behind Vaishus Hub
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 space-y-24">
        
        {/* SECTION 1: Our Story */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left order-2 lg:order-1">
            <div className="flex items-center space-x-2 text-gold-dark">
              <Heart className="w-5 h-5 text-gold" />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider">Created With Love</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-luxury-black">Our Story</h2>
            <p className="text-base text-luxury-charcoal/80 leading-relaxed font-sans font-light">
              Vaishus Hub creates handcrafted jewellery designed with love, creativity and attention to detail.
            </p>
            <p className="text-sm text-luxury-charcoal/70 leading-relaxed font-sans font-light">
              In a world dominated by mass production, we celebrate the slow craft of making. Every bead, stone, and wire wrap is carefully selected and assembled by hand to ensure that the piece you wear is unique, full of life, and personal.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-w-4 rounded-2xl overflow-hidden shadow-md border border-gold/10">
              <img
                src="https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=800&q=80"
                alt="Hands crafting jewellery"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: Our Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-w-4 rounded-2xl overflow-hidden shadow-md border border-gold/10">
              <img
                src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80"
                alt="Elegant necklace presentation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
          </div>
          <div className="space-y-6 text-left">
            <div className="flex items-center space-x-2 text-gold-dark">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider">A Memorable Sparkle</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-luxury-black">Our Mission</h2>
            <p className="text-base text-luxury-charcoal/80 leading-relaxed font-sans font-light">
              To provide elegant handmade jewellery that makes every moment memorable.
            </p>
            <p className="text-sm text-luxury-charcoal/70 leading-relaxed font-sans font-light">
              We aim to design wearable treasures that connect with your emotions. Whether it is a gift for a loved one or a special purchase to celebrate yourself, our pieces add a touch of timeless charm to life's memories.
            </p>
          </div>
        </section>

        {/* SECTION 3: Handmade Process */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left order-2 lg:order-1">
            <div className="flex items-center space-x-2 text-gold-dark">
              <Hammer className="w-5 h-5 text-gold" />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider">Artisan Assembled</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-luxury-black">Handmade Process</h2>
            <p className="text-base text-luxury-charcoal/80 leading-relaxed font-sans font-light">
              Every piece is carefully crafted by hand using premium materials.
            </p>
            <p className="text-sm text-luxury-charcoal/70 leading-relaxed font-sans font-light">
              From our studio workbench, each jewel undergoes a slow crafting journey. We use selected crystals, freshwater pearls, sterling silver, and premium gold coatings to ensure that every creation lasts and remains sparkling.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-w-4 rounded-2xl overflow-hidden shadow-md border border-gold/10">
              <img
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80"
                alt="Handmade jewelry materials workbench"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* SECTION 4: Quality Commitment */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-w-4 rounded-2xl overflow-hidden shadow-md border border-gold/10">
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
                alt="Pearls and details check"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
          </div>
          <div className="space-y-6 text-left">
            <div className="flex items-center space-x-2 text-gold-dark">
              <ShieldCheck className="w-5 h-5 text-gold" />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider">Uncompromising Standards</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-luxury-black">Quality Commitment</h2>
            <p className="text-base text-luxury-charcoal/80 leading-relaxed font-sans font-light">
              We focus on quality, uniqueness and customer satisfaction.
            </p>
            <p className="text-sm text-luxury-charcoal/70 leading-relaxed font-sans font-light">
              Your joy is our main goal. We ensure that all products are hypoallergenic, carefully quality-checked, and shipped in premium packaging. If you ever need support or want something custom-made, we are only a WhatsApp chat away.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
