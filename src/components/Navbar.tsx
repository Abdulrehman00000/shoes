import React, { useState } from 'react';
import { ShoppingBag, Volume2, VolumeX, Menu, X, Heart, Music, Scale } from 'lucide-react';
import { sounds } from '../utils/audio';
import { CurrencySelector } from './CurrencySelector';
import { CurrencyConfig } from '../utils/currency';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  currentCurrency: CurrencyConfig;
  onCurrencyChange: (c: CurrencyConfig) => void;
  onOpenComparison: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onNavigate,
  activeSection,
  currentCurrency,
  onCurrencyChange,
  onOpenComparison,
}) => {
  const [audioEnabled, setAudioEnabled] = useState(sounds.enabled);
  const [ambientPlaying, setAmbientPlaying] = useState(sounds.isAmbientPlaying);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleAudio = () => {
    const nextState = !audioEnabled;
    sounds.enabled = nextState;
    setAudioEnabled(nextState);
    if (nextState) {
      sounds.playSoftClick();
    }
  };

  const toggleAmbient = () => {
    sounds.enabled = true;
    setAudioEnabled(true);
    const isNowPlaying = sounds.toggleAmbientAtelier();
    setAmbientPlaying(isNowPlaying);
  };

  const navLinks = [
    { id: 'collections', label: 'Collections' },
    { id: 'bespoke', label: 'Bespoke Studio' },
    { id: 'care-masterclass', label: 'Care Ritual' },
    { id: 'craftsmanship', label: 'Craftsmanship' },
    { id: 'order-portal', label: 'Order Dossier' },
    { id: 'concierge', label: 'Salons' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0c0c0e]/95 backdrop-blur-md border-b border-[#1f1f24] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        {/* Brand Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            sounds.playSoftClick();
            onNavigate('hero');
          }}
          className="font-serif text-2xl md:text-3xl tracking-normal text-[#f5f3ef] hover:text-[#c5a880] transition-colors whitespace-nowrap shrink-0"
        >
          Atelier Vendôme
        </a>

        {/* Clean Nav Links */}
        <nav className="hidden xl:flex items-center gap-7 text-xs uppercase tracking-[0.2em] font-medium text-[#a09e98]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  sounds.playSoftClick();
                  onNavigate(link.id);
                }}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#f5f3ef] relative py-1 ${
                  isActive ? 'text-[#c5a880]' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c5a880]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Currency, Ambient sound, Wishlist, Bag) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Currency dropdown */}
          <CurrencySelector
            currentCurrency={currentCurrency}
            onCurrencyChange={onCurrencyChange}
          />

          {/* Ambient Salon Audio Harmonizer */}
          <button
            onClick={toggleAmbient}
            title={ambientPlaying ? 'Pause Paris salon atmospheric music' : 'Play Place Vendôme salon ambient soundscape'}
            className={`p-2 rounded border transition-colors hidden sm:flex items-center gap-1.5 text-xs ${
              ambientPlaying
                ? 'border-[#c5a880] bg-[#1d1912] text-[#c5a880]'
                : 'border-[#242430] bg-[#121217] text-[#8e8c85] hover:text-[#f5f3ef]'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${ambientPlaying ? 'animate-pulse' : ''}`} />
            <span className="text-[10px] uppercase tracking-wider hidden lg:inline">
              {ambientPlaying ? 'Salon Audio' : 'Ambience'}
            </span>
          </button>

          {/* Audio Effects Toggle */}
          <button
            onClick={toggleAudio}
            title={audioEnabled ? 'Mute acoustic craft feedback' : 'Enable acoustic tactile sound effects'}
            className="p-2 text-[#8e8c85] hover:text-[#c5a880] transition-colors"
            aria-label="Toggle sound feedback"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-[#c5a880]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => {
              sounds.playSoftClick();
              onOpenWishlist();
            }}
            title="Open saved commissions"
            className="relative p-2 text-[#8e8c85] hover:text-[#c5a880] transition-colors"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#c5a880] text-[#0c0c0e] font-mono text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={() => {
              sounds.playSoftClick();
              onOpenCart();
            }}
            className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#16161b] hover:bg-[#202027] border border-[#2a2a35] hover:border-[#c5a880]/60 rounded text-xs uppercase tracking-[0.15em] font-medium text-[#f5f3ef] transition-all whitespace-nowrap shrink-0 group shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#c5a880] group-hover:scale-105 transition-transform" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono tabular-nums text-xs text-[#c5a880] font-semibold">
              ({cartCount})
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#a09e98] hover:text-[#f5f3ef] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#1f1f24] bg-[#0c0c0e] px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                sounds.playSoftClick();
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm tracking-[0.15em] uppercase text-[#cfcdc8] hover:text-[#c5a880] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenComparison();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm tracking-[0.15em] uppercase text-[#c5a880]"
          >
            Compare Models
          </button>
        </div>
      )}
    </header>
  );
};
