import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DynamicShowcase } from './components/DynamicShowcase';
import { BespokeStudio } from './components/BespokeStudio';
import { Catalog } from './components/Catalog';
import { ShopTheLook } from './components/ShopTheLook';
import { ShoeCareMasterclass } from './components/ShoeCareMasterclass';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { ClientOrderPortal } from './components/ClientOrderPortal';
import { BespokeConcierge } from './components/BespokeConcierge';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { LuxuryCheckoutModal } from './components/LuxuryCheckoutModal';
import { VipConciergeChat } from './components/VipConciergeChat';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ShoeComparisonModal } from './components/ShoeComparisonModal';
import { SizingGuideModal } from './components/SizingGuideModal';
import { Footer } from './components/Footer';
import { Shoe, CartItem, Colorway } from './types/shoes';
import { LUXURY_SHOES } from './data/shoesData';
import { Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sounds } from './utils/audio';
import { CURRENCIES, CurrencyConfig } from './utils/currency';

export default function App() {
  const [currency, setCurrency] = useState<CurrencyConfig>(CURRENCIES.USD);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-sample-1',
      shoeId: LUXURY_SHOES[0].id,
      shoe: LUXURY_SHOES[0],
      size: 42,
      width: 'Standard (D)',
      selectedColorway: 'Nero Obsidian Glaze',
      monogram: 'AV (24k Gold)',
      soleFinish: 'J&FJ Baker Oak Bark Leather Sole',
      quantity: 1,
      customPrice: 1850,
    },
  ]);

  const [wishlist, setWishlist] = useState<Shoe[]>([
    LUXURY_SHOES[0],
    LUXURY_SHOES[2],
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isSizingGuideOpen, setIsSizingGuideOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [quickViewShoe, setQuickViewShoe] = useState<Shoe | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [latestOrderId, setLatestOrderId] = useState<string>('AV-849201');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleWishlist = (shoe: Shoe) => {
    setWishlist((prev) => {
      const exists = prev.some((s) => s.id === shoe.id);
      if (exists) {
        showToast(`Removed ${shoe.name} from Saved Commissions`);
        return prev.filter((s) => s.id !== shoe.id);
      } else {
        showToast(`Saved ${shoe.name} to Private Wishlist`);
        return [...prev, shoe];
      }
    });
  };

  const handleQuickAdd = (
    shoe: Shoe,
    size: number,
    colorway?: Colorway
  ) => {
    const chosenColorway = colorway || shoe.colorways[0];
    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random()}`,
      shoeId: shoe.id,
      shoe: {
        ...shoe,
        image: chosenColorway?.image || shoe.image,
      },
      size,
      width: 'Standard (D)',
      selectedColorway: chosenColorway?.name || 'Standard Patina',
      quantity: 1,
      customPrice: shoe.price,
    };
    setCartItems((prev) => [newItem, ...prev]);
    showToast(`Added ${shoe.name} · ${chosenColorway?.name || ''} (EU ${size}) to Bag`);
  };

  const handleAddToCartWithWidth = (
    shoe: Shoe,
    size: number,
    width: 'Standard (D)' | 'Wide (EE)',
    colorway?: Colorway
  ) => {
    const chosenColorway = colorway || shoe.colorways[0];
    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random()}`,
      shoeId: shoe.id,
      shoe: {
        ...shoe,
        image: chosenColorway?.image || shoe.image,
      },
      size,
      width,
      selectedColorway: chosenColorway?.name || 'Standard Patina',
      quantity: 1,
      customPrice: shoe.price,
    };
    setCartItems((prev) => [newItem, ...prev]);
    showToast(`Added ${shoe.name} · ${chosenColorway?.name || ''} (EU ${size}, ${width}) to Bag`);
  };

  const handleAddBespokeToCart = (custom: {
    shoe: Shoe;
    size: number;
    width: 'Standard (D)' | 'Wide (EE)';
    colorway: string;
    monogram: string;
    soleFinish: string;
    customPrice: number;
  }) => {
    const newItem: CartItem = {
      id: `cart-bespoke-${Date.now()}`,
      shoeId: custom.shoe.id,
      shoe: custom.shoe,
      size: custom.size,
      width: custom.width,
      selectedColorway: custom.colorway,
      monogram: custom.monogram,
      soleFinish: custom.soleFinish,
      quantity: 1,
      customPrice: custom.customPrice,
    };
    setCartItems((prev) => [newItem, ...prev]);
    showToast(`Bespoke Commission added to Bag: ${custom.monogram ? `[${custom.monogram}]` : ''}`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderSuccess = (orderId: string, clientDetails: { name: string; email: string; city: string }) => {
    setLatestOrderId(orderId);
    handleClearCart();
    showToast(`Commission #${orderId} confirmed for ${clientDetails.name}!`);
  };

  const handleOpenPortalWithOrder = (orderId: string) => {
    setLatestOrderId(orderId);
    handleNavigate('order-portal');
  };

  const subtotal = cartItems.reduce((acc, it) => acc + it.customPrice * it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f5f3ef] selection:bg-[#c5a880]/30 selection:text-[#fbf9f5]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 z-50 px-4 py-2.5 bg-[#141418]/95 backdrop-blur-md border border-[#c5a880]/70 rounded shadow-2xl flex items-center gap-2.5 text-xs text-[#f5f3ef]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Top Bar */}
      <Navbar
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        currentCurrency={currency}
        onCurrencyChange={(c) => {
          setCurrency(c);
          showToast(`Currency updated to ${c.name} (${c.symbol})`);
        }}
        onOpenComparison={() => setIsComparisonOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onExploreClick={() => handleNavigate('collections')}
          onBespokeClick={() => handleNavigate('bespoke')}
          currency={currency}
        />

        {/* Dynamic Product Showcase (360° Studio, Anatomy Blueprint, Acoustics Soundboard) */}
        <DynamicShowcase
          onSelectShoeForBespoke={() => handleNavigate('bespoke')}
          onAddToCart={(shoe, sz) => handleQuickAdd(shoe, sz)}
          currency={currency}
        />

        {/* Interactive Bespoke Studio Customizer */}
        <BespokeStudio
          onAddBespokeToCart={handleAddBespokeToCart}
          currency={currency}
          onOpenSizingGuide={() => setIsSizingGuideOpen(true)}
        />

        {/* Curated Collection Catalog */}
        <Catalog
          onQuickView={(shoe) => setQuickViewShoe(shoe)}
          onQuickAdd={handleQuickAdd}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onOpenComparison={() => setIsComparisonOpen(true)}
          currency={currency}
        />

        {/* Interactive Shop The Look */}
        <ShopTheLook
          onQuickView={(shoe) => setQuickViewShoe(shoe)}
          onAddToCart={(shoe, sz) => handleQuickAdd(shoe, sz)}
          onCustomize={() => handleNavigate('bespoke')}
          currency={currency}
        />

        {/* Interactive Shoe Care & Mirror Glaçage Masterclass */}
        <ShoeCareMasterclass />

        {/* Behind The Craftsmanship */}
        <CraftsmanshipSection />

        {/* Client Order Portal (Tracking bespoke commission stages & Certificate generator) */}
        <ClientOrderPortal recentOrderId={latestOrderId} />

        {/* Bespoke Concierge & VIP Salons */}
        <BespokeConcierge />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Quick View Modal */}
      <QuickViewModal
        shoe={quickViewShoe}
        onClose={() => setQuickViewShoe(null)}
        onAddToCart={handleAddToCartWithWidth}
        onOpenBespokeStudio={() => handleNavigate('bespoke')}
        onOpenSizingGuide={() => setIsSizingGuideOpen(true)}
        isWishlisted={quickViewShoe ? wishlist.some((w) => w.id === quickViewShoe.id) : false}
        onToggleWishlist={handleToggleWishlist}
        currency={currency}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((s) => s.id !== id))}
        onQuickAdd={handleQuickAdd}
        onQuickView={(shoe) => setQuickViewShoe(shoe)}
        currency={currency}
      />

      {/* Side-by-side Shoe Comparison Modal */}
      <ShoeComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        onSelectShoeForBespoke={() => handleNavigate('bespoke')}
        onQuickAdd={handleQuickAdd}
        currency={currency}
      />

      {/* Digital Podiatry Sizing Guide & Last Calculator */}
      <SizingGuideModal
        isOpen={isSizingGuideOpen}
        onClose={() => setIsSizingGuideOpen(false)}
        onApplyRecommendedSize={(sz, w) => {
          showToast(`Applied recommended size EU ${sz} (${w})`);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOpenCheckoutModal={() => setIsCheckoutModalOpen(true)}
        currency={currency}
      />

      {/* 3D Luxury Payment & Order Confirmation Modal */}
      <LuxuryCheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        onOrderSuccess={handleOrderSuccess}
        onOpenPortalWithOrder={handleOpenPortalWithOrder}
        currency={currency}
      />

      {/* VIP Concierge Floating Chat Bubble */}
      <VipConciergeChat currentOrderId={latestOrderId} />
    </div>
  );
}
