import React, { useState, useMemo } from 'react';
import { LUXURY_SHOES } from '../data/shoesData';
import { Shoe, Colorway } from '../types/shoes';
import { ShoeCard } from './ShoeCard';
import { sounds } from '../utils/audio';
import { SlidersHorizontal, Search, Scale } from 'lucide-react';
import { CurrencyConfig } from '../utils/currency';

interface CatalogProps {
  onQuickView: (shoe: Shoe) => void;
  onQuickAdd: (shoe: Shoe, size: number, colorway?: Colorway) => void;
  wishlist: Shoe[];
  onToggleWishlist: (shoe: Shoe) => void;
  onOpenComparison: () => void;
  currency?: CurrencyConfig;
}

export const Catalog: React.FC<CatalogProps> = ({
  onQuickView,
  onQuickAdd,
  wishlist,
  onToggleWishlist,
  onOpenComparison,
  currency,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Footwear' },
    { id: 'oxford', label: 'Oxfords & Wholecuts' },
    { id: 'monkstrap', label: 'Monk Straps' },
    { id: 'loafer', label: 'Loafers & Slippers' },
    { id: 'derby', label: 'Derbies & Aprons' },
    { id: 'boot', label: 'Bespoke Boots' },
  ];

  const filteredShoes = useMemo(() => {
    return LUXURY_SHOES.filter((shoe) => {
      const matchesCategory =
        selectedCategory === 'all' || shoe.category === selectedCategory;
      const matchesSearch =
        shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.leather.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'hours') return b.artisanHours - a.artisanHours;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="collections" className="py-24 bg-[#0c0c0e] border-b border-[#1f1f24]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#1b1b22]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#a09e98] mb-3">
              <span>Permanent Collection</span>
              <span aria-hidden="true" className="text-[#c5a880]">·</span>
              <span>Handcrafted in Florence & Paris</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f5f3ef]">
              Curated Masterpieces
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                sounds.playSoftClick();
                onOpenComparison();
              }}
              className="px-4 py-2.5 bg-[#171720] hover:bg-[#22222e] border border-[#2d2d3d] hover:border-[#c5a880]/60 rounded text-xs uppercase tracking-[0.15em] font-medium text-[#c5a880] transition-all flex items-center gap-2 shadow-sm"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare Models</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sounds.playSoftClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium rounded transition-all whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#1e1e26] text-[#c5a880] border border-[#30303e]'
                      : 'text-[#8e8c85] hover:text-[#f5f3ef] hover:bg-[#141418]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 text-[#7e7c75] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search leather or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#121216] border border-[#22222b] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none placeholder:text-[#6e6c65]"
              />
            </div>

            <div className="flex items-center gap-2 bg-[#121216] border border-[#22222b] rounded px-3 py-2 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#c5a880]" />
              <select
                value={sortBy}
                onChange={(e) => {
                  sounds.playSoftClick();
                  setSortBy(e.target.value);
                }}
                className="bg-transparent text-xs text-[#b8b5ad] focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#121216]">Iconic Models</option>
                <option value="price-high" className="bg-[#121216]">Price: High to Low</option>
                <option value="price-low" className="bg-[#121216]">Price: Low to High</option>
                <option value="hours" className="bg-[#121216]">Artisan Hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3-Column Grid */}
        {filteredShoes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {filteredShoes.map((shoe) => {
              const isWish = wishlist.some((w) => w.id === shoe.id);
              return (
                <ShoeCard
                  key={shoe.id}
                  shoe={shoe}
                  onQuickView={onQuickView}
                  onQuickAdd={onQuickAdd}
                  isWishlisted={isWish}
                  onToggleWishlist={onToggleWishlist}
                  currency={currency}
                />
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-[#22222a] rounded">
            <p className="font-serif text-xl text-[#a09e98]">No creations match your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 text-xs text-[#c5a880] uppercase tracking-[0.15em] underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
