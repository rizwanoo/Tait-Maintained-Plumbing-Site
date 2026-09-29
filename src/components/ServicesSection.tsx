import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { SERVICES_DATA } from '../data/businessData';
import {
  Wrench,
  Flame,
  Droplets,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Info,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TouchButton } from './TouchButton';

export const ServicesSection: React.FC = () => {
  const { openBooking, openServiceDrawer } = useConfig();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'plumbing', label: 'Plumbing Repairs' },
    { id: 'heating', label: 'Heating Systems' },
    { id: 'water_heaters', label: 'Water Heaters' },
    { id: 'maintenance', label: 'Property Maintenance' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'heating':
        return <Flame className="w-5 h-5 text-[#2A9FE4]" />;
      case 'water_heaters':
        return <Droplets className="w-5 h-5 text-[#2A9FE4]" />;
      case 'maintenance':
        return <ShieldCheck className="w-5 h-5 text-[#2A9FE4]" />;
      default:
        return <Wrench className="w-5 h-5 text-[#2A9FE4]" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FDFDFE] relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE6ED] border border-[#6FC5ED]/50 text-[#0d2030] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#2A9FE4]" />
              <span>Tailored Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#0d2030] tracking-tight">
              Plumbing & Heating Services
            </h2>
            <p className="text-[#0d2030]/75 text-base sm:text-lg">
              Methodical workmanship, transparent diagnostics, and dependable comfort for your home.
            </p>
          </motion.div>

          {/* Category Tabs with Animated Spring Pill */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 p-1.5 bg-[#DCE6ED]/70 backdrop-blur-md rounded-2xl self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer z-10 min-h-[44px] flex items-center justify-center ${
                    isActive ? 'text-[#2A9FE4] font-bold' : 'text-[#0d2030]/70 hover:text-[#0d2030]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="serviceTabActive"
                      className="absolute inset-0 bg-[#FDFDFE] rounded-xl shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid with Motion Stagger */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -6, borderColor: '#2A9FE4' }}
                className="bg-[#FDFDFE] rounded-3xl border border-[#DCE6ED] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[16/9] sm:aspect-[16/8] overflow-hidden bg-[#DCE6ED]/50">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2030]/80 via-[#0d2030]/20 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#FDFDFE]/90 backdrop-blur-md border border-[#DCE6ED] text-[11px] font-bold text-[#0d2030] tracking-wide uppercase shadow-xs">
                      {service.badge}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FDFDFE]/90 backdrop-blur-md flex items-center justify-center shadow-xs">
                    {getCategoryIcon(service.category)}
                  </div>

                  {/* Bottom Image Overlay Title */}
                  <div className="absolute bottom-4 left-4 right-4 text-[#FDFDFE]">
                    <h3 className="text-xl sm:text-2xl font-bold font-heading tracking-tight leading-snug drop-shadow-md">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-[#0d2030]/80 text-xs sm:text-sm leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Key points checklist */}
                    <div className="space-y-2 pt-2 border-t border-[#DCE6ED]">
                      <p className="text-[11px] font-bold text-[#0d2030] uppercase tracking-wider">
                        Key Work Performed:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {service.keyPoints.slice(0, 4).map((pt, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-[#0d2030]/75">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9FE4] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Zone */}
                  <div className="pt-4 border-t border-[#DCE6ED] flex flex-wrap items-center justify-between gap-2.5">
                    <button
                      type="button"
                      onClick={() => openServiceDrawer(service)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0d2030] hover:text-[#2A9FE4] active:scale-95 transition-all cursor-pointer group/btn min-h-[44px] px-2"
                    >
                      <Info className="w-4 h-4 text-[#2A9FE4]" />
                      <span>Learn Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <TouchButton
                      onClick={() => openBooking(service.id)}
                      variant="primary"
                      size="sm"
                      fullWidthOnMobile={false}
                      icon={<Calendar className="w-3.5 h-3.5" />}
                    >
                      Book Service
                    </TouchButton>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
