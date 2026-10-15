import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Shoe } from '../types/shoes';
import { sounds } from '../utils/audio';
import { CurrencyConfig, formatPrice } from '../utils/currency';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Shoe[];
  onRemoveFromWishlist: (shoeId: string) => void;
  onQuickAdd: (shoe: Shoe, size: number) => void;
  onQuickView: (shoe: Shoe) => void;
  currency: CurrencyConfig;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onQuickAdd,
  onQuickView,
  currency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-screen max-w-md bg-[#0d0d10] border-l border-[#242430] shadow-2xl flex flex-col text-[#f5f3ef]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#1f1f26] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-[#c5a880] fill-[#c5a880]" />
              <h3 className="font-serif text-xl text-[#f5f3ef]">
                Saved Commission Wishes ({wishlist.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8e8c85] hover:text-[#f5f3ef] transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="py-24 text-center space-y-3">
                <Heart className="w-10 h-10 mx-auto text-[#3a3a48]" />
                <p className="font-serif text-lg text-[#8e8c85]">Your private wish list is empty.</p>
                <p className="text-xs text-[#6e6c65] max-w-xs mx-auto">
                  Click the heart icon on any shoe in the collection to reserve it in your private consideration archive.
                </p>
              </div>
            ) : (
              wishlist.map((shoe) => (
                <div
                  key={shoe.id}
                  className="p-4 bg-[#121216] border border-[#1f1f26] hover:border-[#2f2f3d] rounded flex gap-4 items-center transition-all"
                >
                  <img
                    src={shoe.image}
                    alt={shoe.name}
                    className="w-20 h-16 object-cover rounded bg-[#09090b] border border-[#22222b] shrink-0 cursor-pointer"
                    onClick={() => {
                      onQuickView(shoe);
                      onClose();
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#c5a880]">
                      {shoe.categoryLabel}
                    </div>
                    <h4
                      onClick={() => {
                        onQuickView(shoe);
                        onClose();
                      }}
                      className="font-serif text-sm text-[#f5f3ef] truncate cursor-pointer hover:text-[#c5a880] transition-colors"
                    >
                      {shoe.name}
                    </h4>
                    <div className="font-mono tabular-nums text-xs font-semibold text-[#f5f3ef] mt-0.5">
                      {formatPrice(shoe.price, currency)}
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#1c1c24]">
                      <button
                        onClick={() => {
                          sounds.playLuxuryChime();
                          onQuickAdd(shoe, 42);
                        }}
                        className="px-2.5 py-1 bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e] text-[10px] uppercase tracking-[0.15em] font-semibold rounded transition-colors flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>

                      <button
                        onClick={() => {
                          sounds.playSoftClick();
                          onQuickView(shoe);
                          onClose();
                        }}
                        className="px-2.5 py-1 bg-[#191922] hover:bg-[#252532] text-[#a09e98] hover:text-[#f5f3ef] text-[10px] uppercase tracking-[0.1em] rounded transition-colors"
                      >
                        Inspect
                      </button>

                      <button
                        onClick={() => {
                          sounds.playSoftClick();
                          onRemoveFromWishlist(shoe.id);
                        }}
                        className="text-[#6e6c65] hover:text-rose-400 p-1 ml-auto"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-6 border-t border-[#1f1f26] bg-[#0c0c0e] text-center">
              <p className="text-[11px] text-[#7e7c75] mb-3">
                Saved pieces retain priority hide allocation at our Place Vendôme workbench.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#171720] hover:bg-[#22222e] border border-[#2b2b3b] text-xs uppercase tracking-[0.15em] text-[#f5f3ef] rounded transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
