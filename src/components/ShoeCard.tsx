import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Plus, Check, Heart, Sparkles } from 'lucide-react';
import { Shoe, Colorway } from '../types/shoes';
import { sounds } from '../utils/audio';
import { CurrencyConfig, formatPrice } from '../utils/currency';

interface ShoeCardProps {
  shoe: Shoe;
  onQuickView: (shoe: Shoe) => void;
  onQuickAdd: (shoe: Shoe, size: number, colorway?: Colorway) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (shoe: Shoe) => void;
  currency?: CurrencyConfig;
}

export const ShoeCard: React.FC<ShoeCardProps> = ({
  shoe,
  onQuickView,
  onQuickAdd,
  isWishlisted = false,
  onToggleWishlist,
  currency,
}) => {
  const [selectedColorwayIdx, setSelectedColorwayIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const defaultSize = shoe.sizes[Math.floor(shoe.sizes.length / 2)] || 42;

  const activeColorway = shoe.colorways[selectedColorwayIdx] || shoe.colorways[0];
  const displayedImage = isHovered && shoe.secondaryImage 
    ? shoe.secondaryImage 
    : (activeColorway?.image || shoe.image);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playLuxuryChime();
    setJustAdded(true);
    onQuickAdd(shoe, defaultSize, activeColorway);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleCardClick = () => {
    sounds.playSoftClick();
    onQuickView({
      ...shoe,
      image: activeColorway?.image || shoe.image,
    });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playSoftClick();
    if (onToggleWishlist) {
      onToggleWishlist(shoe);
    }
  };

  const handleColorSelect = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    sounds.playSoftClick();
    setSelectedColorwayIdx(idx);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col bg-[#111114] border border-[#1f1f26] hover:border-[#c5a880]/50 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 relative"
    >
      {/* Visual Slot */}
      <div className="relative aspect-[4/3] bg-[#0c0c0f] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={displayedImage}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.3 }}
            src={displayedImage}
            alt={shoe.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#111114]/80 via-transparent to-transparent pointer-events-none" />

        {/* Status Tag */}
        {shoe.tag && (
          <div className="absolute top-3.5 left-3.5 text-[10px] uppercase tracking-[0.2em] text-[#a09e98] bg-[#0c0c0e]/90 backdrop-blur-sm px-2.5 py-1 border border-[#22222a] z-10">
            {shoe.tag}
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          title={isWishlisted ? 'Remove from private wishlist' : 'Add to private wishlist'}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full border transition-all z-20 ${
            isWishlisted
              ? 'bg-[#1c1914] border-[#c5a880] text-[#c5a880]'
              : 'bg-[#0c0c0e]/85 border-[#2b2b38] text-[#8e8c85] hover:text-[#f5f3ef] hover:border-[#c5a880]/60'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#c5a880]' : ''}`} />
        </button>

        {/* Selected Colorway Pill Badge */}
        <div className="absolute bottom-3 left-3.5 z-10 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#c5a880] bg-[#0c0c0e]/85 backdrop-blur-md px-2 py-0.5 rounded border border-[#262635]">
            {activeColorway?.name}
          </span>
        </div>

        {/* Quick View Floating Action */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            title="Inspect shoe specifications"
            className="p-2.5 bg-[#0c0c0e]/90 hover:bg-[#c5a880] text-[#f5f3ef] hover:text-[#0c0c0e] rounded border border-[#2e2e38] transition-colors shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleQuickAdd}
            title={`Quick add EU ${defaultSize} in ${activeColorway?.name} to bag`}
            className={`px-3 py-2 text-[11px] uppercase tracking-[0.15em] font-medium rounded border transition-colors flex items-center gap-1.5 shadow-lg ${
              justAdded
                ? 'bg-emerald-700 text-white border-emerald-600'
                : 'bg-[#0c0c0e]/90 hover:bg-[#c5a880] text-[#f5f3ef] hover:text-[#0c0c0e] border-[#2e2e38]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Clean Metadata Section with Perfect Alignment */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#8e8c85] font-medium mb-1">
            {shoe.categoryLabel}
          </div>

          <h3 className="font-serif text-lg sm:text-xl text-[#f5f3ef] group-hover:text-[#c5a880] transition-colors line-clamp-1">
            {shoe.name}
          </h3>

          <p className="text-xs text-[#7e7c75] font-light line-clamp-1 mt-1">
            {shoe.leather}
          </p>
        </div>

        {/* Bottom row: Price & Interactive Color Swatches */}
        <div className="pt-3 border-t border-[#1b1b22] flex items-center justify-between gap-3">
          <div className="font-mono tabular-nums text-base font-semibold text-[#f5f3ef]">
            {formatPrice(shoe.price, currency)}
          </div>

          {/* Interactive Colorway Swatches: Clicking changes the shoe image */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#7e7c75] hidden sm:inline uppercase tracking-wider">
              Patina:
            </span>
            <div className="flex items-center gap-1.5">
              {shoe.colorways.map((cw, idx) => {
                const isSelected = selectedColorwayIdx === idx;
                return (
                  <button
                    key={cw.id}
                    onClick={(e) => handleColorSelect(e, idx)}
                    title={`View in ${cw.name}`}
                    className={`relative w-4 h-4 rounded-full transition-transform flex items-center justify-center ${
                      isSelected
                        ? 'ring-2 ring-[#c5a880] ring-offset-1 ring-offset-[#111114] scale-110'
                        : 'hover:scale-110 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: cw.hex }}
                  >
                    {isSelected && (
                      <span className="w-1 h-1 rounded-full bg-white shadow-xs" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
