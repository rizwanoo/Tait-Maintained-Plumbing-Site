import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { BRAND_ASSETS } from '../data/businessData';
import {
  Instagram,
  Facebook,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Heart,
  Sliders,
  Sparkles,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, openBooking, openQuote, openSettings } = useConfig();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#FDFDFE] text-[#0d2030] border-t border-[#DCE6ED] pt-16 pb-24 sm:pb-16 relative overflow-hidden">
      
      {/* Background soft ambient accents */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#6FC5ED]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#DCE6ED]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#DCE6ED]">
          
          {/* Brand Info (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-[#6FC5ED]/40 bg-[#DCE6ED]/60 shrink-0">
                <img
                  src={BRAND_ASSETS.logo}
                  alt="Tait Maintained Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-[#0d2030] tracking-tight block">
                  Tait Maintained
                </span>
                <span className="text-[11px] font-bold text-[#2A9FE4] tracking-wider uppercase block">
                  Plumbing • Heating • Peace of Mind
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#0d2030]/75 leading-relaxed max-w-sm">
              Reliable residential plumbing, heating maintenance, water heaters, and peace of mind. Delivered with care, knowledge, and clean workmanship.
            </p>

            {/* Social Quotes */}
            <div className="p-3.5 rounded-2xl bg-[#DCE6ED]/40 border border-[#DCE6ED] text-xs text-[#0d2030] space-y-1">
              <p className="italic text-[#0d2030] font-medium">
                “Little bit of everything plumbing & more 🤷🏽‍♂️”
              </p>
              <p className="italic text-[#0d2030]/70">
                “Learning everyday, spreading knowledge along the way 🫡”
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#DCE6ED]/60 hover:bg-[#6FC5ED]/20 text-[#2A9FE4] border border-[#DCE6ED] transition-colors"
                title="Instagram"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={config.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#DCE6ED]/60 hover:bg-[#6FC5ED]/20 text-[#2A9FE4] border border-[#DCE6ED] transition-colors"
                title="Facebook (2.4K Followers)"
                aria-label="Facebook page"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={config.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#DCE6ED]/60 hover:bg-[#6FC5ED]/20 text-[#2A9FE4] border border-[#DCE6ED] transition-colors"
                title="WhatsApp Direct (+1 403-613-0819)"
                aria-label="WhatsApp contact"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (Cols 6-8) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-bold text-sm text-[#0d2030] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#0d2030]/75">
              <li>
                <a href="#services" className="hover:text-[#2A9FE4] transition-colors">Plumbing & Heating Services</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#2A9FE4] transition-colors">Featured Jobsite Work</a>
              </li>
              <li>
                <a href="#why-tait" className="hover:text-[#2A9FE4] transition-colors">Why Tait Maintained</a>
              </li>
              <li>
                <a href="#education" className="hover:text-[#2A9FE4] transition-colors">Jobsite Knowledge & Tips</a>
              </li>
              <li>
                <a href="#social" className="hover:text-[#2A9FE4] transition-colors">Community (2.4K Followers)</a>
              </li>
              <li>
                <button
                  onClick={() => openBooking()}
                  className="text-[#2A9FE4] font-bold hover:underline cursor-pointer"
                >
                  Book a Service Online
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Operating Hours (Cols 9-12) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-sm text-[#0d2030] uppercase tracking-wider">
                Contact & Details
              </h4>
              <button
                onClick={openSettings}
                className="text-[11px] text-[#0d2030]/60 hover:text-[#2A9FE4] flex items-center gap-1 transition-colors cursor-pointer"
                title="Edit contact details"
              >
                <Sliders className="w-3.5 h-3.5 text-[#2A9FE4]" />
                <span>Edit Info</span>
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#2A9FE4] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#0d2030]">Call / Text</p>
                  <a
                    href="tel:+14036130819"
                    className="text-[#2A9FE4] hover:underline font-bold"
                  >
                    +1 (403) 613-0819
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#2A9FE4] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#0d2030]">Email Inquiries</p>
                  <a
                    href="mailto:taitmaintained@gmail.com"
                    className="text-[#0d2030]/80 hover:text-[#2A9FE4] hover:underline"
                  >
                    taitmaintained@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0d2030]/50 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#0d2030]">Service Territory</p>
                  <p className="text-[#0d2030]/70">{config.serviceArea}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#0d2030]/50 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#0d2030]">Operating Schedule</p>
                  <p className="text-[#0d2030]/70">{config.hours}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => openBooking()}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#FDFDFE] bg-[#2A9FE4] hover:bg-[#6FC5ED] transition-all cursor-pointer shadow-sm"
              >
                Book Service
              </button>
              <button
                type="button"
                onClick={() => openQuote()}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#0d2030] bg-[#DCE6ED]/70 hover:bg-[#DCE6ED] border border-[#DCE6ED] transition-colors cursor-pointer"
              >
                Get Quote
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0d2030]/60">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Tait Maintained. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#2A9FE4] font-mono-code text-[11px] font-bold">
              PLUMBING • HEATING • PEACE OF MIND
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#DCE6ED]/70 hover:bg-[#DCE6ED] text-[#0d2030] hover:text-[#2A9FE4] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
