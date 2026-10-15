import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler, Check, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SizingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRecommendedSize?: (size: number, width: 'Standard (D)' | 'Wide (EE)') => void;
}

export const SizingGuideModal: React.FC<SizingGuideModalProps> = ({
  isOpen,
  onClose,
  onApplyRecommendedSize,
}) => {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [footLength, setFootLength] = useState<number>(27.0);
  const [archType, setArchType] = useState<'regular' | 'high' | 'flat'>('regular');
  const [footWidth, setFootWidth] = useState<'standard' | 'wide'>('standard');

  if (!isOpen) return null;

  // Convert length to EU shoe size:
  // EU size roughly = (length_cm + 1.5) * 1.5
  const lengthInCm = unit === 'in' ? footLength * 2.54 : footLength;
  let calculatedEu = Math.round(((lengthInCm + 1.2) * 1.5) * 2) / 2;
  calculatedEu = Math.max(39, Math.min(46.5, calculatedEu));

  const calculatedUk = (calculatedEu - 33).toFixed(1);
  const calculatedUs = (calculatedEu - 32).toFixed(1);

  // Recommended Last
  let recommendedLast = 'Vendôme Chiseled Soft-Square Last #7';
  if (archType === 'high') {
    recommendedLast = 'Mayfair Elongated Chisel Last #11 (High Instep)';
  } else if (footWidth === 'wide' || archType === 'flat') {
    recommendedLast = 'Parisian Classical Round Last #3 (Generous Forefoot)';
  }

  const handleApply = () => {
    sounds.playLuxuryChime();
    if (onApplyRecommendedSize) {
      onApplyRecommendedSize(calculatedEu, footWidth === 'wide' ? 'Wide (EE)' : 'Standard (D)');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
        className="relative w-full max-w-2xl bg-[#0c0c0f] border border-[#272738] rounded-sm shadow-2xl z-10 text-[#f5f3ef] overflow-hidden"
      >
        <div className="p-6 border-b border-[#1f1f2c] flex items-center justify-between bg-[#0e0e14]">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-[#c5a880]" />
            <div>
              <h3 className="font-serif text-xl text-[#f5f3ef]">
                Digital Foot Fit & Bespoke Last Calculator
              </h3>
              <p className="text-xs text-[#8e8c85]">
                Calibrated to Place Vendôme anatomical hornbeam wooden master lasts.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8e8c85] hover:text-[#f5f3ef] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Foot Length Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="uppercase tracking-[0.15em] text-[#8e8c85] font-medium">
                  Heel-to-Toe Length
                </label>
                <div className="flex gap-1 bg-[#14141c] p-0.5 rounded border border-[#22222f]">
                  <button
                    onClick={() => {
                      sounds.playSoftClick();
                      setUnit('cm');
                    }}
                    className={`px-2 py-0.5 text-[10px] rounded ${
                      unit === 'cm' ? 'bg-[#c5a880] text-black font-semibold' : 'text-[#888]'
                    }`}
                  >
                    CM
                  </button>
                  <button
                    onClick={() => {
                      sounds.playSoftClick();
                      setUnit('in');
                      setFootLength(Number((footLength / 2.54).toFixed(1)));
                    }}
                    className={`px-2 py-0.5 text-[10px] rounded ${
                      unit === 'in' ? 'bg-[#c5a880] text-black font-semibold' : 'text-[#888]'
                    }`}
                  >
                    IN
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={unit === 'cm' ? 24.5 : 9.5}
                  max={unit === 'cm' ? 30.5 : 12.0}
                  step={unit === 'cm' ? 0.2 : 0.1}
                  value={footLength}
                  onChange={(e) => setFootLength(parseFloat(e.target.value))}
                  className="w-full accent-[#c5a880] bg-[#1a1a24] cursor-pointer"
                />
                <span className="font-mono text-base font-bold text-[#f5f3ef] w-16 text-right shrink-0">
                  {footLength} {unit}
                </span>
              </div>
            </div>

            {/* Arch Profile */}
            <div className="space-y-2">
              <label className="block uppercase tracking-[0.15em] text-[#8e8c85] text-xs font-medium">
                Arch / Instep Profile
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['regular', 'high', 'flat'] as const).map((arch) => (
                  <button
                    key={arch}
                    onClick={() => {
                      sounds.playSoftClick();
                      setArchType(arch);
                    }}
                    className={`py-2 text-xs capitalize rounded border transition-colors ${
                      archType === arch
                        ? 'border-[#c5a880] bg-[#1c1914] text-[#f5f3ef] font-medium'
                        : 'border-[#22222f] bg-[#121217] text-[#888]'
                    }`}
                  >
                    {arch}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Width selection */}
          <div className="space-y-2">
            <label className="block uppercase tracking-[0.15em] text-[#8e8c85] text-xs font-medium">
              Forefoot Width
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  sounds.playSoftClick();
                  setFootWidth('standard');
                }}
                className={`p-3 text-left rounded border transition-colors ${
                  footWidth === 'standard'
                    ? 'border-[#c5a880] bg-[#1c1914] text-[#f5f3ef]'
                    : 'border-[#22222f] bg-[#121217] text-[#888]'
                }`}
              >
                <div className="font-medium text-xs">Standard (D) Width</div>
                <div className="text-[10px] text-[#7e7c75] mt-0.5">Classic balance for 85% of gentleman feet</div>
              </button>

              <button
                onClick={() => {
                  sounds.playSoftClick();
                  setFootWidth('wide');
                }}
                className={`p-3 text-left rounded border transition-colors ${
                  footWidth === 'wide'
                    ? 'border-[#c5a880] bg-[#1c1914] text-[#f5f3ef]'
                    : 'border-[#22222f] bg-[#121217] text-[#888]'
                }`}
              >
                <div className="font-medium text-xs">Wide (EE) Comfort Width</div>
                <div className="text-[10px] text-[#7e7c75] mt-0.5">+4mm ball girth with beveled arch containment</div>
              </button>
            </div>
          </div>

          {/* Recommendation Output Display */}
          <div className="p-5 bg-[#121217] border border-[#c5a880]/50 rounded space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#222230] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880]">
                  Your Anatomical Recommendation
                </span>
                <div className="font-serif text-2xl text-[#f5f3ef] mt-0.5">
                  Size EU {calculatedEu} ({footWidth === 'wide' ? 'EE Wide' : 'D Standard'})
                </div>
              </div>

              <div className="flex gap-4 font-mono text-xs text-[#a09e98]">
                <div>UK: <span className="text-[#f5f3ef] font-bold">{calculatedUk}</span></div>
                <div>US: <span className="text-[#f5f3ef] font-bold">{calculatedUs}</span></div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-[#a09e98]">
              <Sparkles className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
              <span>
                <strong>Matching Wooden Last:</strong> {recommendedLast}. Provides precise medial arch support and zero heel slip.
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="py-3 px-5 border border-[#2b2b3b] text-xs uppercase tracking-[0.1em] text-[#8e8c85] rounded"
            >
              Close
            </button>
            <button
              onClick={handleApply}
              className="flex-1 py-3 bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e] text-xs uppercase tracking-[0.15em] font-semibold rounded transition-colors flex items-center justify-center gap-2"
            >
              <span>Apply Size EU {calculatedEu}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
