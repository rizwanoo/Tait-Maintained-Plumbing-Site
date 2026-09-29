import React, { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';
import { BRAND_ASSETS } from '../data/businessData';
import {
  Search,
  Calendar,
  Menu,
  X,
  ChevronRight,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { TouchButton } from './TouchButton';

export const Navbar: React.FC = () => {
  const { openBooking, openSearch } = useConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('services');

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    setIsScrolled(latest > 25);

    // Intelligently hide when scrolling down significantly, show when scrolling up
    if (latest > 180 && diff > 10 && !mobileMenuOpen) {
      setIsHidden(true);
    } else if (diff < -5 || latest <= 100) {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    const handleScrollTracking = () => {
      const sections = ['services', 'gallery', 'why-tait', 'education'];
      const scrollPos = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollTracking, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollTracking);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Work', href: '#gallery', id: 'gallery' },
    { label: 'Why Us', href: '#why-tait', id: 'why-tait' },
    { label: 'Jobsite Tips', href: '#education', id: 'education' },
  ];

  const handleNavClick = (href: string, id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isHidden ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] as const }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDFDFE]/92 backdrop-blur-md shadow-sm border-b border-[#DCE6ED] py-2.5 sm:py-3'
          : 'bg-[#FDFDFE]/80 backdrop-blur-sm border-b border-[#DCE6ED]/70 py-3.5 sm:py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Branding & Vector Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
            aria-label="Tait Maintained Home"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className={`relative rounded-xl overflow-hidden ring-2 ring-[#6FC5ED]/40 bg-[#DCE6ED]/60 flex items-center justify-center shrink-0 transition-all duration-300 ${
                isScrolled ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-9 h-9 sm:w-10 sm:h-10'
              }`}
            >
              <img
                src={BRAND_ASSETS.logo}
                alt="Tait Maintained"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-heading font-black text-[#2A9FE4] text-sm pointer-events-none -z-10">
                TM
              </div>
            </motion.div>

            <span className={`font-heading font-bold text-[#0d2030] tracking-tight leading-none group-hover:text-[#2A9FE4] transition-all duration-300 ${
              isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
            }`}>
              Tait Maintained
            </span>
          </a>

          {/* Center: 4 Core Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.href, link.id)}
                  className={`relative py-1 text-sm font-semibold transition-colors cursor-pointer group ${
                    isActive ? 'text-[#2A9FE4] font-bold' : 'text-[#0d2030]/80 hover:text-[#2A9FE4]'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Underline Indicator with layout animation */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2A9FE4] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Zone: Global Search Trigger + Magnetic High-Contrast Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Global Search Icon Trigger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openSearch}
              className="p-2 sm:p-2.5 rounded-full text-[#0d2030] hover:text-[#2A9FE4] hover:bg-[#DCE6ED]/60 border border-transparent hover:border-[#DCE6ED] transition-all cursor-pointer flex items-center gap-1.5"
              title="Search services and tips"
              aria-label="Open search palette"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#2A9FE4]" />
              <span className="hidden xl:inline text-xs text-[#0d2030]/60 font-medium">Search...</span>
            </motion.button>

            {/* High-Contrast Primary Call-to-Action Button with Touch Target */}
            <TouchButton
              onClick={() => openBooking()}
              variant="primary"
              size="sm"
              fullWidthOnMobile={false}
              icon={<Calendar className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex"
            >
              Book a Service
            </TouchButton>

            {/* Mobile Animated Hamburger Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#0d2030] hover:text-[#2A9FE4] bg-[#DCE6ED]/70 hover:bg-[#DCE6ED] border border-[#DCE6ED] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>

        </div>
      </div>

      {/* Mobile Animated Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="md:hidden bg-[#FDFDFE]/98 backdrop-blur-xl border-b border-[#DCE6ED] overflow-hidden shadow-xl"
          >
            <div className="px-5 pt-3 pb-6 space-y-4">
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.05 }}
                    onClick={() => handleNavClick(link.href, link.id)}
                    className="flex items-center justify-between w-full py-2.5 px-3.5 text-sm font-semibold text-[#0d2030] hover:text-[#2A9FE4] hover:bg-[#DCE6ED]/50 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#2A9FE4]" />
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-3 border-t border-[#DCE6ED] space-y-2"
              >
                <TouchButton
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBooking();
                  }}
                  variant="primary"
                  size="md"
                  fullWidthOnMobile={true}
                  icon={<Calendar className="w-4 h-4 text-[#FDFDFE]" />}
                >
                  Book a Service
                </TouchButton>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openSearch();
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-[#0d2030] bg-[#DCE6ED]/60 hover:bg-[#DCE6ED] border border-[#DCE6ED] cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-[#2A9FE4]" />
                    <span>Search</span>
                  </button>

                  <a
                    href="tel:+14036130819"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-[#0d2030] bg-[#DCE6ED]/60 hover:bg-[#DCE6ED] border border-[#DCE6ED] text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#2A9FE4]" />
                    <span>(403) 613-0819</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
