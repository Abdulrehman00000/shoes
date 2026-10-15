import React, { useState, useRef, useEffect, useMemo } from 'react';
import { CURRENCIES, CurrencyCode, CurrencyConfig } from '../utils/currency';
import { sounds } from '../utils/audio';
import { ChevronDown, Search, X, Check } from 'lucide-react';

interface CurrencySelectorProps {
  currentCurrency: CurrencyConfig;
  onCurrencyChange: (currency: CurrencyConfig) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currentCurrency,
  onCurrencyChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const currencyList = useMemo(() => {
    return Object.values(CURRENCIES);
  }, []);

  const filteredCurrencies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return currencyList;
    return currencyList.filter((c) => {
      return (
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
      );
    });
  }, [currencyList, searchQuery]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          sounds.playSoftClick();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#141419] hover:bg-[#1f1f28] border border-[#262632] hover:border-[#c5a880]/60 text-xs text-[#d0cec7] transition-all shadow-xs"
        title="Change valuation currency"
      >
        <span className="text-sm leading-none">{currentCurrency.flag}</span>
        <span className="font-mono font-semibold text-[11px] text-[#f5f3ef]">
          {currentCurrency.code}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-[#8e8c85] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-[#0e0e13]/98 border border-[#2e2e40] rounded shadow-2xl z-50 backdrop-blur-2xl flex flex-col overflow-hidden max-h-[380px]">
          {/* Header & Search Bar */}
          <div className="p-2.5 border-b border-[#1f1f2c] bg-[#121219]">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-[#7e7c75] absolute left-3 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search currency, code, or country..."
                className="w-full pl-8 pr-7 py-2 bg-[#09090d] border border-[#262635] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none placeholder:text-[#6e6c65]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-[#7e7c75] hover:text-[#f5f3ef] p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="text-[10px] text-[#7e7c75] uppercase tracking-wider mt-1.5 px-1 flex justify-between">
              <span>Sovereign Rates ({filteredCurrencies.length})</span>
              <span>Place Vendôme FX</span>
            </div>
          </div>

          {/* Currency List */}
          <div className="overflow-y-auto flex-1 p-1 divide-y divide-[#171722]/50 scrollbar-thin">
            {filteredCurrencies.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#8e8c85]">
                No matching currencies found for "{searchQuery}".
              </div>
            ) : (
              filteredCurrencies.map((curr) => {
                const isSelected = currentCurrency.code === curr.code;
                return (
                  <button
                    key={curr.code}
                    onClick={() => {
                      sounds.playSoftClick();
                      onCurrencyChange(curr);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors rounded ${
                      isSelected
                        ? 'bg-[#1e1a14] text-[#c5a880] font-medium'
                        : 'text-[#d0cec7] hover:bg-[#171722] hover:text-[#f5f3ef]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base shrink-0 leading-none">{curr.flag}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-[11px] text-[#f5f3ef]">
                            {curr.code}
                          </span>
                          <span className="truncate text-xs text-[#9a9892]">
                            · {curr.name}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#6e6c65] truncate">
                          {curr.country}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pl-2">
                      <span className="font-mono text-xs text-[#c5a880]">
                        {curr.symbol}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#c5a880]" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
