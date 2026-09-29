import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { GALLERY_ITEMS } from '../data/businessData';
import {
  Maximize2,
  Camera,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TouchButton } from './TouchButton';

export const FeaturedGallery: React.FC = () => {
  const { openLightbox, openBooking } = useConfig();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = ['all', 'Water Heaters', 'Heating', 'Plumbing'];

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#DCE6ED]/25 relative scroll-mt-12 border-y border-[#DCE6ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE6ED] border border-[#6FC5ED]/40 text-[#0d2030] text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5 text-[#2A9FE4]" />
              <span>Real Jobsite Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#0d2030] tracking-tight">
              Featured Work & Pipework
            </h2>
            <p className="text-[#0d2030]/75 text-base sm:text-lg">
              Genuine mechanical and residential plumbing projects completed with precision and clean craftsmanship.
            </p>
          </motion.div>

          {/* Filters with Layout Pill */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#DCE6ED]/80 rounded-2xl self-start md:self-auto">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer z-10 min-h-[44px] flex items-center justify-center ${
                    isActive ? 'text-[#FDFDFE] font-bold' : 'text-[#0d2030]/80 hover:text-[#0d2030]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="galleryFilterActive"
                      className="absolute inset-0 bg-[#2A9FE4] rounded-xl shadow-xs -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{filter === 'all' ? 'All Projects' : filter}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -20 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                onClick={() => openLightbox(item)}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl overflow-hidden bg-[#0d2030] border border-[#DCE6ED] shadow-sm hover:shadow-2xl hover:border-[#2A9FE4] transition-all duration-500 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-all duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2030] via-[#0d2030]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#FDFDFE]/90 backdrop-blur-md text-[11px] font-bold text-[#2A9FE4] border border-[#DCE6ED] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#2A9FE4] text-[#FDFDFE] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0d2030]/90 backdrop-blur-md border border-[#243b4d] text-[#FDFDFE] space-y-1.5 transition-transform duration-300">
                    <span className="text-[10px] font-mono-code text-[#6FC5ED] uppercase tracking-wider block font-bold">
                      {item.locationTag}
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#DCE6ED]/85 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Action Prompt */}
        <div className="mt-12 text-center max-w-lg mx-auto">
          <p className="text-sm text-[#0d2030]/75 mb-4">
            Have a specialized plumbing or heating challenge for your property?
          </p>
          <div className="flex justify-center">
            <TouchButton
              onClick={() => openBooking()}
              variant="primary"
              size="lg"
              icon={<Calendar className="w-4 h-4" />}
            >
              Book a Consultation or Service
            </TouchButton>
          </div>
        </div>

      </div>
    </section>
  );
};
