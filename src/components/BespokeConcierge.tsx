import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Check, Mail, Phone, Compass, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

export const BespokeConcierge: React.FC = () => {
  const [salonCity, setSalonCity] = useState('Paris');
  const [submitted, setSubmitted] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');

  const salons = [
    { city: 'Paris', address: '12 Place Vendôme, 75001', lead: 'Master Cordwainer Laurent Moreau' },
    { city: 'Milan', address: 'Via Monte Napoleone 8, 20121', lead: 'Artigiano Giovanni Rossi' },
    { city: 'London', address: '24 Savile Row, Mayfair W1S', lead: 'Master Cutter Edward Sterling' },
    { city: 'New York', address: '680 Madison Avenue, NY 10065', lead: 'Senior Bespoke Fitter Paul Vance' },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playLuxuryChime();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setClientName('');
      setClientPhone('');
      setPreferredDate('');
    }, 4000);
  };

  return (
    <section id="concierge" className="py-24 bg-[#0a0a0c] border-b border-[#1f1f26] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Private Concierge Salon Experience (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#a09e98]">
              <span>Private Salons</span>
              <span aria-hidden="true" className="text-[#c5a880]">·</span>
              <span>By Appointment Only</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f5f3ef]">
              Private Fitting & Master Consultation
            </h2>

            <p className="text-base text-[#b8b5ad] font-light leading-relaxed">
              Step into our wood-paneled salons for a complete anatomical 3D casting of your feet. We sculpt a dedicated hornbeam wooden last that resides in our Parisian archive for your lifetime commissions.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1f1f26]">
              {salons.map((salon) => (
                <button
                  key={salon.city}
                  type="button"
                  onClick={() => {
                    sounds.playSoftClick();
                    setSalonCity(salon.city);
                  }}
                  className={`p-3.5 text-left rounded border transition-all ${
                    salonCity === salon.city
                      ? 'border-[#c5a880] bg-[#1a1713]'
                      : 'border-[#1f1f26] bg-[#101014] hover:border-[#2f2f3d]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span className="text-xs font-serif text-[#f5f3ef] font-medium">
                      {salon.city} Salon
                    </span>
                  </div>
                  <div className="text-[11px] text-[#7e7c75] mt-1 truncate">
                    {salon.address}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Booking Form (6 Cols) */}
          <div className="lg:col-span-6">
            <div className="p-8 bg-[#111115] border border-[#22222b] rounded-sm relative">
              <div className="flex items-center justify-between pb-6 border-b border-[#1f1f26] mb-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880]">
                    Exclusive Session
                  </div>
                  <h3 className="font-serif text-xl text-[#f5f3ef]">
                    Request Salon Appointment — {salonCity}
                  </h3>
                </div>
                <Sparkles className="w-5 h-5 text-[#c5a880]" />
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#1c1a16] border border-[#c5a880] flex items-center justify-center text-[#c5a880]">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl text-[#f5f3ef]">
                    Appointment Requested
                  </h4>
                  <p className="text-xs text-[#8e8c85] max-w-sm mx-auto">
                    Our Private Concierge in {salonCity} will reach out via discreet telephone call to confirm your preferred hour and prepare refreshments.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.1em] text-[#8e8c85] mb-1">
                      Client Name & Salutation
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Monsieur Henri de Bourbon"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0a0a0d] border border-[#262632] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.1em] text-[#8e8c85] mb-1">
                        Telephone Number
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+33 1 42 68 00 00"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#0a0a0d] border border-[#262632] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.1em] text-[#8e8c85] mb-1">
                        Preferred Date
                      </label>
                      <input
                        required
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#0a0a0d] border border-[#262632] focus:border-[#c5a880] rounded text-xs text-[#f5f3ef] outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#c5a880] hover:bg-[#d8ba8d] text-[#0c0c0e] text-xs uppercase tracking-[0.2em] font-semibold rounded transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Private Salon Session</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-[#6e6c65] pt-2">
                    Complimentary fitting appointment includes foot biomechanics profiling and single malt tasting.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
