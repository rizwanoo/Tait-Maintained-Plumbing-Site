import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { BRAND_ASSETS } from '../data/businessData';
import { TouchButton } from './TouchButton';
import {
  Calendar,
  FileText,
  Phone,
  Flame,
  Wrench,
  Users,
  ChevronDown
} from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { config, openBooking, openQuote } = useConfig();

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#FDFDFE] text-[#0d2030] pt-28 pb-14 lg:pt-32 lg:pb-16">
      
      {/* Crisp Architectural Background (No pulsating glow) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Ambient Brand Tones */}
        <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full bg-[#6FC5ED]/15 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-[450px] h-[450px] rounded-full bg-[#DCE6ED]/50 blur-3xl" />

        {/* Clean Blueprint Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035]" 
          style={{
            backgroundImage: `radial-gradient(#2A9FE4 1.2px, transparent 1.2px)`,
            backgroundSize: '28px 28px'
          }}
        />
        
        {/* Soft bottom blend to next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFDFE] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Main Hero Column (Left) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6">
            
            {/* Tagline / Social Proof Badge */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE6ED]/80 border border-[#6FC5ED]/50 text-[#0d2030] text-xs font-bold tracking-wide uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#2A9FE4]"></span>
                <span>Plumbing • Heating • Peace of Mind</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FDFDFE] border border-[#DCE6ED] text-[#0d2030]/80 text-xs font-semibold shadow-xs">
                <Users className="w-3.5 h-3.5 text-[#2A9FE4]" />
                <span>{config.facebookFollowers.split('•')[0]}</span>
              </div>
            </div>

            {/* Primary Headline with Brand Color Accent */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading tracking-tight text-[#0d2030] leading-[1.08]">
              Plumbing. Heating.{' '}
              <span className="text-[#2A9FE4]">
                Peace of Mind.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg lg:text-xl text-[#0d2030]/80 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Reliable plumbing and heating solutions, delivered with care, practical knowledge, and thorough attention to detail.
            </p>

            {/* Quote badge from social presence */}
            <div className="bg-[#FDFDFE] border border-[#DCE6ED] rounded-2xl p-4 max-w-xl mx-auto lg:mx-0 shadow-sm flex items-start gap-3 text-left">
              <div className="p-2 rounded-xl bg-[#DCE6ED] text-[#2A9FE4] shrink-0">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-[#0d2030] font-medium italic">
                  “Little bit of everything plumbing & more 🤷🏽‍♂️ • Learning everyday, spreading knowledge along the way 🫡”
                </p>
                <p className="text-[11px] text-[#2A9FE4] font-bold tracking-wider uppercase mt-1">
                  — The Tait Maintained Ethos
                </p>
              </div>
            </div>

            {/* Action Buttons: Solid, high-reliability CTAs with unified touch-friendly wrappers */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2 w-full">
              <TouchButton
                onClick={() => openBooking()}
                variant="primary"
                size="lg"
                icon={<Calendar className="w-4 h-4" />}
              >
                BOOK A SERVICE
              </TouchButton>

              <TouchButton
                onClick={() => openQuote()}
                variant="outline"
                size="lg"
                icon={<FileText className="w-4 h-4 text-[#2A9FE4]" />}
              >
                REQUEST A QUOTE
              </TouchButton>

              <TouchButton
                href="tel:+14036130819"
                variant="secondary"
                size="lg"
                icon={<Phone className="w-4 h-4 text-[#2A9FE4]" />}
              >
                (403) 613-0819
              </TouchButton>
            </div>

            {/* Quick Guarantees & Features */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#DCE6ED] text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2A9FE4]"></div>
                <span className="text-xs text-[#0d2030] font-semibold">Clear Advice</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#6FC5ED]"></div>
                <span className="text-xs text-[#0d2030] font-semibold">Clean Work</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2A9FE4]"></div>
                <span className="text-xs text-[#0d2030] font-semibold">Knowledge First</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Card with Official Logo Display */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Clean Glass Brand Card Container */}
              <div className="relative rounded-3xl bg-[#FDFDFE] border border-[#DCE6ED] p-4 sm:p-5 shadow-xl">
                
                {/* Logo Showcase Container */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#DCE6ED]/40 via-[#FDFDFE] to-[#DCE6ED]/20 border border-[#DCE6ED] flex flex-col items-center justify-center p-6">
                  
                  {/* Floating Identity Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-[#FDFDFE]/95 border border-[#DCE6ED] text-[11px] font-bold text-[#2A9FE4] tracking-wide uppercase shadow-xs">
                      Official Brand
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#2A9FE4] text-[#FDFDFE] text-[11px] font-semibold shadow-xs">
                      Tait Maintained
                    </span>
                  </div>

                  {/* Central High-Resolution Logo Display */}
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-md ring-4 ring-[#6FC5ED]/20 bg-[#FDFDFE] my-auto">
                    <img
                      src={BRAND_ASSETS.logo}
                      alt="Tait Maintained Official Brand Logo"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Bottom Brand Positioning Bar */}
                  <div className="w-full pt-3 text-center border-t border-[#DCE6ED]/80 mt-2">
                    <p className="font-heading font-black text-sm sm:text-base text-[#0d2030] tracking-tight">
                      TAIT MAINTAINED
                    </p>
                    <p className="text-[11px] font-bold text-[#2A9FE4] font-mono-code uppercase tracking-wider">
                      Plumbing • Heating • Peace of Mind
                    </p>
                  </div>
                </div>

                {/* Micro Highlights under Logo card */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#DCE6ED]/40 border border-[#DCE6ED] flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#2A9FE4] shrink-0" />
                    <div>
                      <p className="font-bold text-[#0d2030] text-[11px]">Heating Care</p>
                      <p className="text-[10px] text-[#0d2030]/60">Hydronic & system checks</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#DCE6ED]/40 border border-[#DCE6ED] flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#2A9FE4] shrink-0" />
                    <div>
                      <p className="font-bold text-[#0d2030] text-[11px]">Plumbing Repair</p>
                      <p className="text-[10px] text-[#0d2030]/60">Diagnostics & maintenance</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="hidden md:flex justify-center mt-10">
          <button
            type="button"
            onClick={scrollToServices}
            className="flex flex-col items-center gap-1.5 text-xs text-[#0d2030]/60 hover:text-[#2A9FE4] transition-colors cursor-pointer"
            aria-label="Scroll to services"
          >
            <span className="font-semibold tracking-wider uppercase text-[10px]">Explore Services & Work</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#2A9FE4]" />
          </button>
        </div>

      </div>
    </section>
  );
};
