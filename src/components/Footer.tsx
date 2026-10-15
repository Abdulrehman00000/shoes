import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sounds.playLuxuryChime();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer id="heritage" className="bg-[#08080a] border-t border-[#1a1a20] text-[#a09e98] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#181820]">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif text-2xl tracking-normal text-[#f5f3ef] block">
              Atelier Vendôme
            </span>
            <p className="text-xs text-[#8e8c85] leading-relaxed max-w-sm font-light">
              Haute Cordonnerie established in Paris in 1928. Sculpting exceptional footwear cut from whole hides, assembled with Goodyear welts, and finished with mirror-glazed crystallized patinas.
            </p>
            <div className="pt-2 text-[11px] text-[#c5a880] uppercase tracking-[0.2em]">
              Place Vendôme · Paris · Florence
            </div>
          </div>

          {/* Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] text-[#f5f3ef] font-medium">
              Creations
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Wholecut Oxfords
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Double Monk Straps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Crocodile Loafers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Wholecut Boots
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bespoke')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Bespoke Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Salons & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] text-[#f5f3ef] font-medium">
              Atelier Salons
            </div>
            <div className="space-y-2.5 text-xs text-[#8e8c85]">
              <div>
                <span className="text-[#f5f3ef] block">Parisian Flagship</span>
                12 Place Vendôme, 75001 Paris
              </div>
              <div>
                <span className="text-[#f5f3ef] block">Tuscan Workshop</span>
                Via della Spiga, Montegranaro
              </div>
              <div>
                <span className="text-[#f5f3ef] block">Mayfair Salon</span>
                24 Savile Row, London W1S
              </div>
            </div>
          </div>

          {/* Gazette / Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] text-[#f5f3ef] font-medium">
              The Atelier Gazette
            </div>
            <p className="text-xs text-[#8e8c85] font-light">
              Receive private invitations to seasonal leather batch releases and bespoke salon tastings.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#121216] border border-[#242430] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none pr-10"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#c5a880] hover:text-[#e2cb9f] p-1"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-400" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] text-[#c5a880] block">
                  You are registered on our private register.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Quiet Copyright & Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e6c65]">
          <div>
            © 1928–2026 Atelier Vendôme Haute Cordonnerie. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Lifetime Resoling Guarantee</span>
            <span aria-hidden="true">·</span>
            <span>Sustainable Annonay Tanneries</span>
            <span aria-hidden="true">·</span>
            <span>Ethical Full-Grain Provenance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
