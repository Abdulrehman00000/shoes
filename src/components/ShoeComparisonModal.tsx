import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, ArrowRight, ShieldCheck, Scale } from 'lucide-react';
import { LUXURY_SHOES } from '../data/shoesData';
import { Shoe } from '../types/shoes';
import { sounds } from '../utils/audio';
import { CurrencyConfig, formatPrice } from '../utils/currency';

interface ShoeComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectShoeForBespoke: (shoe: Shoe) => void;
  onQuickAdd: (shoe: Shoe, size: number) => void;
  currency: CurrencyConfig;
}

export const ShoeComparisonModal: React.FC<ShoeComparisonModalProps> = ({
  isOpen,
  onClose,
  onSelectShoeForBespoke,
  onQuickAdd,
  currency,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    LUXURY_SHOES[0].id,
    LUXURY_SHOES[1].id,
  ]);

  if (!isOpen) return null;

  const comparedShoes = LUXURY_SHOES.filter((s) => selectedIds.includes(s.id));

  const toggleShoe = (shoeId: string) => {
    sounds.playSoftClick();
    if (selectedIds.includes(shoeId)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((id) => id !== shoeId));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, shoeId]);
      } else {
        setSelectedIds([selectedIds[1], selectedIds[2], shoeId]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative w-full max-w-5xl bg-[#0c0c0f] border border-[#272738] rounded-sm shadow-2xl z-10 text-[#f5f3ef] overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#1f1f2c] flex items-center justify-between bg-[#0e0e14]">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-[#c5a880]" />
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#f5f3ef]">
                Artisanal Head-to-Head Comparison
              </h3>
              <p className="text-xs text-[#8e8c85]">
                Evaluate lasting silhouette, leather pedigree, welt density, and bespoke labor hours.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8e8c85] hover:text-[#f5f3ef] transition-colors"
            aria-label="Close comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Model Chips Selector */}
        <div className="px-6 py-3.5 bg-[#121218] border-b border-[#1c1c26] flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8e8c85] mr-1 shrink-0">
            Select 2–3 Pairs:
          </span>
          {LUXURY_SHOES.map((shoe) => {
            const isSelected = selectedIds.includes(shoe.id);
            return (
              <button
                key={shoe.id}
                onClick={() => toggleShoe(shoe.id)}
                className={`px-3 py-1.5 rounded border text-xs whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'border-[#c5a880] bg-[#221f1a] text-[#f5f3ef] font-medium'
                    : 'border-[#262635] text-[#8e8c85] hover:text-[#f5f3ef] hover:border-[#38384a]'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: shoe.colorways[0]?.hex || '#c5a880' }}
                />
                <span>{shoe.name}</span>
                {isSelected && <Check className="w-3 h-3 text-[#c5a880]" />}
              </button>
            );
          })}
        </div>

        {/* Comparison Matrix Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className={`grid grid-cols-1 md:grid-cols-${comparedShoes.length} gap-6`}>
            {comparedShoes.map((shoe) => (
              <div
                key={shoe.id}
                className="bg-[#111116] border border-[#22222f] rounded p-5 flex flex-col justify-between space-y-5"
              >
                {/* Visual */}
                <div>
                  <div className="relative aspect-[4/3] rounded overflow-hidden bg-[#0c0c0e] border border-[#1f1f28] mb-3">
                    <img
                      src={shoe.image}
                      alt={shoe.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 text-[9px] uppercase tracking-[0.2em] bg-[#0c0c0e]/90 text-[#c5a880] px-2 py-0.5 border border-[#2b2b38]">
                      {shoe.categoryLabel}
                    </div>
                  </div>

                  <h4 className="font-serif text-lg text-[#f5f3ef]">{shoe.name}</h4>
                  <div className="font-mono tabular-nums text-lg text-[#c5a880] font-semibold mt-0.5">
                    {formatPrice(shoe.price, currency)}
                  </div>
                </div>

                {/* Specs List */}
                <div className="space-y-3 text-xs border-t border-[#1d1d28] pt-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#7e7c75] block">
                      Leather Hide
                    </span>
                    <span className="text-[#f5f3ef] font-medium">{shoe.leather}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#7e7c75] block">
                      Welt & Stitching
                    </span>
                    <span className="text-[#f5f3ef] font-medium">{shoe.construction}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#7e7c75] block">
                      Sole Specification
                    </span>
                    <span className="text-[#f5f3ef] font-medium">{shoe.sole}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#7e7c75] block">
                      Shoe Last Geometry
                    </span>
                    <span className="text-[#f5f3ef] font-medium">{shoe.last}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#7e7c75] block">
                      Single Master Labor
                    </span>
                    <span className="font-mono text-[#c5a880] font-semibold">
                      {shoe.artisanHours} Hours of Dedicated Craft
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#1d1d28] space-y-2">
                  <button
                    onClick={() => {
                      sounds.playLuxuryChime();
                      onQuickAdd(shoe, 42);
                    }}
                    className="w-full py-2.5 bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e] text-[11px] uppercase tracking-[0.15em] font-semibold rounded transition-colors"
                  >
                    Quick Add to Bag
                  </button>

                  <button
                    onClick={() => {
                      sounds.playSoftClick();
                      onSelectShoeForBespoke(shoe);
                      onClose();
                    }}
                    className="w-full py-2 bg-[#171720] hover:bg-[#20202c] border border-[#2b2b3b] text-[10px] uppercase tracking-[0.15em] text-[#a09e98] hover:text-[#f5f3ef] rounded transition-colors"
                  >
                    Customize in Studio
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
