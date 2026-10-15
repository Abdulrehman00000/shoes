import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Package, 
  Sparkles, 
  User, 
  MapPin, 
  Calendar,
  ArrowRight,
  FileText,
  AlertCircle,
  Video,
  Award,
  Printer
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { IMAGES, LUXURY_SHOES } from '../data/shoesData';
import { ProvenanceCertificateModal } from './ProvenanceCertificateModal';

export interface OrderStatusData {
  orderId: string;
  clientName: string;
  clientEmail: string;
  shoeName: string;
  shoeImage: string;
  patina: string;
  monogram: string;
  size: number;
  width: string;
  soleType: string;
  masterCordwainer: string;
  atelierLocation: string;
  estimatedDelivery: string;
  currentStageIndex: number;
  stages: {
    title: string;
    description: string;
    date: string;
    completed: boolean;
    inProgress: boolean;
  }[];
}

const PRESET_ORDERS: Record<string, OrderStatusData> = {
  'AV-849201': {
    orderId: 'AV-849201',
    clientName: 'Lord Alistair Sterling',
    clientEmail: 'alistair@sterling-holdings.co.uk',
    shoeName: 'The Vendôme Wholecut Oxford',
    shoeImage: IMAGES.oxfordNero,
    patina: 'Nero Obsidian Glaze',
    monogram: 'AS (24k Gold Foil)',
    size: 42.5,
    width: 'Standard (D)',
    soleType: 'Parisian Beveled Fiddleback Waist',
    masterCordwainer: 'Laurent Moreau (4th Gen Master)',
    atelierLocation: 'Atelier Place Vendôme, Paris',
    estimatedDelivery: 'October 28, 2026',
    currentStageIndex: 3,
    stages: [
      {
        title: 'Leather Selection & Clicker’s Cut',
        description: 'Single-piece French Box Calf inspected under calibrated daylight lamps and cut along natural tension lines.',
        date: 'Oct 14, 2026',
        completed: true,
        inProgress: false,
      },
      {
        title: 'Lasting & Vamp Conditioning',
        description: 'Upper blocked manually over bespoke carved hornbeam last for 14 days to stabilize internal memory.',
        date: 'Oct 19, 2026',
        completed: true,
        inProgress: false,
      },
      {
        title: 'Sole Attachment & 360° Welting',
        description: 'Baker Oak bark sole lockstitched with pitch-waxed Flanders linen thread. Beveled waist hand-sculpted.',
        date: 'Oct 23, 2026',
        completed: true,
        inProgress: false,
      },
      {
        title: 'Mirror Glaçage & Final Polishing',
        description: 'Master cordwainer applying 1,200 micro-circles of carnauba wax and chilled water to crystallize the toe mirror.',
        date: 'In Progress',
        completed: false,
        inProgress: true,
      },
      {
        title: 'VIP Courier & Presentation Casing',
        description: 'Packed with custom cedar shoe trees and wax-sealed certificate of provenance into handmade leather travel casing.',
        date: 'Pending',
        completed: false,
        inProgress: false,
      },
    ],
  },
  'AV-312984': {
    orderId: 'AV-312984',
    clientName: 'Julian de Montmorency',
    clientEmail: 'julian@montmorency.fr',
    shoeName: 'The Medici Double Monk Strap',
    shoeImage: IMAGES.monkstrapCognac,
    patina: 'Cognac Imperial Patina',
    monogram: 'JM (Blind Embossed)',
    size: 43,
    width: 'Standard (D)',
    soleType: 'Baker Oak Sole with Brass Toe Protector',
    masterCordwainer: 'Giovanni Rossi',
    atelierLocation: 'Atelier Montegranaro, Tuscany',
    estimatedDelivery: 'November 04, 2026',
    currentStageIndex: 2,
    stages: [
      {
        title: 'Leather Selection & Clicker’s Cut',
        description: 'Vegetable-tanned Tuscan full grain hide selected and hand-shaved for buckle strapping.',
        date: 'Oct 18, 2026',
        completed: true,
        inProgress: false,
      },
      {
        title: 'Lasting & Vamp Conditioning',
        description: 'Leather soaked in mineral spring water and lasted onto Florentine almond wood form.',
        date: 'Oct 22, 2026',
        completed: true,
        inProgress: false,
      },
      {
        title: 'Sole Attachment & 360° Welting',
        description: 'Channeled Goodyear welt currently being hand-sewn with double boar bristle needles.',
        date: 'In Progress',
        completed: false,
        inProgress: true,
      },
      {
        title: 'Mirror Glaçage & Final Polishing',
        description: 'Hand-patina layering of seven warm botanical washes to achieve deep antique Cognac luster.',
        date: 'Upcoming',
        completed: false,
        inProgress: false,
      },
      {
        title: 'VIP Courier & Presentation Casing',
        description: 'Final quality audit by Head of Atelier before insured courier handover.',
        date: 'Upcoming',
        completed: false,
        inProgress: false,
      },
    ],
  },
};

