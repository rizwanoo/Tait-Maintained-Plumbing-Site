import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { BRAND_ASSETS } from '../data/businessData';
import {
  ShieldCheck,
  CheckCircle2,
  Wrench,
  BookOpen,
  HeartHandshake
} from 'lucide-react';
import { motion } from 'motion/react';
import { TouchButton } from './TouchButton';

export const TrustIntro: React.FC = () => {
  const { openBooking, openQuote } = useConfig();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
    },
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FDFDFE] relative overflow-hidden border-b border-[#DCE6ED]">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6FC5ED]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#DCE6ED]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE6ED]/70 border border-[#6FC5ED]/40 text-[#0d2030] text-xs font-bold tracking-wider uppercase shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2A9FE4]" />
            <span>The Tait Maintained Standard</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#0d2030] tracking-tight">
            “A Little Bit of Everything Plumbing & More.”
          </h2>

          <p className="text-base sm:text-lg text-[#0d2030]/80 leading-relaxed">
            Plumbing and heating shouldn’t be a source of stress or confusing technical talk. At Tait Maintained, we combine methodical jobsite craftsmanship with straightforward communication so you always know your home is in safe hands.
          </p>
        </motion.div>

        {/* 3 Core Trust Pillars Grid with Staggered Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          
          {/* Pillar 1 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, borderColor: '#2A9FE4' }}
            className="rounded-2xl p-7 sm:p-8 bg-[#DCE6ED]/30 border border-[#DCE6ED] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#DCE6ED] text-[#2A9FE4] flex items-center justify-center font-heading font-bold text-lg group-hover:scale-110 group-hover:bg-[#2A9FE4] group-hover:text-[#FDFDFE] transition-all duration-300">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#0d2030]">
                Knowledge & Transparency
              </h3>
              <p className="text-[#0d2030]/75 text-sm leading-relaxed">
                “Learning everyday, spreading knowledge along the way 🫡” — We take the time to walk you through what caused the issue, what options you have, and how to maintain your equipment.
              </p>
            </div>
            <div className="pt-6 border-t border-[#DCE6ED] mt-6 flex items-center gap-2 text-xs font-semibold text-[#2A9FE4]">
              <CheckCircle2 className="w-4 h-4 text-[#2A9FE4]" />
              <span>No confusing jargon</span>
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, borderColor: '#2A9FE4' }}
            className="rounded-2xl p-7 sm:p-8 bg-[#DCE6ED]/30 border border-[#DCE6ED] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#DCE6ED] text-[#2A9FE4] flex items-center justify-center font-heading font-bold text-lg group-hover:scale-110 group-hover:bg-[#2A9FE4] group-hover:text-[#FDFDFE] transition-all duration-300">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#0d2030]">
                Clean Craftsmanship
              </h3>
              <p className="text-[#0d2030]/75 text-sm leading-relaxed">
                Clean pipe routing, secured fittings, and orderly mechanical setups. We treat your property with the respect it deserves, maintaining neat work areas from start to finish.
              </p>
            </div>
            <div className="pt-6 border-t border-[#DCE6ED] mt-6 flex items-center gap-2 text-xs font-semibold text-[#2A9FE4]">
              <CheckCircle2 className="w-4 h-4 text-[#2A9FE4]" />
              <span>Respectful in-home service</span>
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, borderColor: '#2A9FE4' }}
            className="rounded-2xl p-7 sm:p-8 bg-[#DCE6ED]/30 border border-[#DCE6ED] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#DCE6ED] text-[#2A9FE4] flex items-center justify-center font-heading font-bold text-lg group-hover:scale-110 group-hover:bg-[#2A9FE4] group-hover:text-[#FDFDFE] transition-all duration-300">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#0d2030]">
                Peace of Mind
              </h3>
              <p className="text-[#0d2030]/75 text-sm leading-relaxed">
                Whether you need routine maintenance or a prompt repair on water heaters and heating lines, you can count on reliable communication and steady follow-through.
              </p>
            </div>
            <div className="pt-6 border-t border-[#DCE6ED] mt-6 flex items-center gap-2 text-xs font-semibold text-[#2A9FE4]">
              <CheckCircle2 className="w-4 h-4 text-[#2A9FE4]" />
              <span>Reliable communication</span>
            </div>
          </motion.div>

        </motion.div>

        {/* Feature Banner: Clean Warm Craftsmanship */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const }}
          className="mt-16 rounded-3xl bg-gradient-to-br from-[#DCE6ED]/60 via-[#FDFDFE] to-[#DCE6ED]/40 text-[#0d2030] p-8 sm:p-12 border border-[#6FC5ED]/40 shadow-xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold font-mono-code tracking-widest text-[#2A9FE4] uppercase">
                TAIT MAINTAINED PROMISE
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#0d2030]">
                “These are the people you want working on your home.”
              </h3>
              <p className="text-[#0d2030]/80 text-sm sm:text-base leading-relaxed">
                We take real pride in the mechanical systems that keep homes functional, safe, and warm. Have a question or an issue that needs checking? Let’s talk about it.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 w-full">
                <TouchButton
                  onClick={() => openBooking()}
                  variant="primary"
                  size="md"
                >
                  Book a Service
                </TouchButton>
                <TouchButton
                  onClick={() => openQuote()}
                  variant="outline"
                  size="md"
                >
                  Request a Free Quote
                </TouchButton>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl overflow-hidden border border-[#DCE6ED] aspect-square shadow-sm"
              >
                <img
                  src={BRAND_ASSETS.image2}
                  alt="Tait Maintained Heating Work"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl overflow-hidden border border-[#DCE6ED] aspect-square shadow-sm"
              >
                <img
                  src={BRAND_ASSETS.image3}
                  alt="Tait Maintained Plumbing Work"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
