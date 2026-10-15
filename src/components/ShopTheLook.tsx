import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowUpRight, Eye, Sparkles } from 'lucide-react';
import { IMAGES, LUXURY_SHOES } from '../data/shoesData';
import { Shoe } from '../types/shoes';
import { sounds } from '../utils/audio';
import { CurrencyConfig, formatPrice } from '../utils/currency';

interface ShopTheLookProps {
  onQuickView: (shoe: Shoe) => void;
  onAddToCart: (shoe: Shoe, size: number) => void;
  onCustomize: (shoe: Shoe) => void;
  currency?: CurrencyConfig;
}

interface LookScene {
  id: string;
  lookNumber: string;
  title: string;
  occasion: string;
  location: string;
  image: string;
  shoes: {
    shoe: Shoe;
    pinX: number; // percentage
    pinY: number; // percentage
    sartorialNotes: string;
    pairWith: string;
  };
}

export const ShopTheLook: React.FC<ShopTheLookProps> = ({
  onQuickView,
  onAddToCart,
  onCustomize,
  currency,
}) => {
  const looks: LookScene[] = [
    {
      id: 'look-opera',
      lookNumber: 'Look 01',
      title: 'Black Tie Gala at Palais Garnier',
      occasion: 'Grand Opera & Evening Formal',
      location: 'Place de l’Opéra, Paris',
      image: IMAGES.hero,
      shoes: {
        shoe: LUXURY_SHOES[0], // Wholecut
        pinX: 58,
        pinY: 62,
        sartorialNotes: 'Paired with midnight barathea wool tuxedo, silk grosgrain lapels, and hand-pleated marcella shirt.',
        pairWith: 'Black Barathea Tuxedo & Platinum Cufflinks',
      },
    },
    {
      id: 'look-florence',
      lookNumber: 'Look 02',
      title: 'Palazzo Private Salon Reception',
      occasion: 'Autumn Sartorial & Sprezzatura',
      location: 'Via de’ Tornabuoni, Florence',
      image: IMAGES.monkstrapCognac,
      shoes: {
        shoe: LUXURY_SHOES[1], // Monk Strap
        pinX: 52,
        pinY: 58,
        sartorialNotes: 'Paired with flannel chalk stripe double-breasted suit and unlined madder silk necktie.',
        pairWith: 'Fox Brothers Flannel & Cashmere Overcoat',
      },
    },
    {
      id: 'look-riviera',
      lookNumber: 'Look 03',
      title: 'Mediterranean Villa Sundowner',
      occasion: 'Resort Elegance & Leisure',
      location: 'Cap d’Antibes, French Riviera',
      image: IMAGES.loaferEmerald,
      shoes: {
        shoe: LUXURY_SHOES[2], // Loafer
        pinX: 48,
        pinY: 55,
        sartorialNotes: 'Paired with Solbiati Irish linen trousers, bespoke camp collar silk shirt, and Panama hat.',
        pairWith: 'Pure Irish Linen & Tortoiseshell Eyewear',
      },
    },
  ];

  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [pinCardOpen, setPinCardOpen] = useState(true);
  const currentLook = looks[activeLookIndex];

  return (
    <section className="py-24 bg-[#0a0a0d] border-b border-[#1f1f26] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1b1b22]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#a09e98] mb-3">
              <span>Sartorial Lookbook</span>
              <span aria-hidden="true" className="text-[#c5a880]">·</span>
              <span>Interactive Wardrobe Styling</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f5f3ef]">
              Shop the Curated Look
            </h2>
          </div>
          <p className="text-sm text-[#8e8c85] max-w-md font-light leading-relaxed">
            Click on the footwear focal points within each lifestyle setting to examine sizing, tailored pairing harmonies, or commission the complete aesthetic.
          </p>
        </div>

        {/* Look Switcher Navigation */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {looks.map((look, idx) => {
            const isSelected = activeLookIndex === idx;
            return (
              <button
                key={look.id}
                onClick={() => {
                  sounds.playSoftClick();
                  setActiveLookIndex(idx);
                  setPinCardOpen(true);
                }}
                className={`px-5 py-3 rounded text-left transition-all border whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'border-[#c5a880] bg-[#1a1713]'
                    : 'border-[#22222b] bg-[#111115] hover:border-[#383848]'
                }`}
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-medium">
                  {look.lookNumber}
                </div>
                <div className={`text-xs font-serif mt-0.5 ${isSelected ? 'text-[#f5f3ef]' : 'text-[#8e8c85]'}`}>
                  {look.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Lifestyle Visual Canvas with Interactive Pins */}
        <div className="mt-8 relative aspect-[16/9] lg:aspect-[21/9] min-h-[460px] rounded-sm overflow-hidden border border-[#242432] bg-[#0c0c0f]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLook.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative"
            >
              <img
                src={currentLook.image}
                alt={currentLook.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d]/85 via-transparent to-black/20 pointer-events-none" />

              {/* Lifestyle Context Badge */}
              <div className="absolute top-6 left-6 p-4 bg-[#0c0c0e]/85 backdrop-blur-md border border-[#262632] rounded max-w-xs">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-medium">
                  {currentLook.occasion}
                </div>
                <div className="font-serif text-lg text-[#f5f3ef] mt-0.5">
                  {currentLook.title}
                </div>
                <div className="text-xs text-[#8e8c85] mt-1">
                  {currentLook.location}
                </div>
              </div>

              {/* Interactive Hotspot Pin on the shoe */}
              <div
                style={{
                  top: `${currentLook.shoes.pinY}%`,
                  left: `${currentLook.shoes.pinX}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                {/* Pin Button */}
                <button
                  onClick={() => {
                    sounds.playSoftClick();
                    setPinCardOpen(!pinCardOpen);
                  }}
                  className="relative group p-2 focus:outline-none"
                  aria-label={`Inspect ${currentLook.shoes.shoe.name}`}
                >
                  <span className="absolute inset-0 rounded-full bg-[#c5a880]/30 animate-ping" />
                  <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#0c0c0e] border-2 border-[#c5a880] text-[#c5a880] hover:scale-110 transition-transform shadow-xl">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                </button>

                {/* Popover Product Card */}
                <AnimatePresence>
                  {pinCardOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 sm:w-80 p-4 bg-[#0c0c0e]/95 backdrop-blur-xl border border-[#c5a880]/50 rounded-sm shadow-2xl z-30"
                    >
                      <div className="flex gap-3">
                        <img
                          src={currentLook.shoes.shoe.image}
                          alt={currentLook.shoes.shoe.name}
                          referrerPolicy="no-referrer"
                          className="w-18 h-18 object-cover rounded bg-[#181820] border border-[#262632] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880]">
                            {currentLook.shoes.shoe.categoryLabel}
                          </div>
                          <h4 className="font-serif text-base text-[#f5f3ef] truncate">
                            {currentLook.shoes.shoe.name}
                          </h4>
                          <div className="font-mono tabular-nums text-xs text-[#f5f3ef] font-semibold mt-0.5">
                            {formatPrice(currentLook.shoes.shoe.price, currency)}
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#a09e98] leading-relaxed mt-3 pt-2.5 border-t border-[#1f1f26]">
                        {currentLook.shoes.sartorialNotes}
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#1f1f26] flex items-center gap-2">
                        <button
                          onClick={() => {
                            sounds.playSoftClick();
                            onQuickView(currentLook.shoes.shoe);
                          }}
                          className="flex-1 py-2 bg-[#181820] hover:bg-[#22222c] border border-[#2a2a38] text-[10px] uppercase tracking-[0.15em] text-[#f5f3ef] font-medium rounded transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Eye className="w-3 h-3 text-[#c5a880]" />
                          <span>Inspect Spec</span>
                        </button>

                        <button
                          onClick={() => {
                            sounds.playLuxuryChime();
                            onAddToCart(currentLook.shoes.shoe, 42);
                          }}
                          className="flex-1 py-2 bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e] text-[10px] uppercase tracking-[0.15em] font-semibold rounded transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
