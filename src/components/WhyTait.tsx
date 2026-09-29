import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { BRAND_PILLARS } from '../data/businessData';
import {
  Check,
  X,
  Sparkles,
  Shield,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { TouchButton } from './TouchButton';

export const WhyTait: React.FC = () => {
  const { openBooking, openQuote } = useConfig();

  const comparisons = [
    {
      typical: 'Vague explanations and rushing to finish without explaining the root problem.',
      tait: 'Clear, patient walkthrough of what happened and how to keep your equipment running smoothly.',
    },
    {
      typical: 'Disorganized mechanical rooms with messy pipe routings and debris left behind.',
      tait: 'Clean, plumb pipework, properly secured fittings, and neat jobsite cleanup on every job.',
    },
    {
      typical: 'Treating heating and plumbing as purely transactional tasks.',
      tait: 'Delivering true peace of mind: safe hot water, balanced heat, and dependable home comfort.',
    },
  ];

  return (
    <section id="why-tait" className="py-20 lg:py-28 bg-[#FDFDFE] text-[#0d2030] relative overflow-hidden scroll-mt-12">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#6FC5ED]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-[#DCE6ED]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Sticky 2-Column Layout for Desktop Storytelling */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sticky Left Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE6ED] border border-[#6FC5ED]/40 text-[#0d2030] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#2A9FE4]" />
                <span>Built on Principles</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-[#0d2030] leading-[1.15]">
                Why Choose Tait Maintained?
              </h2>

              <p className="text-base sm:text-lg text-[#0d2030]/75 leading-relaxed">
                A craftsman mindset rooted in daily learning, transparent knowledge, and deep respect for your home mechanical systems.
              </p>

              <div className="p-4 rounded-2xl bg-[#DCE6ED]/40 border border-[#DCE6ED] space-y-2">
                <p className="text-xs font-bold text-[#0d2030] uppercase tracking-wider">
                  Our Direct Commitment
                </p>
                <p className="text-xs text-[#0d2030]/80 leading-relaxed italic">
                  “We treat every furnace room, water heater, and pipe valve with the exact same standard we would expect in our own family home.”
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 w-full">
                <TouchButton
                  onClick={() => openBooking()}
                  variant="primary"
                  size="md"
                >
                  Book with Tait
                </TouchButton>
                <TouchButton
                  onClick={() => openQuote()}
                  variant="secondary"
                  size="md"
                >
                  Request Quote
                </TouchButton>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Animated Pillars Flowing Down */}
          <div className="lg:col-span-7 space-y-6">
            {BRAND_PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, borderColor: '#2A9FE4' }}
                className="rounded-3xl p-7 sm:p-8 bg-[#FDFDFE] border border-[#DCE6ED] shadow-sm hover:shadow-xl transition-all duration-300 space-y-5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading font-black text-3xl text-[#2A9FE4]/60 group-hover:text-[#2A9FE4] transition-colors">
                    {pillar.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#DCE6ED] border border-[#6FC5ED]/30 flex items-center justify-center text-[#2A9FE4]">
                    <Shield className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-heading text-[#0d2030]">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#0d2030] font-medium italic bg-[#DCE6ED]/50 p-3.5 rounded-xl border border-[#DCE6ED]">
                  {pillar.quote}
                </p>

                <p className="text-[#0d2030]/75 text-sm leading-relaxed">
                  {pillar.description}
                </p>

                <div className="pt-3 border-t border-[#DCE6ED] flex items-center gap-2 text-xs text-[#2A9FE4] font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2A9FE4]"></div>
                  <span>Genuine commitment on every home visit</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* The Difference Comparison Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl bg-[#FDFDFE] border border-[#DCE6ED] p-6 sm:p-10 shadow-lg"
        >
          <div className="max-w-2xl mx-auto text-center mb-10 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#0d2030]">
              The Standard You Can Count On
            </h3>
            <p className="text-sm text-[#0d2030]/70">
              What sets our residential plumbing and heating approach apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparisons.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 p-5 rounded-2xl bg-[#DCE6ED]/30 border border-[#DCE6ED] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{item.typical}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#DCE6ED]/70 border border-[#6FC5ED]/40 text-[#0d2030] text-xs sm:text-sm font-semibold flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#2A9FE4] shrink-0 mt-0.5" />
                    <span>{item.tait}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-[#DCE6ED] w-full">
            <TouchButton
              onClick={() => openBooking()}
              variant="primary"
              size="md"
            >
              Book with Tait Maintained
            </TouchButton>
            <TouchButton
              onClick={() => openQuote()}
              variant="secondary"
              size="md"
            >
              Request a Project Quote
            </TouchButton>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
