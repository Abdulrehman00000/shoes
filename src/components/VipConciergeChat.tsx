import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Crown, 
  CheckCheck, 
  Clock, 
  Paperclip,
  Phone,
  ShieldCheck,
  Volume2,
  VolumeX
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface Message {
  id: string;
  sender: 'concierge' | 'client';
  text: string;
  timestamp: string;
  orderRef?: string;
}

interface VipConciergeChatProps {
  currentOrderId?: string;
}

export const VipConciergeChat: React.FC<VipConciergeChatProps> = ({ currentOrderId = 'AV-849201' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'concierge',
      text: 'Bonjour Monsieur. I am Camille Laurent, your dedicated Private Client Director at Place Vendôme. How may our workshop assist your bespoke commission today?',
      timestamp: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.05;
      utterance.rate = 0.95;
      // Try to find a cultured French or English voice
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((v) => v.lang.includes('fr') || v.name.includes('French') || v.name.includes('Serena')) ||
        voices.find((v) => v.lang.includes('en-GB') || v.name.includes('Oliver') || v.name.includes('Victoria'));
      if (preferred) utterance.voice = preferred;
      window.speechSynthesis.speak(utterance);
    } catch {}
  };

  const quickPrompts = [
    `Status of Commission #${currentOrderId}`,
    'What footwear pairs with a navy chalk stripe suit?',
    'Can I adjust my waist monogram foil?',
    'Book private champagne fitting in Paris',
    'Care guide for mirror glaçage toe cap',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    sounds.playSoftClick();
    const newMsg: Message = {
      id: `client-${Date.now()}`,
      sender: 'client',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      sounds.playLuxuryChime();
      let replyText =
        'Thank you for your message. Master Cordwainer Laurent Moreau has noted your instruction in the workshop ledger. A formal update will accompany your dossier shortly.';

      const lower = text.toLowerCase();
      if (lower.includes('status') || lower.includes('stage') || lower.includes('av-') || lower.includes('where is')) {
        replyText = `Regarding commission #${currentOrderId}: your pair is currently at our workbench in Place Vendôme. The Goodyear welt has passed inspection and the crystallized wax glaçage is underway. You can also view real-time stage photography in our Client Order Portal above.`;
      } else if (lower.includes('suit') || lower.includes('navy') || lower.includes('chalk') || lower.includes('outfit') || lower.includes('pair')) {
        replyText = 'For a navy chalk stripe suit, we unequivocally recommend The Medici Double Monk Strap in Cognac Imperial or The Vendôme Wholecut in Bordeaux Riserva. The warm chestnut and deep wine undertones create an impeccable Florentine sprezzatura contrast against cool navy wool.';
      } else if (lower.includes('monogram') || lower.includes('foil') || lower.includes('initial')) {
        replyText = 'Certainly. We can execute your initials in either 24k French Gold Leaf or blind debossing on the fiddleback waist, as well as engraved initials onto flush brass toe protectors. Simply confirm your preferred lettering and we will mark it upon your carved wooden last.';
      } else if (lower.includes('book') || lower.includes('fitting') || lower.includes('salon') || lower.includes('appointment')) {
        replyText = 'It would be our honor. Our private salon at 12 Place Vendôme is at your disposal with bespoke foot biomechanics casting and rare single malt tastings. Would you prefer a morning or afternoon appointment this week?';
      } else if (lower.includes('glaçage') || lower.includes('care') || lower.includes('polish') || lower.includes('clean')) {
        replyText = 'To preserve your unclouded mirror glaçage, apply single drops of chilled mineral water alternated with Saphir Medaille d’Or carnauba wax using circular fingertip strokes. We also invite you to explore our interactive Care Masterclass on the atelier floor.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `concierge-${Date.now()}`,
          sender: 'concierge',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
      speakText(replyText);
    }, 1100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => {
              sounds.playSoftClick();
              setIsOpen(true);
            }}
            className="group relative flex items-center gap-3 px-4 py-3.5 bg-[#121217] hover:bg-[#1c1c24] border border-[#c5a880]/70 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            aria-label="Open VIP Concierge Chat"
          >
            <span className="absolute -inset-1 rounded-full bg-[#c5a880]/20 blur-sm group-hover:bg-[#c5a880]/40 transition-all pointer-events-none" />

            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#947346] to-[#e6d3b3] p-0.5 flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-full bg-[#0c0c0e] flex items-center justify-center text-[#c5a880]">
                <Crown className="w-4 h-4" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#0c0c0e]" />
            </div>

            <div className="text-left pr-1 hidden sm:block">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold">
                VIP Concierge
              </div>
              <div className="text-[11px] text-[#f5f3ef] font-serif">
                Mme. Camille Laurent
              </div>
            </div>

            <MessageSquare className="w-4 h-4 text-[#c5a880] shrink-0" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Concierge Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-[calc(100vw-3rem)] sm:w-96 h-[540px] max-h-[80vh] bg-[#0d0d12] border border-[#2b2b3a] rounded-xl shadow-2xl flex flex-col overflow-hidden text-[#f5f3ef]"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#14141c] to-[#0e0e14] border-b border-[#222230] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-[#c5a880] to-[#e6d3b3] p-0.5 shrink-0">
                  <div className="w-full h-full rounded-full bg-[#0c0c0e] flex items-center justify-center text-[#c5a880]">
                    <Crown className="w-4 h-4" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#0c0c0e]" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-sm text-[#f5f3ef]">Camille Laurent</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
                  </div>
                  <div className="text-[10px] text-[#8e8c85]">
                    Senior Private Client Director · Paris
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    sounds.playSoftClick();
                    setVoiceEnabled(!voiceEnabled);
                  }}
                  title={voiceEnabled ? 'Mute Madame Camille voice' : 'Enable Madame Camille voice readout'}
                  className="p-1.5 text-[#8e8c85] hover:text-[#c5a880] rounded transition-colors"
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4 text-[#c5a880]" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => {
                    sounds.playSoftClick();
                    setIsOpen(false);
                  }}
                  className="p-1.5 text-[#8e8c85] hover:text-[#f5f3ef] rounded transition-colors"
                  aria-label="Close Concierge Chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Active Order Banner */}
            {currentOrderId && (
              <div className="px-4 py-2 bg-[#121219] border-b border-[#1c1c28] flex items-center justify-between text-[11px]">
                <span className="text-[#8e8c85]">Active Commission:</span>
                <span className="font-mono text-[#c5a880] font-semibold">{currentOrderId}</span>
              </div>
            )}

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {messages.map((msg) => {
                const isClient = msg.sender === 'client';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isClient
                          ? 'bg-[#c5a880] text-[#0c0c0e] rounded-br-xs font-medium'
                          : 'bg-[#181822] text-[#f5f3ef] border border-[#262635] rounded-bl-xs font-light'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-[#6e6c65] mt-1 px-1 flex items-center gap-1">
                      {msg.timestamp}
                      {isClient && <CheckCheck className="w-3 h-3 text-[#c5a880]" />}
                    </span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 bg-[#181822] border border-[#262635] rounded-2xl rounded-bl-xs w-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-3 py-2 bg-[#0e0e13] border-t border-[#1c1c28] overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 bg-[#14141c] hover:bg-[#20202c] border border-[#222230] hover:border-[#c5a880]/60 rounded text-[10px] text-[#a09e98] hover:text-[#f5f3ef] transition-colors shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[#111116] border-t border-[#20202c] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Inquire with private director..."
                className="flex-1 px-3 py-2 bg-[#0a0a0d] border border-[#22222d] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none placeholder:text-[#6e6c65]"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 bg-[#c5a880] hover:bg-[#d8ba8d] disabled:opacity-40 text-[#0c0c0e] rounded transition-all shrink-0"
                aria-label="Send Inquiry"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
