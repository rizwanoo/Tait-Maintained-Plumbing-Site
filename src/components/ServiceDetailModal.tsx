import React, { useEffect, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useConfig } from '../context/ConfigContext';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  ShieldCheck,
  Wrench
} from 'lucide-react';

export const ServiceDetailModal: React.FC = () => {
  const {
    isServiceDrawerOpen,
    selectedServiceForDetail,
    closeServiceDrawer,
    openBooking,
    openQuote
  } = useConfig();

  const [mounted, setMounted] = useState(false);

  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setViewport({
        width: w,
        height: h,
        isMobile: w < 640,
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isServiceDrawerOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isServiceDrawerOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isServiceDrawerOpen) {
        closeServiceDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isServiceDrawerOpen, closeServiceDrawer]);

  const service = selectedServiceForDetail;

  if (!mounted || !isServiceDrawerOpen || !service) return null;

  const isMobile = viewport.isMobile;
  const modalMaxHeight = isMobile ? '100dvh' : `${Math.min(Math.round(viewport.height * 0.9), 860)}px`;
  const modalWidth = isMobile ? '100%' : 'min(94vw, 680px)';

  return createPortal(
    <div
      id="tm-service-detail-modal-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-detail-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'center',
        padding: isMobile ? 0 : '16px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(13, 32, 48, 0.75)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 1,
        }}
        onClick={closeServiceDrawer}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: modalWidth,
          maxWidth: '100%',
          height: isMobile ? '100%' : 'auto',
          maxHeight: modalMaxHeight,
          backgroundColor: '#FDFDFE',
          borderRadius: isMobile ? 0 : '24px',
          boxShadow: '0 25px 50px -12px rgba(13, 32, 48, 0.4)',
          border: isMobile ? 'none' : '1px solid #DCE6ED',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#0d2030',
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#0d2030] overflow-hidden shrink-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2030] via-[#0d2030]/40 to-transparent" />
          
          <button
            type="button"
            onClick={closeServiceDrawer}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-[#0d2030]/80 text-[#FDFDFE] hover:bg-[#0d2030] active:scale-90 transition-all focus:outline-none cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 text-[#FDFDFE]">
            <span className="px-2.5 py-0.5 rounded-full bg-[#2A9FE4]/30 text-[#6FC5ED] border border-[#6FC5ED]/40 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1 inline-block">
              {service.badge}
            </span>
            <h3 id="service-detail-title" className="text-lg sm:text-2xl font-bold font-heading">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Body - Solid background guaranteed, smooth native momentum scroll */}
        <div
          style={{
            flex: '1 1 auto',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            backgroundColor: '#FDFDFE',
            padding: isMobile ? '16px' : '24px 28px',
          }}
          className="space-y-4 sm:space-y-5"
        >
          <p className="text-[#0d2030]/80 text-xs sm:text-sm leading-relaxed">
            {service.longDesc}
          </p>

          {/* Included Standards */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-[#0d2030] text-xs sm:text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2A9FE4]" />
              <span>What We Provide on Every Visit</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#0d2030]/80 p-2.5 rounded-xl bg-[#DCE6ED]/30 border border-[#DCE6ED]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9FE4] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Symptoms / Issues */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-[#0d2030] text-xs sm:text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#2A9FE4]" />
              <span>Common Signs You May Need This Service</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.commonIssues.map((issue, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#0d2030]/80 p-2.5 rounded-xl bg-[#DCE6ED]/50 border border-[#6FC5ED]/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2A9FE4] shrink-0 mt-1.5"></div>
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Jobsite Ethos quote */}
          <div className="p-3.5 rounded-2xl bg-[#DCE6ED]/60 border border-[#DCE6ED] text-[#0d2030] flex items-center gap-3">
            <Wrench className="w-4 h-4 text-[#2A9FE4] shrink-0" />
            <p className="text-xs text-[#0d2030]/90 italic">
              “Learning everyday, spreading knowledge along the way 🫡” — We ensure you understand your setup before we pack our tools.
            </p>
          </div>
        </div>

        {/* Modal Footer Actions - Sticky at bottom */}
        <div
          style={{
            flexShrink: 0,
            padding: isMobile ? '12px 16px' : '16px 24px',
            paddingBottom: isMobile ? 'max(12px, env(safe-area-inset-bottom))' : '16px',
            backgroundColor: '#FDFDFE',
            borderTop: '1px solid #DCE6ED',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <a
            href="tel:+14036130819"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#0d2030] bg-[#DCE6ED]/60 hover:bg-[#DCE6ED] border border-[#DCE6ED] active:scale-95 transition-all min-h-[44px]"
          >
            <span>Call (403) 613-0819</span>
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                closeServiceDrawer();
                openQuote(service.id);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#0d2030] bg-[#DCE6ED]/70 hover:bg-[#DCE6ED] border border-[#DCE6ED] active:scale-95 transition-all cursor-pointer min-h-[44px]"
            >
              Get Quote
            </button>
            <button
              type="button"
              onClick={() => {
                closeServiceDrawer();
                openBooking(service.id);
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#FDFDFE] bg-[#2A9FE4] hover:bg-[#6FC5ED] active:scale-95 shadow-sm transition-all cursor-pointer min-h-[44px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Service</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
