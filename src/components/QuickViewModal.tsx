import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShieldCheck, ShoppingBag, Sparkles, Sliders, Ruler, Heart } from 'lucide-react';
import { Shoe, Colorway } from '../types/shoes';
import { sounds } from '../utils/audio';
import { CurrencyConfig, formatPrice } from '../utils/currency';

interface QuickViewModalProps {
  shoe: Shoe | null;
  onClose: () => void;
  onAddToCart: (
    shoe: Shoe,
    size: number,
    width: 'Standard (D)' | 'Wide (EE)',
    colorway?: Colorway
  ) => void;
  onOpenBespokeStudio: (shoe: Shoe) => void;
  onOpenSizingGuide?: () => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (shoe: Shoe) => void;
  currency?: CurrencyConfig;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  shoe,
  onClose,
  onAddToCart,
  onOpenBespokeStudio,
  onOpenSizingGuide,
  isWishlisted = false,
  onToggleWishlist,
  currency,
}) => {
  if (!shoe) return null;

  const [selectedSize, setSelectedSize] = useState<number>(shoe.sizes[2] || 42);
  const [selectedWidth, setSelectedWidth] = useState<'Standard (D)' | 'Wide (EE)'>('Standard (D)');
  const [selectedColorwayIdx, setSelectedColorwayIdx] = useState(0);
  const [activeImage, setActiveImage] = useState<string>(shoe.image);
  const [added, setAdded] = useState(false);

  // Sync state when shoe changes
  useEffect(() => {
    setSelectedColorwayIdx(0);
    setActiveImage(shoe.colorways[0]?.image || shoe.image);
    setSelectedSize(shoe.sizes[Math.floor(shoe.sizes.length / 2)] || 42);
  }, [shoe]);

  const activeColorway = shoe.colorways[selectedColorwayIdx] || shoe.colorways[0];

  const handleSelectColorway = (idx: number) => {
    sounds.playSoftClick();
    setSelectedColorwayIdx(idx);
    const targetCw = shoe.colorways[idx];
    if (targetCw?.image) {
      setActiveImage(targetCw.image);
    }
  };

  const handleAdd = () => {
    sounds.playLuxuryChime();
    onAddToCart(shoe, selectedSize, selectedWidth, activeColorway);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0d0d10] border border-[#282838] rounded-sm shadow-2xl z-10 text-[#f5f3ef]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-[#8e8c85] hover:text-[#f5f3ef] transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
            {/* Left: Gallery & Color Visual (6 Cols) */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] bg-[#09090b] rounded overflow-hidden border border-[#202028]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0.85 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.85 }}
                    transition={{ duration: 0.25 }}
                    src={activeImage}
                    alt={shoe.name}
                    className="w-full h-full object-cover object-center"
                  />
                </AnimatePresence>

                {shoe.tag && (
                  <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] text-[#a09e98] bg-[#0c0c0e]/90 px-2.5 py-1 border border-[#22222a]">
                    {shoe.tag}
                  </div>
                )}

                {/* Selected Colorway Overlay Tag */}
                <div className="absolute bottom-3 left-3 bg-[#0c0c0e]/90 text-[#c5a880] text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 border border-[#2e2e38] backdrop-blur-sm">
                  {activeColorway?.name}
                </div>

                {onToggleWishlist && (
                  <button
                    onClick={() => onToggleWishlist(shoe)}
                    className={`absolute top-4 right-4 p-2 rounded-full border transition-colors ${
                      isWishlisted
                        ? 'bg-[#1c1914] border-[#c5a880] text-[#c5a880]'
                        : 'bg-[#0c0c0e]/80 border-[#2b2b38] text-[#8e8c85] hover:text-[#f5f3ef]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#c5a880]' : ''}`} />
                  </button>
                )}
              </div>

              {/* Colorway Thumbnails Swatches */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#8e8c85] block">
                  Select Patina Colorway (Click to switch shoe):
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {shoe.colorways.map((cw, idx) => {
                    const isSelected = selectedColorwayIdx === idx;
                    return (
                      <button
                        key={cw.id}
                        type="button"
                        onClick={() => handleSelectColorway(idx)}
                        className={`p-2 rounded border text-left flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'border-[#c5a880] bg-[#1a1713] text-[#f5f3ef]'
                            : 'border-[#22222b] bg-[#121216] text-[#8e8c85] hover:text-[#f5f3ef]'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full shrink-0 border border-white/20 ${
                            isSelected ? 'ring-2 ring-[#c5a880]' : ''
                          }`}
                          style={{ backgroundColor: cw.hex }}
                        />
                        <span className="text-[11px] truncate font-medium">
                          {cw.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 bg-[#121216] border border-[#1f1f26] rounded text-xs space-y-2 text-[#a09e98]">
                <div className="flex items-center gap-2 text-[#c5a880] font-medium uppercase tracking-[0.15em] text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>The Vendôme Guarantee</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Complimentary bespoke cedar shoe trees, dust covers, and lifetime welt inspection included with every commission.
                </p>
              </div>
            </div>

            {/* Right: Information & Custom Selection (6 Cols) */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#c5a880] font-medium mb-1">
                  {shoe.categoryLabel}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f3ef]">
                  {shoe.name}
                </h3>
                <div className="font-mono tabular-nums text-xl text-[#f5f3ef] font-semibold mt-1">
                  {formatPrice(shoe.price, currency)}
                </div>

                <p className="text-xs text-[#a09e98] leading-relaxed font-light mt-3">
                  {shoe.description}
                </p>

                {/* Specs */}
                <div className="mt-4 pt-4 border-t border-[#1f1f26] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#7e7c75]">Upper Leather</span>
                    <span className="text-[#f5f3ef] text-right font-medium">{shoe.leather}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7e7c75]">Construction</span>
                    <span className="text-[#f5f3ef] text-right font-medium">{shoe.construction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7e7c75]">Sole Profile</span>
                    <span className="text-[#f5f3ef] text-right font-medium">{shoe.sole}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7e7c75]">Last Geometry</span>
                    <span className="text-[#f5f3ef] text-right font-medium">{shoe.last}</span>
                  </div>
                </div>
              </div>

              {/* Sizing & Width */}
              <div className="space-y-4 pt-4 border-t border-[#1f1f26]">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-[#f5f3ef] font-medium">
                        Select Size (EU)
                      </label>
                      {onOpenSizingGuide && (
                        <button
                          type="button"
                          onClick={onOpenSizingGuide}
                          className="text-[10px] text-[#c5a880] underline flex items-center gap-1"
                        >
                          <Ruler className="w-3 h-3" />
                          <span>Calculator</span>
                        </button>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8e8c85]">
                      True to Continental sizing
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5">
                    {shoe.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => {
                          sounds.playSoftClick();
                          setSelectedSize(sz);
                        }}
                        className={`py-2 text-xs font-mono tabular-nums rounded border transition-colors ${
                          selectedSize === sz
                            ? 'border-[#c5a880] bg-[#c5a880] text-[#0c0c0e] font-bold'
                            : 'border-[#22222b] bg-[#121216] text-[#a09e98] hover:border-[#333344]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#f5f3ef] font-medium block mb-2">
                    Fitting Width
                  </label>
                  <div className="flex gap-2">
                    {(['Standard (D)', 'Wide (EE)'] as const).map((w) => (
                      <button
                        key={w}
                        onClick={() => {
                          sounds.playSoftClick();
                          setSelectedWidth(w);
                        }}
                        className={`flex-1 py-2 text-xs rounded border transition-colors ${
                          selectedWidth === w
                            ? 'border-[#c5a880] bg-[#1a1713] text-[#f5f3ef]'
                            : 'border-[#22222b] bg-[#121216] text-[#8e8c85]'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAdd}
                  disabled={added}
                  className={`w-full py-4 text-xs uppercase tracking-[0.2em] font-semibold rounded transition-all duration-300 flex items-center justify-center gap-2 ${
                    added
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag (EU {selectedSize} · {activeColorway?.name})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    sounds.playSoftClick();
                    onOpenBespokeStudio(shoe);
                    onClose();
                  }}
                  className="w-full py-3 bg-[#141418] hover:bg-[#1a1a20] border border-[#2a2a35] text-[11px] uppercase tracking-[0.15em] text-[#a09e98] hover:text-[#f5f3ef] rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Customize in Bespoke Studio</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
