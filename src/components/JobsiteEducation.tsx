import React, { useState } from 'react';
import { EDUCATION_ARTICLES } from '../data/businessData';
import {
  BookOpen,
  Clock,
  Lightbulb,
  ChevronDown,
  Wrench
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { motion, AnimatePresence } from 'motion/react';
import { TouchButton } from './TouchButton';

export const JobsiteEducation: React.FC = () => {
  const { config, openBooking } = useConfig();
  const [expandedId, setExpandedId] = useState<string | null>(EDUCATION_ARTICLES[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="education" className="py-20 lg:py-28 bg-[#DCE6ED]/25 relative scroll-mt-12 border-y border-[#DCE6ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE6ED] border border-[#6FC5ED]/40 text-[#0d2030] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#2A9FE4]" />
            <span>Jobsite Knowledge</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#0d2030] tracking-tight">
            Knowledge from the Jobsite
          </h2>

          <p className="text-base sm:text-lg text-[#0d2030]/75">
            “Learning everyday, spreading knowledge along the way 🫡” — Practical tips, equipment care, and plumbing insights for homeowners.
          </p>
        </motion.div>

        {/* Guides List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {EDUCATION_ARTICLES.map((article, index) => {
            const isExpanded = expandedId === article.id;
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`rounded-3xl border transition-all duration-300 bg-[#FDFDFE] overflow-hidden ${
                  isExpanded
                    ? 'border-[#2A9FE4] shadow-xl ring-1 ring-[#2A9FE4]/30'
                    : 'border-[#DCE6ED] hover:border-[#6FC5ED] shadow-sm hover:shadow-md'
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleExpand(article.id)}
                  className="w-full p-6 sm:p-7 text-left flex items-start justify-between gap-4 cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#DCE6ED] text-[#0d2030] text-[11px] font-bold uppercase tracking-wider">
                        {article.tag}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-[#0d2030]/60 font-medium">
                        <Clock className="w-3 h-3 text-[#2A9FE4]" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-heading text-[#0d2030] leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#0d2030]/75 leading-relaxed">
                      {article.teaser}
                    </p>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`p-2 rounded-xl shrink-0 ${
                      isExpanded ? 'bg-[#2A9FE4] text-[#FDFDFE]' : 'bg-[#DCE6ED] text-[#0d2030]'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                {/* Expanded Content Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as const }}
                      className="px-6 pb-7 sm:px-7 sm:pb-8 pt-2 border-t border-[#DCE6ED] space-y-6 overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm text-[#0d2030] leading-relaxed font-medium bg-[#DCE6ED]/40 p-3.5 rounded-xl border border-[#DCE6ED]">
                        {article.content.overview}
                      </p>

                      {/* Step by step checklist */}
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-[#0d2030] uppercase tracking-wider">
                          Step-by-Step Diagnostic:
                        </p>
                        <div className="space-y-2.5">
                          {article.content.steps.map((step, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-[#FDFDFE] border border-[#DCE6ED] space-y-1">
                              <h4 className="font-bold text-[#0d2030] text-xs sm:text-sm">
                                {step.title}
                              </h4>
                              <p className="text-xs text-[#0d2030]/75 leading-relaxed">
                                {step.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pro Tip Box */}
                      <div className="p-4 rounded-2xl bg-[#DCE6ED]/60 border border-[#6FC5ED]/40 flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-[#2A9FE4] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-[#0d2030] uppercase tracking-wider">
                            Jobsite Pro Tip
                          </p>
                          <p className="text-xs text-[#0d2030]/80 leading-relaxed mt-0.5">
                            {article.content.proTip}
                          </p>
                        </div>
                      </div>

                      {/* Quick Action */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs text-[#0d2030]/70">Need hands-on help with this?</span>
                        <TouchButton
                          onClick={() => openBooking()}
                          variant="primary"
                          size="sm"
                          fullWidthOnMobile={false}
                        >
                          Book a Technician
                        </TouchButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Ask a Question Prompt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center bg-[#FDFDFE] p-8 rounded-3xl border border-[#DCE6ED] max-w-2xl mx-auto space-y-3 shadow-sm"
        >
          <Wrench className="w-8 h-8 text-[#2A9FE4] mx-auto animate-float" />
          <h3 className="text-lg sm:text-xl font-bold font-heading text-[#0d2030]">
            Have a Plumbing or Heating Question?
          </h3>
          <p className="text-xs sm:text-sm text-[#0d2030]/75 max-w-md mx-auto">
            We regularly share practical advice and answer homeowner questions directly on our social channels or via message.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <TouchButton
              href={config.instagramUrl}
              target="_blank"
              variant="primary"
              size="sm"
            >
              Follow on Instagram
            </TouchButton>
            <TouchButton
              href={config.whatsappLink}
              target="_blank"
              variant="secondary"
              size="sm"
            >
              Ask on WhatsApp
            </TouchButton>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