interface ClientOrderPortalProps {
  recentOrderId?: string;
}

export const ClientOrderPortal: React.FC<ClientOrderPortalProps> = ({ recentOrderId }) => {
  const [orderInput, setOrderInput] = useState(recentOrderId || 'AV-849201');
  const [emailInput, setEmailInput] = useState('');
  const [activeOrder, setActiveOrder] = useState<OrderStatusData | null>(
    PRESET_ORDERS['AV-849201']
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLiveCameraActive, setIsLiveCameraActive] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  const handleLookup = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sounds.playSoftClick();
    setIsSearching(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsSearching(false);
      const cleanId = orderInput.trim().toUpperCase();

      if (PRESET_ORDERS[cleanId]) {
        setActiveOrder(PRESET_ORDERS[cleanId]);
        sounds.playLuxuryChime();
      } else if (cleanId.startsWith('AV-')) {
        const dynamicOrder: OrderStatusData = {
          orderId: cleanId,
          clientName: emailInput ? emailInput.split('@')[0] : 'Valued Client',
          clientEmail: emailInput || 'client@vendome-private.com',
          shoeName: LUXURY_SHOES[0].name,
          shoeImage: LUXURY_SHOES[0].image,
          patina: 'Bespoke Hand-Glazed Patina',
          monogram: 'AV (Gold Stamped)',
          size: 42,
          width: 'Standard (D)',
          soleType: 'Oak Bark Baker Leather Sole',
          masterCordwainer: 'Laurent Moreau (Master Cordwainer)',
          atelierLocation: 'Atelier Place Vendôme, Paris',
          estimatedDelivery: '14 Business Days',
          currentStageIndex: 1,
          stages: [
            {
              title: 'Leather Selection & Clicker’s Cut',
              description: 'Hide selected from current alpine batch. Clicker has completed precision pattern tracing.',
              date: 'Confirmed Today',
              completed: true,
              inProgress: false,
            },
            {
              title: 'Lasting & Vamp Conditioning',
              description: 'Vamp undergoing steam relaxation and wood lasting over hornbeam master block.',
              date: 'In Progress',
              completed: false,
              inProgress: true,
            },
            {
              title: 'Sole Attachment & 360° Welting',
              description: 'Goodyear welt channel prepared for hand-sewing with pitch-waxed thread.',
              date: 'Scheduled',
              completed: false,
              inProgress: false,
            },
            {
              title: 'Mirror Glaçage & Final Polishing',
              description: 'Crystallized wax glaçage scheduled upon sole burnishing.',
              date: 'Scheduled',
              completed: false,
              inProgress: false,
            },
            {
              title: 'VIP Courier & Presentation Casing',
              description: 'Complimentary signature packaging and insured express dispatch.',
              date: 'Pending',
              completed: false,
              inProgress: false,
            },
          ],
        };
        setActiveOrder(dynamicOrder);
        sounds.playLuxuryChime();
      } else {
        setErrorMessage('Dossier not found. Please verify your reference number (e.g. AV-849201).');
      }
    }, 400);
  };

  const handleSelectPreset = (id: string) => {
    sounds.playSoftClick();
    setOrderInput(id);
    setActiveOrder(PRESET_ORDERS[id]);
    setErrorMessage(null);
  };

  return (
    <section id="order-portal" className="py-24 bg-[#0a0a0d] border-b border-[#1f1f26] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1b1b22]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#a09e98] mb-3">
              <span>Bespoke Atelier Tracking</span>
              <span aria-hidden="true" className="text-[#c5a880]">·</span>
              <span>Client Order Portal</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f5f3ef]">
              Commission Status & Dossier
            </h2>
          </div>
          <p className="text-sm text-[#8e8c85] max-w-md font-light leading-relaxed">
            Follow the passage of your footwear through the hands of our master artisans. From clicker hide cutting to the final mirror glaçage.
          </p>
        </div>

        {/* Search & Verification Input Bar */}
        <div className="mt-10 p-6 bg-[#111115] border border-[#22222b] rounded-sm">
          <form onSubmit={handleLookup} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-5">
              <label className="block text-[11px] uppercase tracking-[0.15em] text-[#8e8c85] mb-2 font-medium">
                Commission Order ID
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#7e7c75] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={orderInput}
                  onChange={(e) => setOrderInput(e.target.value)}
                  placeholder="e.g. AV-849201"
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0a0d] border border-[#282835] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] uppercase tracking-wider font-mono outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-4">
              <label className="block text-[11px] uppercase tracking-[0.15em] text-[#8e8c85] mb-2 font-medium">
                Client Verification Email (Optional)
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="client@vendome-private.com"
                className="w-full px-4 py-3 bg-[#0a0a0d] border border-[#282835] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
              />
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full py-3 bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e] text-xs uppercase tracking-[0.2em] font-semibold rounded transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <span>Inspecting Archives...</span>
                ) : (
                  <>
                    <span>Inspect Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Previews */}
          <div className="mt-4 pt-4 border-t border-[#1a1a22] flex flex-wrap items-center gap-3 text-xs text-[#8e8c85]">
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#a09e98]">
              Sample Commissions:
            </span>
            <button
              type="button"
              onClick={() => handleSelectPreset('AV-849201')}
              className={`px-2.5 py-1 rounded border text-[11px] font-mono transition-colors ${
                orderInput === 'AV-849201'
                  ? 'border-[#c5a880] bg-[#1d1a15] text-[#c5a880]'
                  : 'border-[#262632] hover:border-[#383848] text-[#f5f3ef]'
              }`}
            >
              AV-849201 (Stage: Polishing)
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('AV-312984')}
              className={`px-2.5 py-1 rounded border text-[11px] font-mono transition-colors ${
                orderInput === 'AV-312984'
                  ? 'border-[#c5a880] bg-[#1d1a15] text-[#c5a880]'
                  : 'border-[#262632] hover:border-[#383848] text-[#f5f3ef]'
              }`}
            >
              AV-312984 (Stage: Welting)
            </button>
          </div>

          {errorMessage && (
            <div className="mt-3 p-3 bg-rose-950/40 border border-rose-800/60 rounded text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Order Status Dossier Display */}
        {activeOrder && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left: Commission Summary Card (4 cols) */}
            <div className="lg:col-span-4 p-6 bg-[#111115] border border-[#22222b] rounded-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#1b1b22] pb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-medium">
                    Commission Dossier
                  </div>
                  <h3 className="font-mono text-xl text-[#f5f3ef] font-semibold">
                    {activeOrder.orderId}
                  </h3>
                </div>
                <div className="text-right text-[11px] text-[#8e8c85]">
                  <span className="block text-[#f5f3ef] font-medium">{activeOrder.clientName}</span>
                </div>
              </div>

              {/* Product Visual */}
              <div className="relative aspect-[4/3] rounded overflow-hidden border border-[#202028] bg-[#0c0c0e]">
                <img
                  src={activeOrder.shoeImage}
                  alt={activeOrder.shoeName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#0c0c0e]/90 text-[#c5a880] text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 border border-[#2e2e38]">
                  EU {activeOrder.size} · {activeOrder.width}
                </div>
              </div>

              {/* Live Workbench Camera Feed Simulation Toggle */}
              <div className="p-3.5 bg-[#0e0e13] border border-[#20202c] rounded space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#f5f3ef]">
                    <Video className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span className="font-medium">Workbench Camera Feed</span>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playSoftClick();
                      setIsLiveCameraActive(!isLiveCameraActive);
                    }}
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border transition-colors ${
                      isLiveCameraActive
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                        : 'border-[#2d2d3d] text-[#888]'
                    }`}
                  >
                    {isLiveCameraActive ? 'Connected ● LIVE' : 'Connect Camera'}
                  </button>
                </div>

                {isLiveCameraActive && (
                  <div className="relative aspect-[16/9] rounded overflow-hidden border border-[#2b2b3b] bg-black">
                    <img
                      src={IMAGES.atelierHands}
                      alt="Live atelier workbench"
                      className="w-full h-full object-cover brightness-90 contrast-110"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 bg-red-950/80 border border-red-700/60 rounded text-[9px] text-red-200 uppercase font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      <span>CAM-01 VENDÔME BENCH #3</span>
                    </div>
                    <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[#c5a880] bg-black/70 px-1.5 py-0.5 rounded">
                      2026-10-14 21:49:02 CET
                    </div>
                  </div>
                )}
              </div>

              {/* Specifications Breakdown */}
              <div className="space-y-3 text-xs border-b border-[#1b1b22] pb-5">
                <div className="flex justify-between">
                  <span className="text-[#7e7c75]">Model</span>
                  <span className="text-[#f5f3ef] font-medium text-right">{activeOrder.shoeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7e7c75]">Patina Finish</span>
                  <span className="text-[#f5f3ef] text-right">{activeOrder.patina}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7e7c75]">Sole Profile</span>
                  <span className="text-[#f5f3ef] text-right">{activeOrder.soleType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7e7c75]">Monogram Stamp</span>
                  <span className="text-[#c5a880] font-mono text-right font-medium">{activeOrder.monogram}</span>
                </div>
              </div>

              {/* Artisan Attribution */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#8e8c85]">
                  <User className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Master: <strong className="text-[#f5f3ef] font-normal">{activeOrder.masterCordwainer}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-[#8e8c85]">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Workbench: <strong className="text-[#f5f3ef] font-normal">{activeOrder.atelierLocation}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-[#8e8c85]">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Target Handover: <strong className="text-[#c5a880] font-normal">{activeOrder.estimatedDelivery}</strong></span>
                </div>
              </div>

              {/* Certificate of Provenance Download Trigger */}
              <button
                onClick={() => {
                  sounds.playLuxuryChime();
                  setIsCertificateOpen(true);
                }}
                className="w-full py-3 bg-[#181822] hover:bg-[#222230] border border-[#2c2c3c] hover:border-[#c5a880]/60 rounded text-xs uppercase tracking-[0.15em] text-[#c5a880] font-medium transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Award className="w-4 h-4" />
                <span>Certificate of Provenance</span>
              </button>
            </div>

            {/* Right: Stage Timeline (8 cols) */}
            <div className="lg:col-span-8 p-6 sm:p-8 bg-[#111115] border border-[#22222b] rounded-sm space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b1b22] pb-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-medium">
                    Active Phase
                  </div>
                  <h3 className="font-serif text-2xl text-[#f5f3ef] mt-0.5">
                    Stage 0{activeOrder.currentStageIndex + 1}: {activeOrder.stages[activeOrder.currentStageIndex]?.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#171512] border border-[#c5a880]/40 rounded text-xs text-[#c5a880]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Live Atelier Update</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] uppercase tracking-[0.15em] text-[#8e8c85]">
                  <span>Atelier Progression</span>
                  <span className="font-mono tabular-nums text-[#c5a880]">
                    {Math.round(((activeOrder.currentStageIndex + 0.5) / activeOrder.stages.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#1a1a24] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeOrder.currentStageIndex + 0.5) / activeOrder.stages.length) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#a7885d] to-[#c5a880]"
                  />
                </div>
              </div>

              {/* 5-Step Detailed Visual Timeline */}
              <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#20202d]">
                {activeOrder.stages.map((stage, idx) => {
                  const isDone = stage.completed;
                  const isCurrent = stage.inProgress;
                  return (
                    <div key={idx} className="relative flex items-start gap-5 pl-2">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                          isDone
                            ? 'bg-[#c5a880] text-[#0c0c0e]'
                            : isCurrent
                            ? 'bg-[#0c0c0e] border-2 border-[#c5a880] text-[#c5a880]'
                            : 'bg-[#181822] border border-[#2b2b3b] text-[#555]'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : isCurrent ? (
                          <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-ping" />
                        ) : (
                          <span className="text-[10px] font-mono">{idx + 1}</span>
                        )}
                      </div>

                      <div
                        className={`flex-1 p-4 rounded border transition-all ${
                          isCurrent
                            ? 'bg-[#171512] border-[#c5a880]/60 shadow-lg'
                            : isDone
                            ? 'bg-[#121216] border-[#1f1f28]'
                            : 'bg-[#0e0e11] border-[#181820] opacity-60'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-[#c5a880]">
                              0{idx + 1}
                            </span>
                            <h4
                              className={`text-sm font-medium ${
                                isCurrent ? 'text-[#f5f3ef]' : isDone ? 'text-[#e0ded8]' : 'text-[#7e7c75]'
                              }`}
                            >
                              {stage.title}
                            </h4>
                          </div>
                          <span
                            className={`text-[11px] font-mono ${
                              isCurrent ? 'text-[#c5a880] font-semibold' : 'text-[#6e6c65]'
                            }`}
                          >
                            {stage.date}
                          </span>
                        </div>

                        <p className="text-xs text-[#9a9892] mt-2 leading-relaxed font-light">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Concierge Assistance Footer */}
              <div className="pt-6 border-t border-[#1b1b22] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e8c85]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                  <span>Insured under Lloyds Fine Art Specie Guarantee</span>
                </div>

                <a
                  href="#concierge"
                  onClick={() => sounds.playSoftClick()}
                  className="text-[#c5a880] hover:text-[#e2cb9f] uppercase tracking-[0.1em] text-[11px] underline underline-offset-4"
                >
                  Direct Cordwainer Inquiry →
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Certificate Modal */}
        {activeOrder && (
          <ProvenanceCertificateModal
            isOpen={isCertificateOpen}
            onClose={() => setIsCertificateOpen(false)}
            order={activeOrder}
          />
        )}
      </div>
    </section>
  );
};
