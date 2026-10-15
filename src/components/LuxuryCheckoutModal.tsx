import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  Check, 
  Sparkles, 
  Building2, 
  Smartphone, 
  FileCheck, 
  ArrowRight,
  Download,
  ExternalLink,
  Crown
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { CartItem } from '../types/shoes';
import { CurrencyConfig, formatPrice } from '../utils/currency';

interface LuxuryCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  onOrderSuccess: (orderId: string, clientDetails: { name: string; email: string; city: string }) => void;
  onOpenPortalWithOrder: (orderId: string) => void;
  currency?: CurrencyConfig;
}

type PaymentTab = 'card' | 'applepay' | 'wire' | 'invoice';

export const LuxuryCheckoutModal: React.FC<LuxuryCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  onOrderSuccess,
  onOpenPortalWithOrder,
  currency,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'confirmed'>('details');
  const [paymentTab, setPaymentTab] = useState<PaymentTab>('card');

  // Client details
  const [clientName, setClientName] = useState('Lord Alistair Sterling');
  const [clientEmail, setClientEmail] = useState('alistair@sterling-holdings.co.uk');
  const [clientAddress, setClientAddress] = useState('14 Berkeley Square, Mayfair');
  const [clientCity, setClientCity] = useState('London W1J 5AW');
  const [salutation, setSalutation] = useState('Lord');

  // Card details for 3D card
  const [cardNumber, setCardNumber] = useState('4829 9102 7834 1928');
  const [cardExpiry, setCardExpiry] = useState('12/29');
  const [cardCvv, setCardCvv] = useState('883');
  const [isFlipped, setIsFlipped] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSoftClick();
    setStep('payment');
  };

  const handleAuthorizePayment = () => {
    sounds.playLuxuryChime();
    setStep('processing');

    const generatedId = `AV-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      setConfirmedOrderId(generatedId);
      setStep('confirmed');
      sounds.playLuxuryChime();
      onOrderSuccess(generatedId, {
        name: clientName,
        email: clientEmail,
        city: clientCity,
      });
    }, 1800);
  };

  const handleTrackInPortal = () => {
    sounds.playSoftClick();
    onClose();
    onOpenPortalWithOrder(confirmedOrderId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Dimmed backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={step === 'confirmed' ? onClose : undefined}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Main Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative w-full max-w-3xl bg-[#0c0c0f] border border-[#262635] rounded-sm shadow-2xl z-10 text-[#f5f3ef] overflow-hidden"
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-[#1f1f2a] flex items-center justify-between bg-[#0e0e13]">
          <div className="flex items-center gap-3">
            <Crown className="w-4 h-4 text-[#c5a880]" />
            <h3 className="font-serif text-xl text-[#f5f3ef]">
              {step === 'details' && 'Bespoke Courier Dispatch'}
              {step === 'payment' && 'Secured Sovereign Payment'}
              {step === 'processing' && 'Authorizing Commission...'}
              {step === 'confirmed' && 'Commission Sealed & Registered'}
            </h3>
          </div>
          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-1.5 text-[#8e8c85] hover:text-[#f5f3ef] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {/* STEP 1: CLIENT DETAILS */}
            {step === 'details' && (
              <motion.form
                key="step-details"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleDetailsSubmit}
                className="space-y-6"
              >
                <div className="flex items-center justify-between text-xs text-[#8e8c85] pb-3 border-b border-[#1c1c24]">
                  <span>Step 1 of 2: Recipient Dossier</span>
                  <span className="font-mono tabular-nums text-[#c5a880] font-semibold">
                    {formatPrice(subtotal, currency)} Valuation
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-3">
                    <label className="block text-[10px] uppercase tracking-[0.15em] text-[#8e8c85] mb-1">
                      Salutation
                    </label>
                    <select
                      value={salutation}
                      onChange={(e) => setSalutation(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#121217] border border-[#242432] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
                    >
                      <option value="Lord">Lord</option>
                      <option value="Monsieur">Monsieur</option>
                      <option value="Baron">Baron</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Sir">Sir</option>
                      <option value="Madame">Madame</option>
                    </select>
                  </div>

                  <div className="sm:col-span-9">
                    <label className="block text-[10px] uppercase tracking-[0.15em] text-[#8e8c85] mb-1">
                      Full Client Name
                    </label>
                    <input
                      required
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Alistair Sterling"
                      className="w-full px-3.5 py-2.5 bg-[#121217] border border-[#242432] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] text-[#8e8c85] mb-1">
                      Private Email (For Workshop Dossier)
                    </label>
                    <input
                      required
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="client@vendome-private.com"
                      className="w-full px-3.5 py-2.5 bg-[#121217] border border-[#242432] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] text-[#8e8c85] mb-1">
                      City & Postal Code
                    </label>
                    <input
                      required
                      type="text"
                      value={clientCity}
                      onChange={(e) => setClientCity(e.target.value)}
                      placeholder="London W1J 5AW"
                      className="w-full px-3.5 py-2.5 bg-[#121217] border border-[#242432] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-[#8e8c85] mb-1">
                    Insured Courier Delivery Address
                  </label>
                  <input
                    required
                    type="text"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="14 Berkeley Square, Mayfair"
                    className="w-full px-3.5 py-2.5 bg-[#121217] border border-[#242432] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#1c1c24]">
                  <div className="flex items-center gap-2 text-xs text-[#7e7c75]">
                    <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                    <span>Ferrari Courier Insured Vault Transit</span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e] text-xs uppercase tracking-[0.2em] font-semibold rounded transition-all flex items-center gap-2 shadow-lg"
                  >
                    <span>Proceed to Sovereign Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* STEP 2: 3D ANIMATED LUXURY PAYMENT METHOD */}
            {step === 'payment' && (
              <motion.div
                key="step-payment"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                {/* Payment Method Selector Tabs */}
                <div className="grid grid-cols-4 gap-2 p-1.5 bg-[#121218] border border-[#22222f] rounded">
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playSoftClick();
                      setPaymentTab('card');
                    }}
                    className={`py-2 text-[11px] uppercase tracking-[0.1em] rounded transition-all flex items-center justify-center gap-1.5 ${
                      paymentTab === 'card'
                        ? 'bg-[#222230] text-[#c5a880] font-medium shadow-sm'
                        : 'text-[#8e8c85] hover:text-[#f5f3ef]'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Black Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sounds.playSoftClick();
                      setPaymentTab('applepay');
                    }}
                    className={`py-2 text-[11px] uppercase tracking-[0.1em] rounded transition-all flex items-center justify-center gap-1.5 ${
                      paymentTab === 'applepay'
                        ? 'bg-[#222230] text-[#c5a880] font-medium shadow-sm'
                        : 'text-[#8e8c85] hover:text-[#f5f3ef]'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sounds.playSoftClick();
                      setPaymentTab('wire');
                    }}
                    className={`py-2 text-[11px] uppercase tracking-[0.1em] rounded transition-all flex items-center justify-center gap-1.5 ${
                      paymentTab === 'wire'
                        ? 'bg-[#222230] text-[#c5a880] font-medium shadow-sm'
                        : 'text-[#8e8c85] hover:text-[#f5f3ef]'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Swiss Wire</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sounds.playSoftClick();
                      setPaymentTab('invoice');
                    }}
                    className={`py-2 text-[11px] uppercase tracking-[0.1em] rounded transition-all flex items-center justify-center gap-1.5 ${
                      paymentTab === 'invoice'
                        ? 'bg-[#222230] text-[#c5a880] font-medium shadow-sm'
                        : 'text-[#8e8c85] hover:text-[#f5f3ef]'
                    }`}
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>VIP Invoice</span>
                  </button>
                </div>

                {/* 3D LUXURY CENTURION CARD ANIMATION */}
                {paymentTab === 'card' && (
                  <div className="space-y-6">
                    {/* 3D Flip Card Container with Perspective */}
                    <div className="flex justify-center py-2" style={{ perspective: 1000 }}>
                      <motion.div
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformStyle: 'preserve-3d' }}
                        className="relative w-80 sm:w-96 h-52 rounded-xl shadow-2xl cursor-pointer select-none"
                        onClick={() => {
                          sounds.playSoftClick();
                          setIsFlipped(!isFlipped);
                        }}
                      >
                        {/* FRONT OF THE 3D CARD */}
                        <div
                          style={{ backfaceVisibility: 'hidden' }}
                          className="absolute inset-0 rounded-xl p-6 bg-gradient-to-br from-[#1b1b22] via-[#0d0d12] to-[#16161d] border border-[#c5a880]/60 shadow-xl flex flex-col justify-between overflow-hidden"
                        >
                          {/* Shimmer holographic stripe */}
                          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[radial-gradient(ellipse,_rgba(197,168,128,0.2),_transparent_70%)] pointer-events-none" />

                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <Crown className="w-4 h-4 text-[#c5a880]" />
                              <span className="font-serif text-sm tracking-wider text-[#c5a880] uppercase">
                                Atelier Vendôme
                              </span>
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-[#8e8c85] font-mono">
                              Black Sovereign
                            </span>
                          </div>

                          {/* 3D Gold Microchip */}
                          <div className="w-11 h-8 rounded bg-gradient-to-tr from-[#a7885d] to-[#e6d3b3] border border-[#f5f3ef]/40 relative overflow-hidden shadow-inner flex items-center justify-center">
                            <div className="w-7 h-5 border border-black/30 rounded-sm" />
                          </div>

                          <div>
                            {/* Card Number */}
                            <div className="font-mono text-base tracking-[0.25em] text-[#f5f3ef] drop-shadow-md">
                              {cardNumber || '•••• •••• •••• ••••'}
                            </div>

                            <div className="flex justify-between items-end mt-3 text-xs">
                              <div>
                                <div className="text-[8px] uppercase tracking-widest text-[#7e7c75]">
                                  Cardholder
                                </div>
                                <div className="font-serif text-sm tracking-wide text-[#e6d3b3]">
                                  {clientName.toUpperCase()}
                                </div>
                              </div>

                              <div className="text-right">
                                <div className="text-[8px] uppercase tracking-widest text-[#7e7c75]">
                                  Expires
                                </div>
                                <div className="font-mono text-xs text-[#e6d3b3]">
                                  {cardExpiry}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* BACK OF THE 3D CARD */}
                        <div
                          style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                          }}
                          className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#121218] via-[#09090c] to-[#16161e] border border-[#c5a880]/50 shadow-xl flex flex-col justify-between py-6 overflow-hidden"
                        >
                          {/* Black Magnetic Stripe */}
                          <div className="w-full h-10 bg-black/90 border-y border-[#262635] mt-1" />

                          <div className="px-6 flex items-center justify-between">
                            <div className="w-3/4 h-7 bg-white/10 rounded-sm flex items-center justify-end pr-3 border border-white/10">
                              <span className="font-mono text-xs text-[#c5a880] tracking-widest font-bold">
                                {cardCvv}
                              </span>
                            </div>
                            <span className="text-[9px] uppercase tracking-wider text-[#7e7c75]">
                              CVV
                            </span>
                          </div>

                          <div className="px-6 text-[8px] text-[#555] uppercase tracking-widest text-center">
                            Authorized signature only · Issued exclusively by Atelier Vendôme Private Banking
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          sounds.playSoftClick();
                          setIsFlipped(!isFlipped);
                        }}
                        className="text-[11px] text-[#c5a880] hover:text-[#d8ba8d] tracking-[0.1em] uppercase underline underline-offset-4"
                      >
                        {isFlipped ? 'Flip to Front View' : 'Flip to Inspect Back / CVV Security'}
                      </button>
                    </div>

                    {/* Card Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                      <div className="sm:col-span-6">
                        <label className="block text-[10px] uppercase tracking-[0.15em] text-[#8e8c85] mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4829 9102 7834 1928"
                          className="w-full px-3 py-2 bg-[#121217] border border-[#242432] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] font-mono outline-none"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[10px] uppercase tracking-[0.15em] text-[#8e8c85] mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/29"
                          className="w-full px-3 py-2 bg-[#121217] border border-[#242432] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] font-mono outline-none"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[10px] uppercase tracking-[0.15em] text-[#8e8c85] mb-1">
                          Security CVV
                        </label>
                        <input
                          type="text"
                          value={cardCvv}
                          onFocus={() => setIsFlipped(true)}
                          onBlur={() => setIsFlipped(false)}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="883"
                          className="w-full px-3 py-2 bg-[#121217] border border-[#242432] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] font-mono outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* OTHER PAYMENT MODES */}
                {paymentTab === 'applepay' && (
                  <div className="p-6 bg-[#111116] border border-[#22222d] rounded text-center space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#1c1c24] flex items-center justify-center text-[#f5f3ef]">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-[#f5f3ef]">Apple Pay Biometric Checkout</h4>
                      <p className="text-xs text-[#8e8c85] max-w-sm mx-auto mt-1">
                        Authenticate instantaneously using Face ID / Touch ID securely encrypted with tokenized enclave keys.
                      </p>
                    </div>
                    <div className="font-mono text-xl text-[#c5a880] tabular-nums font-semibold">
                      {formatPrice(subtotal, currency)}
                    </div>
                  </div>
                )}

                {paymentTab === 'wire' && (
                  <div className="p-5 bg-[#111116] border border-[#22222d] rounded space-y-3 text-xs">
                    <div className="text-[11px] uppercase tracking-[0.15em] text-[#c5a880] font-medium">
                      Sovereign Wire Details (Pictet & Cie, Geneva)
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[#a09e98]">
                      <div>IBAN: <span className="font-mono text-[#f5f3ef]">CH93 0076 2011 6238 5200</span></div>
                      <div>BIC / SWIFT: <span className="font-mono text-[#f5f3ef]">PICTCHGGXXX</span></div>
                      <div>Beneficiary: <span className="text-[#f5f3ef]">Atelier Vendôme Haute Cordonnerie</span></div>
                      <div>Reference: <span className="font-mono text-[#c5a880]">AV-BESPOKE-HOLD</span></div>
                    </div>
                  </div>
                )}

                {paymentTab === 'invoice' && (
                  <div className="p-5 bg-[#111116] border border-[#22222d] rounded space-y-2 text-xs text-[#8e8c85]">
                    <div className="text-[#c5a880] font-medium uppercase tracking-[0.15em] text-[11px]">
                      Private Concierge Direct Invoice
                    </div>
                    <p>
                      An encrypted diplomatic pro-forma invoice will be transmitted to <strong className="text-[#f5f3ef]">{clientEmail}</strong> with NET 30 terms upon bespoke last carving approval.
                    </p>
                  </div>
                )}

                {/* Authorization Buttons */}
                <div className="pt-4 flex items-center justify-between border-t border-[#1c1c24]">
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playSoftClick();
                      setStep('details');
                    }}
                    className="text-xs uppercase tracking-[0.1em] text-[#8e8c85] hover:text-[#f5f3ef] py-2"
                  >
                    ← Back to Recipient
                  </button>

                  <button
                    type="button"
                    onClick={handleAuthorizePayment}
                    className="px-8 py-3.5 bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e] text-xs uppercase tracking-[0.2em] font-semibold rounded transition-all shadow-xl flex items-center gap-2 hover:shadow-[#c5a880]/20"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authorize {formatPrice(subtotal, currency)}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: PROCESSING ANIMATION */}
            {step === 'processing' && (
              <motion.div
                key="step-processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center space-y-4"
              >
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 border-[#2a2a38]" />
                  <div className="absolute inset-0 rounded-full border-2 border-[#c5a880] border-t-transparent animate-spin" />
                  <Crown className="w-6 h-6 text-[#c5a880] absolute inset-0 m-auto" />
                </div>
                <h4 className="font-serif text-2xl text-[#f5f3ef]">
                  Engraving Atelier Records...
                </h4>
                <p className="text-xs text-[#8e8c85]">
                  Verifying vault settlement and allocating master craftsman at Place Vendôme.
                </p>
              </motion.div>
            )}

            {/* STEP 4: 3D GOLD WAX SEAL ORDER CONFIRMATION & ORDER MESSAGE */}
            {step === 'confirmed' && (
              <motion.div
                key="step-confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="py-4 space-y-6"
              >
                {/* 3D Wax Seal Animation */}
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 100 }}
                    className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#947346] via-[#c5a880] to-[#f0e2cd] p-1 shadow-2xl flex items-center justify-center mb-3"
                  >
                    <div className="w-full h-full rounded-full bg-[#111115] border border-[#c5a880] flex flex-col items-center justify-center text-[#c5a880]">
                      <Crown className="w-6 h-6 mb-0.5" />
                      <span className="text-[8px] uppercase tracking-widest font-serif font-bold">
                        SEALED
                      </span>
                    </div>
                  </motion.div>

                  <div className="text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-medium">
                    Commission Confirmed & Registered
                  </div>
                  <h3 className="font-serif text-3xl text-[#f5f3ef] mt-1">
                    Order Reference #{confirmedOrderId}
                  </h3>
                </div>

                {/* Personalized Luxury Order Message */}
                <div className="p-6 bg-[#111116] border border-[#242432] rounded-sm space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Crown className="w-24 h-24 text-[#c5a880]" />
                  </div>

                  <p className="font-serif text-base text-[#f5f3ef] italic leading-relaxed">
                    “Dear {salutation} {clientName},<br />
                    It is our distinct honor to receive your commission. A dedicated pair of French hornbeam lasts has been retrieved from our archive in Place Vendôme. Your footwear has entered Stage 01: Leather Selection & Clicker’s Cut under master cordwainer Laurent Moreau.”
                  </p>

                  <div className="pt-3 border-t border-[#1e1e28] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#8e8c85]">
                    <div>
                      <span className="text-[10px] uppercase text-[#6e6c65] block">Total Settled</span>
                      <span className="font-mono tabular-nums text-[#f5f3ef] font-semibold">{formatPrice(subtotal, currency)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#6e6c65] block">Destination</span>
                      <span className="text-[#f5f3ef]">{clientCity}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#6e6c65] block">Hand-Finishing Period</span>
                      <span className="text-[#c5a880]">14–18 Days</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons to Track in Portal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleTrackInPortal}
                    className="py-4 bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e] text-xs uppercase tracking-[0.2em] font-semibold rounded transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Track in Client Order Portal</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onClose}
                    className="py-4 bg-[#141419] hover:bg-[#1f1f28] border border-[#2a2a3a] text-xs uppercase tracking-[0.15em] text-[#f5f3ef] font-medium rounded transition-colors"
                  >
                    Return to Atelier
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
