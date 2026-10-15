import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Check, Sliders, Sparkles, Shield, RotateCw, Ruler, Award } from 'lucide-react';
import { IMAGES, LUXURY_SHOES } from '../data/shoesData';
import { Shoe } from '../types/shoes';
import { sounds } from '../utils/audio';
import { CurrencyConfig, formatPrice } from '../utils/currency';

interface BespokeStudioProps {
  onAddBespokeToCart: (customItem: {
    shoe: Shoe;
    size: number;
    width: 'Standard (D)' | 'Wide (EE)';
    colorway: string;
    monogram: string;
    soleFinish: string;
    customPrice: number;
  }) => void;
  currency?: CurrencyConfig;
  onOpenSizingGuide?: () => void;
}

type AngleMode = 'lateral' | 'quarter' | 'closeup' | 'sole';
type LightingMode = 'atelier' | 'candle' | 'daylight';
type GlaceLevel = 'matte' | 'satin' | 'mirror';

interface PatinaOption {
  id: string;
  name: string;
  hex: string;
  description: string;
  image: string;
  priceDelta: number;
}

export const BespokeStudio: React.FC<BespokeStudioProps> = ({
  onAddBespokeToCart,
  currency,
  onOpenSizingGuide,
}) => {
  const [selectedShoeIndex, setSelectedShoeIndex] = useState(0);
  const baseShoe = LUXURY_SHOES[selectedShoeIndex];

  const patinaOptions: PatinaOption[] = useMemo(() => {
    return baseShoe.colorways.map((cw, idx) => ({
      id: cw.id,
      name: cw.name,
      hex: cw.hex,
      description: `Bespoke hand-applied ${cw.name} with crystallized wax glaze.`,
      image: cw.image,
      priceDelta: idx === 0 ? 0 : idx * 95,
    }));
  }, [baseShoe]);

  const soleOptions = [
    { id: 'oak-baker', name: 'J&FJ Baker Oak Bark Leather Sole', surcharge: 0, desc: 'Tanned for 14 months in Devon river water' },
    { id: 'beveled-waist', name: 'Parisian Beveled Fiddleback Waist', surcharge: 150, desc: 'Violin arch waist with flush hand-hammered brass toe tap' },
    { id: 'vibram-island', name: 'Concealed Vibram Arctic Island Sole', surcharge: 95, desc: 'Grip rubber insert embedded seamlessly inside leather sole' },
  ];

  const liningOptions = [
    { id: 'bordeaux', name: 'Bordeaux Glove Calfskin', surcharge: 0 },
    { id: 'cognac', name: 'Tuscan Amber Soft Glove', surcharge: 45 },
    { id: 'emerald', name: 'Imperial Emerald Velvet', surcharge: 85 },
    { id: 'obsidian', name: 'Nero Satin Silk', surcharge: 60 },
  ];

  const stitchOptions = [
    { id: 'tone', name: 'Tone-on-tone Waxed Linen', surcharge: 0 },
    { id: 'ecru', name: 'Ecru Belgian Contrast Stitch', surcharge: 50 },
    { id: 'gold', name: '24k Gold Thread Inlay Welt', surcharge: 120 },
  ];

  const [activeAngle, setActiveAngle] = useState<AngleMode>('lateral');
  const [selectedPatina, setSelectedPatina] = useState<PatinaOption>(patinaOptions[0]);

  useEffect(() => {
    setSelectedPatina(patinaOptions[0]);
  }, [selectedShoeIndex, patinaOptions]);
  const [selectedSole, setSelectedSole] = useState(soleOptions[0]);
  const [selectedLining, setSelectedLining] = useState(liningOptions[0]);
  const [selectedStitch, setSelectedStitch] = useState(stitchOptions[0]);
  const [glaceLevel, setGlaceLevel] = useState<GlaceLevel>('mirror');
  const [brassInitials, setBrassInitials] = useState<string>('AV');
  const [selectedSize, setSelectedSize] = useState<number>(42);
  const [selectedWidth, setSelectedWidth] = useState<'Standard (D)' | 'Wide (EE)'>('Standard (D)');
  const [monogram, setMonogram] = useState<string>('AV');
  const [foilType, setFoilType] = useState<'24k-gold' | 'blind-emboss'>('24k-gold');
  const [lighting, setLighting] = useState<LightingMode>('atelier');
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const calculateTotal = () => {
    return (
      baseShoe.price +
      selectedPatina.priceDelta +
      selectedSole.surcharge +
      selectedLining.surcharge +
      selectedStitch.surcharge
    );
  };

  const handleNextAngle = () => {
    sounds.playSoftClick();
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
    const angles: AngleMode[] = ['lateral', 'quarter', 'closeup', 'sole'];
    const nextIdx = (angles.indexOf(activeAngle) + 1) % angles.length;
    setActiveAngle(angles[nextIdx]);
  };

  const handleAddToCart = () => {
    sounds.playLuxuryChime();
    onAddBespokeToCart({
      shoe: baseShoe,
      size: selectedSize,
      width: selectedWidth,
      colorway: `${selectedPatina.name} (${glaceLevel.toUpperCase()})`,
      monogram: monogram.trim().toUpperCase()
        ? `${monogram.trim().toUpperCase()} (${foilType === '24k-gold' ? '24k Gold' : 'Blind'}) | Toe Tap [${brassInitials || 'AV'}]`
        : 'None',
      soleFinish: `${selectedSole.name} · ${selectedStitch.name}`,
      customPrice: calculateTotal(),
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2400);
  };

  return (
    <section id="bespoke" className="py-24 bg-[#0a0a0c] border-b border-[#1f1f24] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1a1a20]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#a09e98] mb-3">
              <span>Atelier Sur-Mesure</span>
              <span aria-hidden="true" className="text-[#c5a880]">·</span>
              <span>Interactive Bespoke Studio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f5f3ef]">
              Bespoke Configuration & Craft
            </h2>
          </div>
          <p className="text-sm text-[#8e8c85] max-w-md font-light leading-relaxed">
            Every millimeter customized to your proportion. Select silhouette model, leather patinas, sole architecture, and personalize with 24k gold foil initials and engraved brass toe taps.
          </p>
        </div>

        {/* Model Switcher Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto py-5 border-b border-[#171720] scrollbar-none">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8e8c85] mr-2 shrink-0">
            Silhouette:
          </span>
          {LUXURY_SHOES.map((shoe, idx) => (
            <button
              key={shoe.id}
              onClick={() => {
                sounds.playSoftClick();
                setSelectedShoeIndex(idx);
                setSelectedPatina(patinaOptions[0]);
              }}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] rounded transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                selectedShoeIndex === idx
                  ? 'border border-[#c5a880] bg-[#1d1a15] text-[#f5f3ef] font-medium'
                  : 'border border-[#22222b] bg-[#111115] text-[#8e8c85] hover:text-[#f5f3ef]'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: shoe.colorways[0]?.hex || '#c5a880' }} />
              <span>{shoe.name}</span>
            </button>
          ))}
        </div>

        {/* Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 items-start">
          {/* Left: Interactive Visualizer Stage (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div
              className={`relative aspect-[4/3] rounded-sm overflow-hidden border border-[#262630] transition-colors duration-500 bg-[#0e0e11] group ${
                lighting === 'candle'
                  ? 'bg-gradient-to-b from-[#18120d] to-[#0c0a08]'
                  : lighting === 'daylight'
                  ? 'bg-gradient-to-b from-[#18181f] to-[#0f0f14]'
                  : 'bg-[#0f0f13]'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedPatina.id}-${activeAngle}-${lighting}-${baseShoe.id}-${glaceLevel}`}
                  initial={{ opacity: 0.2, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.2, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="w-full h-full relative"
                >
                  <img
                    src={selectedPatina.image}
                    alt={`${baseShoe.name} in ${selectedPatina.name}`}
                    className={`w-full h-full object-cover object-center ${
                      activeAngle === 'closeup' ? 'scale-125 origin-right' : ''
                    } ${activeAngle === 'quarter' ? 'scale-105' : ''} ${
                      isRotating ? 'brightness-110' : ''
                    } transition-transform duration-700`}
                  />

                  {/* Dynamic Glaçage Shimmer Filter */}
                  {glaceLevel === 'mirror' && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#c5a880]/10 to-white/15 pointer-events-none" />
                  )}

                  {/* Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Monogram Overlay Badge */}
                  {monogram.trim() && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-6 left-6 px-3.5 py-1.5 bg-[#0c0c0e]/90 border border-[#c5a880]/50 rounded text-center backdrop-blur-md shadow-lg"
                    >
                      <div className="text-[9px] uppercase tracking-[0.2em] text-[#a09e98]">
                        Insole Stamped
                      </div>
                      <div
                        className={`font-serif text-sm tracking-widest font-semibold ${
                          foilType === '24k-gold' ? 'text-[#c5a880]' : 'text-[#8e8c85]'
                        }`}
                      >
                        {monogram.toUpperCase()}
                      </div>
                    </motion.div>
                  )}

                  {/* Brass Toe Tap Badge */}
                  {brassInitials.trim() && (
                    <div className="absolute bottom-16 left-6 px-3 py-1 bg-[#0c0c0e]/85 border border-[#c5a880]/40 rounded text-left backdrop-blur-sm">
                      <span className="text-[8px] uppercase tracking-widest text-[#7e7c75] block">
                        Flush Brass Toe Tap:
                      </span>
                      <span className="font-mono text-xs text-[#c5a880] font-bold">
                        [{brassInitials.toUpperCase()}]
                      </span>
                    </div>
                  )}

                  {/* Live Angle Tag */}
                  <div className="absolute top-6 right-6 text-[11px] uppercase tracking-[0.2em] text-[#a09e98] bg-[#0c0c0e]/80 px-3 py-1 border border-[#22222a] backdrop-blur-sm">
                    {activeAngle === 'lateral' && 'Side Profile Perspective'}
                    {activeAngle === 'quarter' && '3/4 Anatomical Angle'}
                    {activeAngle === 'closeup' && 'Glaçage & Toe Cap Detail'}
                    {activeAngle === 'sole' && 'Oak Sole & Waist Spec'}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Angle Selector Tabs Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 p-2 bg-[#0c0c0e]/90 backdrop-blur-md border border-[#22222b] rounded">
                <div className="flex items-center gap-1">
                  {(['lateral', 'quarter', 'closeup', 'sole'] as AngleMode[]).map((angle) => (
                    <button
                      key={angle}
                      onClick={() => {
                        sounds.playSoftClick();
                        setActiveAngle(angle);
                      }}
                      className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] rounded transition-all whitespace-nowrap shrink-0 ${
                        activeAngle === angle
                          ? 'bg-[#252530] text-[#f5f3ef] font-medium border border-[#3b3b4a]'
                          : 'text-[#8e8c85] hover:text-[#f5f3ef]'
                      }`}
                    >
                      {angle}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNextAngle}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] text-[#c5a880] hover:text-[#e2cb9f] transition-colors whitespace-nowrap shrink-0"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Cycle Angle</span>
                </button>
              </div>
            </div>

            {/* Studio Environment Lighting Controls */}
            <div className="flex items-center justify-between p-3.5 bg-[#121216] border border-[#1f1f26] rounded text-xs text-[#a09e98]">
              <div className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#c5a880]" />
                <span className="uppercase tracking-[0.15em]">Salon Lighting:</span>
              </div>
              <div className="flex items-center gap-2">
                {(['atelier', 'candle', 'daylight'] as LightingMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      sounds.playSoftClick();
                      setLighting(mode);
                    }}
                    className={`px-2.5 py-1 text-[11px] capitalize rounded transition-colors ${
                      lighting === mode
                        ? 'bg-[#23232c] text-[#c5a880] font-medium border border-[#383848]'
                        : 'text-[#8e8c85] hover:text-[#f5f3ef]'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Bespoke Customization Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Step 1: Leather Patina */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <label className="text-xs uppercase tracking-[0.2em] font-medium text-[#f5f3ef]">
                  01. Leather & Patina Wash
                </label>
                <span className="text-xs text-[#c5a880] font-medium">
                  {selectedPatina.priceDelta > 0
                    ? `+${formatPrice(selectedPatina.priceDelta, currency)}`
                    : 'Included'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {patinaOptions.map((patina) => {
                  const isSelected = selectedPatina.id === patina.id;
                  return (
                    <button
                      key={patina.id}
                      onClick={() => {
                        sounds.playSoftClick();
                        setSelectedPatina(patina);
                      }}
                      className={`p-3 text-left border rounded transition-all ${
                        isSelected
                          ? 'border-[#c5a880] bg-[#1a1815]'
                          : 'border-[#22222b] bg-[#121216] hover:border-[#383848]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: patina.hex }}
                        />
                        <span className="text-xs font-medium text-[#f5f3ef] truncate">
                          {patina.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7a7872] line-clamp-2">
                        {patina.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Toe Cap Glaçage Level */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-[0.2em] font-medium text-[#f5f3ef]">
                02. Toe Glaçage Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'matte', label: 'Natural Matte', desc: 'Raw aniline grain' },
                  { id: 'satin', label: 'Satin Glaze', desc: 'Warm beeswax sheen' },
                  { id: 'mirror', label: 'Mirror Glaçage', desc: '1,200 wax circles' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      sounds.playGlaceRub();
                      setGlaceLevel(g.id as GlaceLevel);
                    }}
                    className={`p-2.5 rounded border text-left transition-colors ${
                      glaceLevel === g.id
                        ? 'border-[#c5a880] bg-[#1a1815] text-[#f5f3ef]'
                        : 'border-[#22222b] bg-[#121216] text-[#8e8c85]'
                    }`}
                  >
                    <div className="text-xs font-medium">{g.label}</div>
                    <div className="text-[10px] text-[#7e7c75] mt-0.5">{g.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Sole Architecture */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <label className="text-xs uppercase tracking-[0.2em] font-medium text-[#f5f3ef]">
                  03. Sole Architecture
                </label>
                <span className="text-xs text-[#c5a880] font-medium">
                  {selectedSole.surcharge > 0
                    ? `+${formatPrice(selectedSole.surcharge, currency)}`
                    : 'Included'}
                </span>
              </div>

              <div className="space-y-2">
                {soleOptions.map((sole) => {
                  const isSelected = selectedSole.id === sole.id;
                  return (
                    <button
                      key={sole.id}
                      onClick={() => {
                        sounds.playSoftClick();
                        setSelectedSole(sole);
                      }}
                      className={`w-full p-3 text-left flex items-start justify-between border rounded transition-all ${
                        isSelected
                          ? 'border-[#c5a880] bg-[#1a1815]'
                          : 'border-[#22222b] bg-[#121216] hover:border-[#383848]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-medium text-[#f5f3ef]">
                          {sole.name}
                        </div>
                        <div className="text-[11px] text-[#7a7872] mt-0.5">
                          {sole.desc}
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#c5a880] shrink-0 ml-2 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Welt Stitch & Lining */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-[#8e8c85] mb-1">
                  Welt Stitch
                </label>
                <select
                  value={selectedStitch.id}
                  onChange={(e) => {
                    sounds.playSoftClick();
                    const found = stitchOptions.find((s) => s.id === e.target.value);
                    if (found) setSelectedStitch(found);
                  }}
                  className="w-full px-2.5 py-2 bg-[#121216] border border-[#262632] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
                >
                  {stitchOptions.map((s) => (
                    <option key={s.id} value={s.id} className="bg-[#121216]">
                      {s.name} ({s.surcharge > 0 ? `+$${s.surcharge}` : 'Inc'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-[#8e8c85] mb-1">
                  Interior Lining
                </label>
                <select
                  value={selectedLining.id}
                  onChange={(e) => {
                    sounds.playSoftClick();
                    const found = liningOptions.find((l) => l.id === e.target.value);
                    if (found) setSelectedLining(found);
                  }}
                  className="w-full px-2.5 py-2 bg-[#121216] border border-[#262632] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
                >
                  {liningOptions.map((l) => (
                    <option key={l.id} value={l.id} className="bg-[#121216]">
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 5: Monogramming & Brass Toe-Tap */}
            <div className="p-4 bg-[#121216] border border-[#22222b] rounded space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#f5f3ef]">
                  05. Personalization Engraving
                </span>
                <span className="text-[11px] text-[#c5a880]">Complimentary</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-[#8e8c85] mb-1">
                    Insole Monogram (Initials)
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                    placeholder="e.g. AV"
                    className="w-full px-3 py-2 bg-[#0a0a0c] border border-[#2a2a35] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] tracking-widest font-serif uppercase outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-[#8e8c85] mb-1">
                    Brass Toe-Tap Initials
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    value={brassInitials}
                    onChange={(e) => setBrassInitials(e.target.value.toUpperCase())}
                    placeholder="AV"
                    className="w-full px-3 py-2 bg-[#0a0a0c] border border-[#2a2a35] focus:border-[#c5a880] rounded text-xs text-[#c5a880] tracking-widest font-mono uppercase outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 6: Size and Width + Sizing Guide Trigger */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <div className="flex items-center gap-2">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-[#f5f3ef]">
                    06. Size (EU)
                  </label>
                  {onOpenSizingGuide && (
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playSoftClick();
                        onOpenSizingGuide();
                      }}
                      className="text-[10px] text-[#c5a880] hover:text-[#d8ba8d] underline flex items-center gap-1 uppercase tracking-wider"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>Fitting Guide</span>
                    </button>
                  )}
                </div>
                <span className="text-[11px] text-[#8e8c85]">
                  EU {selectedSize} ≈ UK {(selectedSize - 33).toFixed(1)} / US {(selectedSize - 32).toFixed(1)}
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {[39, 40, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5].slice(0, 14).map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      sounds.playSoftClick();
                      setSelectedSize(size);
                    }}
                    className={`py-2 text-xs font-mono tabular-nums rounded border transition-all ${
                      selectedSize === size
                        ? 'border-[#c5a880] bg-[#c5a880] text-[#0c0c0e] font-bold shadow-sm'
                        : 'border-[#22222b] bg-[#121216] text-[#b0aeaa] hover:border-[#383848]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 pt-1">
                {(['Standard (D)', 'Wide (EE)'] as const).map((width) => (
                  <button
                    key={width}
                    onClick={() => {
                      sounds.playSoftClick();
                      setSelectedWidth(width);
                    }}
                    className={`flex-1 py-2 text-xs uppercase tracking-[0.1em] rounded border transition-colors ${
                      selectedWidth === width
                        ? 'border-[#c5a880] text-[#f5f3ef] bg-[#1a1815]'
                        : 'border-[#22222b] text-[#8e8c85] bg-[#121216]'
                    }`}
                  >
                    {width}
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Valuation CTA */}
            <div className="pt-4 border-t border-[#1f1f26] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-[#8e8c85]">
                    Total Bespoke Valuation
                  </div>
                  <div className="text-2xl font-mono tabular-nums font-medium text-[#f5f3ef]">
                    {formatPrice(calculateTotal(), currency)}
                  </div>
                </div>
                <div className="text-right text-[11px] text-[#7a7872]">
                  Includes Cedar Shoe Trees<br />& Travel Dust Bags
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addedSuccess}
                className={`w-full py-4 text-xs uppercase tracking-[0.2em] font-semibold rounded transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                  addedSuccess
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e] hover:shadow-[#c5a880]/20'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Commission Added to Bag</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Commission This Bespoke Pair</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
