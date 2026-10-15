import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle, Package } from 'lucide-react';
import { CartItem } from '../types/shoes';
import { sounds } from '../utils/audio';
import { CurrencyConfig, formatPrice } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderCompleted?: (orderId: string) => void;
  onOpenCheckoutModal?: () => void;
  currency?: CurrencyConfig;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderCompleted,
  onOpenCheckoutModal,
  currency,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientCity, setClientCity] = useState('');
  const [orderId, setOrderId] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.customPrice * item.quantity, 0);

  const handleStartCheckout = () => {
    sounds.playSoftClick();
    if (onOpenCheckoutModal) {
      onClose();
      onOpenCheckoutModal();
    } else {
      setCheckoutStep('checkout');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playLuxuryChime();
    const generatedId = `AV-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setCheckoutStep('confirmed');
    if (onOrderCompleted) {
      onOrderCompleted(generatedId);
    }
    onClearCart();
  };

  const handleResetAndClose = () => {
    setCheckoutStep('cart');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleResetAndClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
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
              <ShoppingBag className="w-4 h-4 text-[#c5a880]" />
              <h3 className="font-serif text-xl text-[#f5f3ef]">
                {checkoutStep === 'cart' && 'Your Shopping Bag'}
                {checkoutStep === 'checkout' && 'VIP Courier Dispatch'}
                {checkoutStep === 'confirmed' && 'Commission Confirmed'}
              </h3>
            </div>
            <button
              onClick={handleResetAndClose}
              className="p-1.5 text-[#8e8c85] hover:text-[#f5f3ef] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutStep === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <p className="font-serif text-lg text-[#8e8c85]">Your bag is currently empty.</p>
                    <p className="text-xs text-[#6e6c65]">Explore our permanent collection or configure a bespoke pair in the studio.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-[#121216] border border-[#1f1f26] rounded flex gap-4 items-start"
                      >
                        <img
                          src={item.shoe.image}
                          alt={item.shoe.name}
                          className="w-20 h-20 object-cover rounded bg-[#09090b] border border-[#2a2a38] shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-base text-[#f5f3ef] truncate">
                            {item.shoe.name}
                          </h4>
                          <div className="text-[11px] text-[#c5a880] mt-0.5 font-medium truncate">
                            Patina: {item.selectedColorway}
                          </div>
                          <div className="text-[10px] text-[#a09e98] mt-0.5 space-x-1">
                            <span>EU {item.size}</span>
                            <span>·</span>
                            <span>{item.width}</span>
                          </div>
                          {item.monogram && item.monogram !== 'None' && (
                            <div className="text-[10px] text-[#d8ba8d] mt-0.5 font-mono">
                              Stamp: {item.monogram}
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1b1b22]">
                            <div className="font-mono tabular-nums text-xs text-[#f5f3ef] font-semibold">
                              {formatPrice(item.customPrice * item.quantity, currency)}
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex items-center border border-[#2a2a35] rounded text-xs">
                                <button
                                  onClick={() => {
                                    sounds.playSoftClick();
                                    onUpdateQuantity(item.id, Math.max(1, item.quantity - 1));
                                  }}
                                  className="px-2 py-0.5 text-[#8e8c85] hover:text-[#f5f3ef]"
                                >
                                  -
                                </button>
                                <span className="px-2 font-mono tabular-nums text-[#f5f3ef]">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => {
                                    sounds.playSoftClick();
                                    onUpdateQuantity(item.id, item.quantity + 1);
                                  }}
                                  className="px-2 py-0.5 text-[#8e8c85] hover:text-[#f5f3ef]"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() => {
                                  sounds.playSoftClick();
                                  onRemoveItem(item.id);
                                }}
                                className="text-[#6e6c65] hover:text-rose-400 transition-colors p-1"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'checkout' && (
              <form id="checkout-form" onSubmit={handleCompleteOrder} className="space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-medium">
                  Client Information
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.1em] text-[#8e8c85] mb-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Lord Alistair Sterling"
                    className="w-full px-3 py-2 bg-[#121216] border border-[#262632] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.1em] text-[#8e8c85] mb-1">
                    Direct Email
                  </label>
                  <input
                    required
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="alistair@sterling-holdings.co.uk"
                    className="w-full px-3 py-2 bg-[#121216] border border-[#262632] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.1em] text-[#8e8c85] mb-1">
                    Courier Delivery Address
                  </label>
                  <input
                    required
                    type="text"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="14 Berkeley Square, Mayfair"
                    className="w-full px-3 py-2 bg-[#121216] border border-[#262632] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.1em] text-[#8e8c85] mb-1">
                    City & Postal Code
                  </label>
                  <input
                    required
                    type="text"
                    value={clientCity}
                    onChange={(e) => setClientCity(e.target.value)}
                    placeholder="London W1J 5AW"
                    className="w-full px-3 py-2 bg-[#121216] border border-[#262632] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-[11px] uppercase tracking-[0.1em] text-[#8e8c85] mb-1.5">
                    Payment Preference
                  </label>
                  <div className="p-3 bg-[#121216] border border-[#262632] rounded text-xs text-[#b8b5ad] space-y-1">
                    <div className="text-[#c5a880] font-medium">Bespoke Concierge Direct Invoice</div>
                    <div className="text-[11px] text-[#7e7c75]">
                      Our private banker will dispatch a verified secure payment link with insured escrow coverage.
                    </div>
                  </div>
                </div>
              </form>
            )}

            {checkoutStep === 'confirmed' && (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#1b1915] border border-[#c5a880] flex items-center justify-center text-[#c5a880]">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#c5a880]">
                    Commission Accepted
                  </div>
                  <h4 className="font-serif text-2xl text-[#f5f3ef] mt-1">
                    Order #{orderId}
                  </h4>
                </div>

                <p className="text-xs text-[#a09e98] leading-relaxed max-w-xs mx-auto">
                  Thank you, <span className="text-[#f5f3ef] font-medium">{clientName || 'valued client'}</span>. Our master cordwainer has registered your commission. A leather dossier has been dispatched to your email.
                </p>

                <div className="p-4 bg-[#121216] border border-[#1f1f26] rounded text-left text-xs space-y-1 text-[#8e8c85]">
                  <div>Destination: <span className="text-[#f5f3ef]">{clientCity || 'London'}</span></div>
                  <div>Estimated Hand-Finishing: <span className="text-[#c5a880]">14 Business Days</span></div>
                  <div>Courier: <span className="text-[#f5f3ef]">Ferrari Security & Express Air</span></div>
                </div>

                <button
                  onClick={handleResetAndClose}
                  className="w-full py-3 bg-[#1e1e26] hover:bg-[#282835] text-xs uppercase tracking-[0.15em] text-[#f5f3ef] rounded transition-colors"
                >
                  Return to Atelier
                </button>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {checkoutStep !== 'confirmed' && items.length > 0 && (
            <div className="p-6 border-t border-[#1f1f26] bg-[#0c0c0e] space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-[0.15em] text-[#8e8c85]">
                  Subtotal
                </span>
                <span className="font-mono tabular-nums text-xl font-medium text-[#f5f3ef]">
                  {formatPrice(subtotal, currency)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#7e7c75]">
                <Package className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Complimentary insured air courier worldwide</span>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={handleStartCheckout}
                  className="w-full py-4 bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e] text-xs uppercase tracking-[0.2em] font-semibold rounded transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Proceed to Commission</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="py-3 px-4 border border-[#2a2a35] text-xs uppercase tracking-[0.1em] text-[#8e8c85] rounded"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 py-3 bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e] text-xs uppercase tracking-[0.2em] font-semibold rounded transition-all"
                  >
                    Authorize Commission
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
