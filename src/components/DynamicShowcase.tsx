import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rotate3d, 
  Layers, 
  ZoomIn, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Sliders, 
  Eye, 
  ChevronRight,
  Maximize2,
  Volume2,
  Scissors,
  Hammer
} from 'lucide-react';
import { IMAGES, LUXURY_SHOES } from '../data/shoesData';
import { Shoe } from '../types/shoes';
import { sounds } from '../utils/audio';
import { CurrencyConfig, formatPrice } from '../utils/currency';

interface DynamicShowcaseProps {
  onSelectShoeForBespoke: (shoe: Shoe) => void;
  onAddToCart: (shoe: Shoe, size: number) => void;
  currency?: CurrencyConfig;
}

type ShowcaseMode = 'spin' | 'anatomy' | 'texture' | 'acoustics';
type ViewAngle = 0 | 1 | 2 | 3;

export const DynamicShowcase: React.FC<DynamicShowcaseProps> = ({
  onSelectShoeForBespoke,
  onAddToCart,
  currency,
}) => {
  const [selectedShoeIndex, setSelectedShoeIndex] = useState(0);
  const currentShoe = LUXURY_SHOES[selectedShoeIndex];

  const [mode, setMode] = useState<ShowcaseMode>('spin');
  const [viewAngle, setViewAngle] = useState<ViewAngle>(0);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [activePatinaIdx, setActivePatinaIdx] = useState(0);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const activeColorwayImage = currentShoe.colorways[activePatinaIdx]?.image || currentShoe.image;

  const angleAngles = [
    { label: 'Profile 90°', image: activeColorwayImage, desc: 'Pure lateral silhouette and balanced arch line.' },
    { label: 'Perspective 45°', image: currentShoe.secondaryImage || activeColorwayImage, desc: 'Sculpted vamp contour and toe cap curvature.' },
    { label: 'Mirrored Toe Box', image: activeColorwayImage, desc: 'Hand-crystallized mirror glaze catching direct illumination.' },
    { label: 'Artisanal Soling', image: currentShoe.secondaryImage || activeColorwayImage, desc: 'Beveled fiddleback waist and flush brass toe protector.' },
  ];

  const anatomyLayers = [
    {
      id: 1,
      title: 'Full-Grain Box Calf Vamp',
      tannery: 'Tanneries d’Annonay, France',
      detail: 'Single-piece hide without intermediate joins. Aniline dyed for deep natural grain preservation.',
    },
    {
      id: 2,
      title: 'Granular Natural Cork Footbed',
      tannery: 'Sardinia Organic Cork Oak',
      detail: 'Molds dynamically to the wearer’s foot pressure points over 30 hours of wear for bespoke comfort.',
    },
    {
      id: 3,
      title: 'Double-Ribbed Steel Shank',
      tannery: 'Solingen Tempered Steel',
      detail: 'Reinforces longitudinal arch integrity to eliminate foot fatigue during grand galas and long travel.',
    },
    {
      id: 4,
      title: 'Goodyear Welt Stitching (Waxed Linen)',
      tannery: 'Belgian Linen Mills',
      detail: 'Twin-thread lockstitch sewn into channeled insole rib. Completely impenetrable to moisture.',
    },
    {
      id: 5,
      title: 'Baker Oak Bark Leather Sole',
      tannery: 'J&FJ Baker, Devon UK',
      detail: '14-month oak-bark pit tanning yields maximum leather density and silent, dignified footsteps.',
    },
  ];

  const workbenchSounds = [
    {
      label: 'Clicker Leather Slice',
      icon: Scissors,
      desc: 'Precision French box calf cutting along hide tension',
      action: () => sounds.playLeatherSlice(),
    },
    {
      label: 'Cobbler Wooden Hammer',
      icon: Hammer,
      desc: 'Driving brass nails into solid oak heel stack',
      action: () => sounds.playHammerTap(),
    },
    {
      label: 'Beeswax Glaçage Buffing',
      icon: Sparkles,
      desc: 'Ice-water micro friction crystallizing mirror toe cap',
      action: () => sounds.playGlaceRub(),
    },
    {
      label: 'Marble Salon Heel Strike',
      icon: Volume2,
      desc: 'Resonant acoustic density of 9mm Baker leather heel',
      action: () => sounds.playMarbleHeelStrike(),
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleAngleStep = () => {
    sounds.playSoftClick();
    setViewAngle(((viewAngle + 1) % 4) as ViewAngle);
  };

  const handleQuickAdd = () => {
    sounds.playLuxuryChime();
    onAddToCart(currentShoe, 42);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <section className="py-24 bg-[#0a0a0d] border-b border-[#1f1f26] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,_rgba(197,168,128,0.06),_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1b1b22]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#a09e98] mb-3">
              <span>Interactive Inspection</span>
              <span aria-hidden="true" className="text-[#c5a880]">·</span>
              <span>Anatomical Precision</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f5f3ef]">
              The Dynamic Showcase
            </h2>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#141418] border border-[#262632] rounded overflow-x-auto scrollbar-none">
            <button
              onClick={() => {
                sounds.playSoftClick();
                setMode('spin');
              }}
              className={`px-3.5 py-2 text-xs uppercase tracking-[0.15em] font-medium rounded transition-all flex items-center gap-2 whitespace-nowrap ${
                mode === 'spin'
                  ? 'bg-[#22222c] text-[#c5a880] shadow-sm'
                  : 'text-[#8e8c85] hover:text-[#f5f3ef]'
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5" />
              <span>360° Studio</span>
            </button>

            <button
              onClick={() => {
                sounds.playSoftClick();
                setMode('anatomy');
              }}
              className={`px-3.5 py-2 text-xs uppercase tracking-[0.15em] font-medium rounded transition-all flex items-center gap-2 whitespace-nowrap ${
                mode === 'anatomy'
                  ? 'bg-[#22222c] text-[#c5a880] shadow-sm'
                  : 'text-[#8e8c85] hover:text-[#f5f3ef]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Blueprint</span>
            </button>

            <button
              onClick={() => {
                sounds.playSoftClick();
                setMode('texture');
              }}
              className={`px-3.5 py-2 text-xs uppercase tracking-[0.15em] font-medium rounded transition-all flex items-center gap-2 whitespace-nowrap ${
                mode === 'texture'
                  ? 'bg-[#22222c] text-[#c5a880] shadow-sm'
                  : 'text-[#8e8c85] hover:text-[#f5f3ef]'
              }`}
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Texture Zoom</span>
            </button>

            <button
              onClick={() => {
                sounds.playSoftClick();
                setMode('acoustics');
              }}
              className={`px-3.5 py-2 text-xs uppercase tracking-[0.15em] font-medium rounded transition-all flex items-center gap-2 whitespace-nowrap ${
                mode === 'acoustics'
                  ? 'bg-[#22222c] text-[#c5a880] shadow-sm'
                  : 'text-[#8e8c85] hover:text-[#f5f3ef]'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Workbench Sounds</span>
            </button>
          </div>
        </div>

        {/* Model Selector Bar */}
        <div className="flex items-center gap-3 overflow-x-auto py-6 border-b border-[#181820] scrollbar-none">
          {LUXURY_SHOES.map((shoe, idx) => (
            <button
              key={shoe.id}
              onClick={() => {
                sounds.playSoftClick();
                setSelectedShoeIndex(idx);
                setViewAngle(0);
                setActivePatinaIdx(0);
              }}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] rounded transition-all whitespace-nowrap shrink-0 flex items-center gap-2.5 ${
                selectedShoeIndex === idx
                  ? 'border border-[#c5a880] bg-[#1a1713] text-[#f5f3ef] font-medium'
                  : 'border border-[#22222b] bg-[#121216] text-[#8e8c85] hover:border-[#383848] hover:text-[#f5f3ef]'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: shoe.colorways[0]?.hex || '#c5a880' }} />
              <span>{shoe.name}</span>
            </button>
          ))}
        </div>

        {/* Main Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 items-stretch">
          {/* Visual Showcase Stage (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div
              onMouseMove={handleMouseMove}
              onClick={() => {
                if (mode === 'texture') setIsZoomed(!isZoomed);
                else handleAngleStep();
              }}
              className="relative aspect-[16/10] bg-[#0f0f13] rounded-sm overflow-hidden border border-[#242430] group cursor-crosshair select-none"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentShoe.id}-${viewAngle}-${mode}-${activePatinaIdx}`}
                  initial={{ opacity: 0.3, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.2, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="w-full h-full relative"
                >
                  <img
                    src={angleAngles[viewAngle].image}
                    alt={currentShoe.name}
                    style={
                      mode === 'texture' && isZoomed
                        ? {
                            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                            transform: 'scale(2.4)',
                          }
                        : {}
                    }
                    className="w-full h-full object-cover object-center transition-transform duration-200"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Anatomy overlay */}
                  {mode === 'anatomy' && (
                    <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="bg-[#0c0c0e]/85 backdrop-blur-md border border-[#c5a880]/40 px-3 py-1.5 rounded text-[11px] text-[#c5a880] uppercase tracking-[0.2em]">
                          Architectural Deconstruction
                        </div>
                        <div className="text-[11px] text-[#8e8c85]">
                          5 Structural Layers
                        </div>
                      </div>

                      <div className="relative h-48 w-full">
                        <div className="absolute top-[20%] left-[25%] flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#c5a880] animate-ping" />
                          <span className="text-[10px] uppercase tracking-[0.15em] bg-[#0c0c0e]/90 text-[#f5f3ef] px-2 py-0.5 border border-[#30303e]">
                            01. Single-Cut Vamp
                          </span>
                        </div>
                        <div className="absolute bottom-[25%] left-[50%] flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#c5a880]" />
                          <span className="text-[10px] uppercase tracking-[0.15em] bg-[#0c0c0e]/90 text-[#f5f3ef] px-2 py-0.5 border border-[#30303e]">
                            04. Channeled Goodyear Welt
                          </span>
                        </div>
                        <div className="absolute bottom-[10%] left-[30%] flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#c5a880]" />
                          <span className="text-[10px] uppercase tracking-[0.15em] bg-[#0c0c0e]/90 text-[#f5f3ef] px-2 py-0.5 border border-[#30303e]">
                            05. 9mm Baker Oak Sole
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {mode === 'texture' && (
                    <div className="absolute top-4 left-4 bg-[#0c0c0e]/90 backdrop-blur-md border border-[#30303e] px-3.5 py-1.5 rounded text-[11px] text-[#b8b5ad]">
                      {isZoomed ? 'Move cursor to examine leather pore depth (Click to reset)' : 'Click anywhere on shoe to activate 2.4x Macro Texture Zoom'}
                    </div>
                  )}

                  {/* Angle info caption at bottom */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <div className="bg-[#0c0c0e]/85 backdrop-blur-md border border-[#22222a] px-3.5 py-2 rounded">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880]">
                        {angleAngles[viewAngle].label}
                      </div>
                      <div className="text-xs text-[#a09e98] mt-0.5">
                        {angleAngles[viewAngle].desc}
                      </div>
                    </div>

                    <div className="text-right text-[10px] uppercase tracking-[0.15em] text-[#8e8c85]">
                      Click to rotate angle
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Angle Scrubbing Bar */}
            <div className="mt-4 flex items-center justify-between p-3.5 bg-[#121216] border border-[#1f1f26] rounded">
              <div className="flex items-center gap-2 text-xs text-[#a09e98]">
                <Rotate3d className="w-4 h-4 text-[#c5a880]" />
                <span className="uppercase tracking-[0.15em]">Rotation Coordinates:</span>
              </div>

              <div className="flex items-center gap-2">
                {angleAngles.map((ang, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sounds.playSoftClick();
                      setViewAngle(idx as ViewAngle);
                    }}
                    className={`px-3 py-1 text-xs font-mono tabular-nums rounded border transition-colors ${
                      viewAngle === idx
                        ? 'border-[#c5a880] bg-[#22222c] text-[#c5a880] font-bold'
                        : 'border-[#262632] text-[#8e8c85] hover:text-[#f5f3ef]'
                    }`}
                  >
                    {idx * 90}°
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Information & Mode Panel (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            {mode === 'acoustics' ? (
              /* Acoustics Soundboard Mode */
              <div className="p-6 bg-[#111115] border border-[#22222b] rounded-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#1f1f26] pb-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-medium">
                    Listen to the Craft
                  </div>
                  <div className="text-xs text-[#8e8c85]">
                    Atelier Acoustics
                  </div>
                </div>

                <p className="text-xs text-[#a09e98] leading-relaxed">
                  True luxury is acoustic. Tap each cordwainer tool to experience the sonic fidelity of our Place Vendôme workbench:
                </p>

                <div className="space-y-2.5">
                  {workbenchSounds.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={item.action}
                        className="w-full text-left p-3.5 bg-[#15151c] hover:bg-[#1f1f2a] border border-[#262635] hover:border-[#c5a880]/60 rounded transition-all flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded bg-[#0c0c0e] border border-[#303042] flex items-center justify-center text-[#c5a880] group-hover:scale-110 transition-transform shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-[#f5f3ef] flex items-center justify-between">
                            <span>{item.label}</span>
                            <span className="text-[10px] text-[#c5a880] font-mono">Play ▶</span>
                          </div>
                          <div className="text-[10px] text-[#7e7c75] truncate mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : mode === 'anatomy' ? (
              /* Anatomy Breakdown */
              <div className="p-6 bg-[#111115] border border-[#22222b] rounded-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#1f1f26] pb-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-medium">
                    Internal Structure
                  </div>
                  <div className="text-xs text-[#8e8c85]">
                    5 Handcrafted Tiers
                  </div>
                </div>

                <div className="space-y-3">
                  {anatomyLayers.map((layer) => {
                    const isSelected = activeLayer === layer.id;
                    return (
                      <button
                        key={layer.id}
                        onClick={() => {
                          sounds.playSoftClick();
                          setActiveLayer(isSelected ? null : layer.id);
                        }}
                        className={`w-full text-left p-3 rounded border transition-all ${
                          isSelected
                            ? 'border-[#c5a880] bg-[#181612]'
                            : 'border-[#1f1f26] bg-[#0d0d10] hover:border-[#2f2f3c]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-[#f5f3ef]">
                            {layer.title}
                          </span>
                          <span className="text-[10px] text-[#c5a880] font-mono">
                            0{layer.id}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#8e8c85] mt-1 font-light">
                          {layer.tannery}
                        </div>
                        {isSelected && (
                          <p className="text-xs text-[#b8b5ad] mt-2 pt-2 border-t border-[#262630] leading-relaxed">
                            {layer.detail}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Standard Shoe Profile & Spec */
              <div className="p-6 bg-[#111115] border border-[#22222b] rounded-sm space-y-5">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#c5a880] font-medium mb-1">
                    {currentShoe.categoryLabel}
                  </div>
                  <h3 className="font-serif text-2xl text-[#f5f3ef]">
                    {currentShoe.name}
                  </h3>
                  <div className="font-mono tabular-nums text-xl text-[#f5f3ef] font-semibold mt-1">
                    {formatPrice(currentShoe.price, currency)}
                  </div>
                </div>

                <p className="text-xs text-[#a09e98] leading-relaxed font-light">
                  {currentShoe.description}
                </p>

                {/* Technical Specs */}
                <div className="space-y-2.5 pt-3 border-t border-[#1f1f26] text-xs">
                  <div>
                    <span className="text-[#7e7c75] uppercase tracking-[0.15em] text-[10px] block">
                      Leather Tannery
                    </span>
                    <span className="text-[#f5f3ef] font-medium">
                      {currentShoe.leather}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#7e7c75] uppercase tracking-[0.15em] text-[10px] block">
                      Construction Method
                    </span>
                    <span className="text-[#f5f3ef] font-medium">
                      {currentShoe.construction}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#7e7c75] uppercase tracking-[0.15em] text-[10px] block">
                      Shoe Last Geometry
                    </span>
                    <span className="text-[#f5f3ef] font-medium">
                      {currentShoe.last}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#7e7c75] uppercase tracking-[0.15em] text-[10px] block">
                      Artisanal Atelier Effort
                    </span>
                    <span className="text-[#c5a880] font-mono tabular-nums font-semibold">
                      {currentShoe.artisanHours} Hours of Single Master Labor
                    </span>
                  </div>
                </div>

                {/* Patina Colorway Selector */}
                <div className="pt-3 border-t border-[#1f1f26]">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#8e8c85] block mb-2">
                    Patina Finishes
                  </label>
                  <div className="flex gap-2">
                    {currentShoe.colorways.map((cw, idx) => (
                      <button
                        key={cw.id}
                        onClick={() => {
                          sounds.playSoftClick();
                          setActivePatinaIdx(idx);
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs transition-colors ${
                          activePatinaIdx === idx
                            ? 'border-[#c5a880] bg-[#1d1a15] text-[#f5f3ef]'
                            : 'border-[#22222b] text-[#8e8c85] hover:text-[#f5f3ef]'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/30"
                          style={{ backgroundColor: cw.hex }}
                        />
                        <span>{cw.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleQuickAdd}
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
                    <span>Added to Bag (EU 42)</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Reserve Ready Pair ({formatPrice(currentShoe.price, currency)})</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  sounds.playSoftClick();
                  onSelectShoeForBespoke(currentShoe);
                }}
                className="w-full py-3 bg-[#141418] hover:bg-[#1c1c22] border border-[#2b2b36] hover:border-[#c5a880]/50 text-[#f5f3ef] text-xs uppercase tracking-[0.2em] font-medium rounded transition-colors flex items-center justify-center gap-2"
              >
                <span>Customize in Bespoke Studio</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#c5a880]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
