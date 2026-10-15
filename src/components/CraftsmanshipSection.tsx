import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  Flame,
  CheckCircle2,
  TreePine,
  Feather
} from 'lucide-react';
import { IMAGES, CRAFTSMANSHIP_STAGES } from '../data/shoesData';
import { sounds } from '../utils/audio';

export const CraftsmanshipSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = CRAFTSMANSHIP_STAGES[activeStageIndex];

  const materials = [
    {
      name: 'French Box Calfskin',
      tannery: 'Tanneries d’Annonay, Rhône Valley',
      icon: Feather,
      detail: 'Aniline dyed without synthetic coatings, yielding a pore structure that breathes and develops a deep, noble patina over decades.',
    },
    {
      name: 'Baker Oak Bark Soles',
      tannery: 'J&FJ Baker & Co, Colyton Devon',
      icon: TreePine,
      detail: 'Tanned slowly for 14 months in sunken oak pits using river water. Yields unrivaled tensile density and natural water deterrence.',
    },
    {
      name: 'Aged Hornbeam Wood',
      tannery: 'Black Forest Hardwood Reserve',
      icon: ShieldCheck,
      detail: 'Dense, fibrous wood conditioned for five seasons before being hand-carved with spokeshaves into anatomical shoe lasts.',
    },
    {
      name: 'Pitch-Waxed Linen Cord',
      tannery: 'Artisanal Cordage, Flanders',
      icon: Flame,
      detail: 'Twin-strand flax spun by hand and saturated in organic pine pitch to seal welt punctures permanently against moisture.',
    },
  ];

  return (
    <section id="craftsmanship" className="py-24 bg-[#0a0a0c] border-b border-[#1f1f26] relative overflow-hidden">
      {/* Subtle gold glow background */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_bottom_right,_rgba(197,168,128,0.05),_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1b1b22]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#a09e98] mb-3">
              <span>Behind the Craftsmanship</span>
              <span aria-hidden="true" className="text-[#c5a880]">·</span>
              <span>180 Hours of Devotion</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f5f3ef]">
              The Art of Haute Cordonnerie
            </h2>
          </div>
          <p className="text-sm text-[#8e8c85] max-w-md font-light leading-relaxed">
            In our Tuscan atelier, industrial haste does not exist. Each pair is built one stitch at a time by cordwainers whose lineage traces back four generations.
          </p>
        </div>

        {/* Hero Atelier Visual & Stage Inspector Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-stretch">
          {/* Left: High-Res Master Cobbler Photo Showcase (7 Cols) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[16/10] lg:h-full min-h-[400px] rounded-sm overflow-hidden border border-[#262632] bg-[#111115]">
              <img
                src={IMAGES.atelierHands}
                alt="Master cobbler hand-stitching Goodyear welt in Tuscan atelier"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/90 via-[#0a0a0c]/20 to-transparent pointer-events-none" />

              {/* Atelier Note Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#0c0c0e]/90 backdrop-blur-md border border-[#2a2a35] rounded">
                <div className="flex items-center justify-between text-xs text-[#a09e98] mb-1">
                  <span className="uppercase tracking-[0.2em] text-[#c5a880]">Atelier Montegranaro</span>
                  <span>Firenze · Since 1928</span>
                </div>
                <p className="font-serif text-base sm:text-lg text-[#f5f3ef] italic">
                  “The hand feels what the eye cannot see—the secret density of leather under tension.”
                </p>
              </div>
            </div>
          </div>

          {/* Right: Interactive 4-Stage Workflow Timeline (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#8e8c85] font-medium pb-2 border-b border-[#1b1b22]">
              Artisanal Creation Journey
            </div>

            <div className="space-y-3">
              {CRAFTSMANSHIP_STAGES.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <motion.div
                    key={stage.number}
                    onClick={() => {
                      sounds.playSoftClick();
                      setActiveStageIndex(idx);
                    }}
                    className={`cursor-pointer p-4 rounded border transition-all duration-300 ${
                      isActive
                        ? 'border-[#c5a880] bg-[#171512] shadow-md shadow-black/30'
                        : 'border-[#1f1f26] bg-[#101014] hover:border-[#2f2f3d]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs tabular-nums font-semibold ${
                          isActive ? 'text-[#c5a880]' : 'text-[#6e6c65]'
                        }`}>
                          {stage.number}
                        </span>
                        <div>
                          <div className={`font-serif text-base sm:text-lg ${
                            isActive ? 'text-[#f5f3ef]' : 'text-[#b8b5ad]'
                          }`}>
                            {stage.title}
                          </div>
                          <div className="text-[11px] text-[#7e7c75] uppercase tracking-[0.1em]">
                            {stage.subtitle}
                          </div>
                        </div>
                      </div>

                      {isActive && (
                        <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-1" />
                      )}
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-xs text-[#b8b5ad] font-light leading-relaxed mt-3 pt-3 border-t border-[#2a2720]"
                        >
                          {stage.text}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Noble Materials Provenance Grid */}
        <div className="mt-20 pt-16 border-t border-[#1b1b22]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium mb-2">
              Traceable Provenance
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f3ef]">
              Four Pillars of Uncompromising Materiality
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((mat, i) => {
              const Icon = mat.icon;
              return (
                <div
                  key={i}
                  className="p-6 bg-[#111115] border border-[#1f1f26] rounded-sm hover:border-[#383848] transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded bg-[#181820] border border-[#262632] flex items-center justify-center text-[#c5a880] mb-4 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-lg text-[#f5f3ef] mb-1">
                      {mat.name}
                    </h4>
                    <div className="text-[11px] text-[#c5a880] uppercase tracking-[0.1em] mb-3">
                      {mat.tannery}
                    </div>
                    <p className="text-xs text-[#8e8c85] font-light leading-relaxed">
                      {mat.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
