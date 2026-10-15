import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { IMAGES, ATELIER_ACCOLADES } from '../data/shoesData';
import { sounds } from '../utils/audio';
import { CurrencyConfig, formatPrice } from '../utils/currency';

interface HeroProps {
  onExploreClick: () => void;
  onBespokeClick: () => void;
  currency?: CurrencyConfig;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onBespokeClick, currency }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-[#1f1f24]">
      {/* Subtle ambient light gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(197,168,128,0.08),_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Editorial Typography & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center space-y-8"
          >
            {/* Unboxed Metadata Header (No pills) */}
            <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-[#a09e98]">
              <span>Haute Cordonnerie</span>
              <span aria-hidden="true" className="text-[#c5a880]">·</span>
              <span>Place Vendôme</span>
              <span aria-hidden="true" className="text-[#c5a880]">·</span>
              <span>Since 1928</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] tracking-tight text-[#f5f3ef]" style={{ textWrap: 'balance' }}>
              Sculpted for eternity in single-piece calfskin.
            </h1>

            {/* Editorial Body */}
            <p className="text-base sm:text-lg text-[#b8b5ad] font-light leading-relaxed max-w-xl">
              Each pair is formed over bespoke hornbeam lasts in our Tuscan atelier. Seamless wholecut architecture, hand-stitched Goodyear welting, and 180 hours of uncompromising master artistry.
            </p>

            {/* Technical Highlights - Clean unboxed text list */}
            <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#1f1f24] text-xs text-[#a09e98]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>Oak Bark Baker Leather Soles</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>Hand-Crystallized Glaçage</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  sounds.playSoftClick();
                  onExploreClick();
                }}
                className="px-8 py-4 bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-[#c5a880]/20 whitespace-nowrap shrink-0 group rounded"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  sounds.playSoftClick();
                  onBespokeClick();
                }}
                className="px-7 py-4 bg-[#141417] hover:bg-[#1c1c22] border border-[#2d2d38] hover:border-[#c5a880]/50 text-[#f5f3ef] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap shrink-0 rounded"
              >
                <Compass className="w-4 h-4 text-[#c5a880]" />
                <span>Custom Atelier Studio</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Hero Cinematic Showcase with interactive depth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[380px] lg:min-h-[520px] rounded-sm overflow-hidden border border-[#202027] group bg-[#111114]">
              {/* Product Photography */}
              <img
                src={IMAGES.hero}
                alt="Bespoke Italian Wholecut Oxford on Nero Marquina marble plinth"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e]/90 via-transparent to-transparent pointer-events-none" />

              {/* Floating Curated Shoe Info Plate */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#0c0c0e]/85 backdrop-blur-md border border-[#2a2a35] rounded flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#c5a880] font-medium">
                    Iconic Piece
                  </div>
                  <div className="font-serif text-lg text-[#f5f3ef]">
                    The Vendôme Wholecut Oxford
                  </div>
                  <div className="text-xs text-[#8e8c85]">
                    French Box Calf · Mirrored Glaçage Toe
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-mono tabular-nums text-[#f5f3ef] font-semibold">
                    {formatPrice(1850, currency)}
                  </div>
                  <button
                    onClick={() => {
                      sounds.playSoftClick();
                      onBespokeClick();
                    }}
                    className="mt-1 text-[11px] text-[#c5a880] hover:text-[#d8ba8d] tracking-[0.1em] uppercase underline underline-offset-4"
                  >
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width 4-Column KPI Strip below hero split */}
        <div className="mt-16 pt-10 border-t border-[#1f1f24] grid grid-cols-2 md:grid-cols-4 gap-8">
          {ATELIER_ACCOLADES.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl text-[#c5a880] tabular-nums font-medium">
                {item.stat}
              </div>
              <div className="text-xs uppercase tracking-[0.15em] text-[#f5f3ef] font-medium">
                {item.label}
              </div>
              <div className="text-xs text-[#7e7c75]">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
