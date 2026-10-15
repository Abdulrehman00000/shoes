import React from 'react';
import { motion } from 'motion/react';
import { X, Printer, Crown, ShieldCheck, Sparkles, Download } from 'lucide-react';
import { sounds } from '../utils/audio';
import { OrderStatusData } from './ClientOrderPortal';

interface ProvenanceCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderStatusData;
}

export const ProvenanceCertificateModal: React.FC<ProvenanceCertificateModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playLuxuryChime();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-[#141310] border-2 border-[#c5a880]/70 rounded shadow-2xl z-10 text-[#f5f3ef] overflow-hidden p-8 sm:p-12"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#8e8c85] hover:text-[#f5f3ef] transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Parchment Certificate Frame */}
        <div className="border border-[#c5a880]/40 p-6 sm:p-10 relative bg-[#0e0d0b] text-center space-y-6">
          {/* Subtle Corner Accents */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#c5a880]" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#c5a880]" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#c5a880]" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#c5a880]" />

          {/* Crest */}
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#947346] via-[#c5a880] to-[#f5f3ef] p-0.5 shadow-xl flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#12110e] flex items-center justify-center text-[#c5a880]">
              <Crown className="w-7 h-7" />
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-medium">
              Place Vendôme · Paris · Fondé en 1928
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f3ef] mt-1 tracking-wide">
              Certificat de Provenance & d'Authenticité
            </h2>
            <div className="text-xs uppercase tracking-[0.2em] text-[#8e8c85] mt-1">
              Bespoke Commission Dossier #{order.orderId}
            </div>
          </div>

          <p className="font-serif text-base sm:text-lg text-[#d8d5cb] italic leading-relaxed max-w-xl mx-auto">
            “This document formally certifies that the bespoke footwear commissioned by <strong className="text-[#f5f3ef] not-italic">{order.clientName}</strong> has been hand-welted in our Place Vendôme atelier under the direct stewardship of Master Cordwainer <strong className="text-[#c5a880] not-italic">{order.masterCordwainer}</strong>.”
          </p>

          {/* Details Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#2a2720] text-xs text-left">
            <div>
              <span className="text-[10px] uppercase text-[#7e7c75] block">Creation</span>
              <span className="font-medium text-[#f5f3ef]">{order.shoeName}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#7e7c75] block">Leather Tannery</span>
              <span className="font-medium text-[#f5f3ef]">Tanneries d'Annonay</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#7e7c75] block">Sole Architecture</span>
              <span className="font-medium text-[#f5f3ef]">{order.soleType}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#7e7c75] block">Monogram Stamping</span>
              <span className="font-mono text-[#c5a880] font-bold">{order.monogram}</span>
            </div>
          </div>

          {/* Seal & Signature Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left text-xs space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#7e7c75] block">
                Atelier Registration:
              </span>
              <div className="font-mono text-[#c5a880]">REG-PV-1928-849201</div>
              <div className="text-[11px] text-[#7e7c75]">Hide Batch: Lot #412-Alpine Box Calf</div>
            </div>

            {/* Simulated Hand Signature */}
            <div className="text-center sm:text-right">
              <div className="font-serif italic text-2xl text-[#c5a880] font-light">
                Laurent Moreau
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#8e8c85]">
                Master Cordwainer · Paris Atelier
              </div>
            </div>
          </div>
        </div>

        {/* Print / Action Buttons */}
        <div className="mt-6 flex justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-[#2b2b3b] text-xs uppercase tracking-[0.1em] text-[#8e8c85] rounded"
          >
            Dismiss
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e] text-xs uppercase tracking-[0.15em] font-semibold rounded flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Certificate</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
