import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Droplets, Flame, Wind, CheckCircle2, RotateCcw, ShieldCheck, Award } from 'lucide-react';
import { sounds } from '../utils/audio';
import { IMAGES } from '../data/shoesData';

export const ShoeCareMasterclass: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [glaceProgress, setGlaceProgress] = useState(35); // 0 to 100%
  const [isRubbing, setIsRubbing] = useState(false);

  const steps = [
    {
      num: '01',
      title: 'Horsehair Dusting & Welt Clearing',
      product: 'Boar & Horsehair Bristle Brush',
      desc: 'Dislodge street microscopic dust from the welt channels using rapid 45-degree wrist sweeps. Never apply creams over un-brushed leather.',
      actionLabel: 'Perform Dusting Sweep',
      sound: () => sounds.playGlaceRub(),
    },
    {
      num: '02',
      title: 'Crème Renovatrice Nourishment',
      product: 'Mink Oil & Natural Beeswax Balm',
      desc: 'Massage dime-sized portions in circular clockwise motions to rehydrate the aniline box calfskin collagen fibrils and restore tensile elasticity.',
      actionLabel: 'Massage Rehydrating Balm',
      sound: () => sounds.playGlaceRub(),
    },
    {
      num: '03',
      title: 'Pigment Crystallization',
      product: 'Pâte de Luxe Deep Carnauba Wax',
      desc: 'Layer dense pigmented wax across the stiffened toe cap and heel counter. The waist and vamp flex zones remain un-waxed to prevent cracking.',
      actionLabel: 'Apply Carnauba Base Layer',
      sound: () => sounds.playGlaceRub(),
    },
    {
      num: '04',
      title: 'The Mirror Glaçage Ritual',
      product: 'Ice Droplets & High-Purity Wax',
      desc: 'Alternate single drops of chilled mineral water with micro-amounts of carnauba. 1,200 featherlight friction strokes level the wax pores into glass.',
      actionLabel: 'Interactive Mirror Rubbing',
      sound: () => sounds.playGlaceRub(),
    },
  ];

  const handleInteractiveRub = () => {
    sounds.playGlaceRub();
    setIsRubbing(true);
    setTimeout(() => setIsRubbing(false), 200);
    setGlaceProgress((prev) => Math.min(100, prev + 12));
    if (glaceProgress + 12 >= 100) {
      sounds.playLuxuryChime();
    }
  };

  const handleResetGlace = () => {
    sounds.playSoftClick();
    setGlaceProgress(20);
  };

  return (
    <section id="care-masterclass" className="py-24 bg-[#0a0a0d] border-b border-[#1f1f26] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1b1b22]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#a09e98] mb-3">
              <span>Atelier Preservation Ritual</span>
              <span aria-hidden="true" className="text-[#c5a880]">·</span>
              <span>Generational Longevity</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f5f3ef]">
              The Mirror Glaçage Masterclass
            </h2>
          </div>
          <p className="text-sm text-[#8e8c85] max-w-md font-light leading-relaxed">
            A bespoke Goodyear-welted pair will endure thirty to fifty years when tended with the classic four-step Parisian cordwainer ritual.
          </p>
        </div>

        {/* 2-Column Split: Step-by-Step Guide + Interactive Polishing Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-center">
          {/* Left: 4-Step Interactive Steps (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((st, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={st.num}
                  onClick={() => {
                    sounds.playSoftClick();
                    setActiveStep(idx);
                  }}
                  className={`cursor-pointer p-4 rounded border transition-all ${
                    isSelected
                      ? 'border-[#c5a880] bg-[#171512] shadow-lg'
                      : 'border-[#1f1f28] bg-[#101014] hover:border-[#2f2f3d]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs ${isSelected ? 'text-[#c5a880] font-bold' : 'text-[#6e6c65]'}`}>
                        {st.num}
                      </span>
                      <h4 className={`font-serif text-base ${isSelected ? 'text-[#f5f3ef]' : 'text-[#a09e98]'}`}>
                        {st.title}
                      </h4>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#c5a880]" />}
                  </div>

                  <div className="text-[10px] text-[#c5a880] uppercase tracking-[0.1em] mt-1 pl-7">
                    {st.product}
                  </div>

                  {isSelected && (
                    <p className="text-xs text-[#b8b5ad] leading-relaxed mt-2.5 pt-2.5 border-t border-[#25221b] font-light pl-7">
                      {st.desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Interactive Mirror Glaze Simulator (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-7 bg-[#111116] border border-[#22222f] rounded-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#1f1f2a] pb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880]">
                    Live Cordwainer Workbench
                  </div>
                  <h3 className="font-serif text-xl text-[#f5f3ef]">
                    Toe Cap Mirror Crystallization
                  </h3>
                </div>

                <button
                  onClick={handleResetGlace}
                  className="flex items-center gap-1.5 text-xs text-[#8e8c85] hover:text-[#f5f3ef] transition-colors"
                  title="Reset polish"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Shoe toe box graphic with dynamic shine layer */}
              <div
                onClick={handleInteractiveRub}
                className="relative aspect-[16/10] rounded overflow-hidden border border-[#272738] bg-[#0c0c0e] cursor-pointer group select-none shadow-2xl"
              >
                <img
                  src={IMAGES.oxfordNero}
                  alt="Mirror toe box polishing"
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    isRubbing ? 'scale-[1.01]' : ''
                  }`}
                />

                {/* Dynamic Crystalline Reflection Overlay */}
                <div
                  style={{ opacity: glaceProgress / 100 }}
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#c5a880]/15 to-white/25 pointer-events-none transition-opacity duration-300 backdrop-contrast-125"
                />

                {/* Interactive Click Instruction Pulse */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/40 group-hover:bg-black/20 transition-colors pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-[#0c0c0e]/90 border border-[#c5a880] flex items-center justify-center text-[#c5a880] mb-2 shadow-2xl animate-pulse">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="bg-[#0c0c0e]/90 border border-[#2d2d3d] px-3.5 py-1.5 rounded text-xs text-[#f5f3ef] uppercase tracking-[0.15em] font-medium backdrop-blur-md">
                    Click repeatedly to rub & crystallize mirror
                  </div>
                </div>

                {/* Live Gloss Level Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 bg-[#0c0c0e]/85 backdrop-blur-md border border-[#242432] rounded">
                  <div className="text-xs">
                    <span className="text-[#8e8c85] block text-[10px] uppercase tracking-[0.15em]">
                      Optical Reflectivity:
                    </span>
                    <span className="font-serif text-sm text-[#f5f3ef]">
                      {glaceProgress < 50
                        ? 'Natural Satin Patina'
                        : glaceProgress < 85
                        ? 'High-Gloss Salon Glaze'
                        : 'Unclouded Place Vendôme Mirror Glaçage'}
                    </span>
                  </div>

                  <div className="font-mono tabular-nums text-lg font-bold text-[#c5a880]">
                    {glaceProgress}%
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="w-full h-2 bg-[#1b1b26] rounded-full overflow-hidden">
                  <div
                    style={{ width: `${glaceProgress}%` }}
                    className="h-full bg-gradient-to-r from-[#947346] via-[#c5a880] to-[#f5f3ef] transition-all duration-300"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#7e7c75] uppercase tracking-wider">
                  <span>Matte Hide</span>
                  <span>Mirror Crystal</span>
                </div>
              </div>

              {/* Cordwainer Pro-Tip */}
              <div className="p-3.5 bg-[#14141a] border border-[#242432] rounded text-xs text-[#a09e98] flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <span>
                  <strong>Master Moreau's Law:</strong> Only wax the rigid counter and cap. Flexible leather must be conditioned solely with light emulsions to guarantee a lifetime of crease-free elegance.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
