import React, { useEffect, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useConfig } from '../context/ConfigContext';
import {
  X,
  Calendar,
  Tag,
  Phone
} from 'lucide-react';

export const LightboxModal: React.FC = () => {
  const { lightboxItem, closeLightbox, openBooking } = useConfig();
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
    if (lightboxItem) {
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
  }, [lightboxItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxItem) {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem, closeLightbox]);

  if (!mounted || !lightboxItem) return null;

  const isMobile = viewport.isMobile;
  const modalMaxHeight = isMobile ? '100dvh' : `${Math.min(Math.round(viewport.height * 0.9), 860)}px`;
  const modalWidth = isMobile ? '100%' : 'min(94vw, 880px)';

  return createPortal(
    <div
      id="tm-lightbox-modal-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-modal-title"
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
          backgroundColor: 'rgba(13, 32, 48, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1,
        }}
        onClick={closeLightbox}
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
          flexDirection: isMobile ? 'column' : 'row',
          overflow: 'hidden',
          color: '#0d2030',
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeLightbox}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-[#0d2030]/80 text-[#FDFDFE] sm:bg-[#DCE6ED]/80 sm:text-[#0d2030] hover:bg-[#DCE6ED] hover:text-[#2A9FE4] active:scale-90 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shadow-md"
          aria-label="Close image viewer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Full Image Area */}
        <div
          style={{
            flexShrink: 0,
            backgroundColor: '#0d2030',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            maxHeight: isMobile ? '40vh' : 'none',
            paddingTop: isMobile ? 'max(16px, env(safe-area-inset-top))' : '16px',
          }}
          className="md:w-3/5"
        >
          <img
            src={lightboxItem.image}
            alt={lightboxItem.title}
            className="max-h-[35vh] sm:max-h-[50vh] md:max-h-[75vh] w-auto object-contain rounded-xl"
          />
        </div>

        {/* Details Column - Scrollable with solid background */}
        <div
          style={{
            flex: '1 1 auto',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            backgroundColor: '#FDFDFE',
            padding: isMobile ? '16px' : '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          className="md:w-2/5 space-y-4 sm:space-y-6"
        >
          <div className="space-y-2.5 sm:space-y-3.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#DCE6ED] text-[#0d2030] border border-[#6FC5ED]/40 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-[#2A9FE4]" />
              <span>{lightboxItem.category}</span>
            </div>

            <h3 id="lightbox-modal-title" className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-[#0d2030]">
              {lightboxItem.title}
            </h3>

            <p className="text-[10px] sm:text-xs font-mono-code text-[#2A9FE4] uppercase tracking-wide font-bold">
              {lightboxItem.locationTag}
            </p>

            <p className="text-xs sm:text-sm text-[#0d2030]/80 leading-relaxed">
              {lightboxItem.description}
            </p>

            <div className="p-3 rounded-xl bg-[#DCE6ED]/40 border border-[#DCE6ED] text-xs text-[#0d2030]/80">
              <span className="font-semibold text-[#0d2030]">Tait Maintained Standard:</span> Clean alignment, tested pressure integrity, and neat pipework on every installation.
            </div>
          </div>

          <div
            style={{
              paddingTop: '16px',
              borderTop: '1px solid #DCE6ED',
              paddingBottom: isMobile ? 'max(12px, env(safe-area-inset-bottom))' : '0px',
            }}
            className="space-y-2"
          >
            <button
              type="button"
              onClick={() => {
                closeLightbox();
                openBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#FDFDFE] bg-[#2A9FE4] hover:bg-[#6FC5ED] active:scale-95 transition-all cursor-pointer shadow-lg min-h-[44px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Inquire / Book This Service</span>
            </button>

            <a
              href="tel:+14036130819"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-[#0d2030] bg-[#DCE6ED]/70 hover:bg-[#DCE6ED] border border-[#DCE6ED] active:scale-95 transition-all min-h-[44px]"
            >
              <Phone className="w-3.5 h-3.5 text-[#2A9FE4]" />
              <span>Call (403) 613-0819</span>
            </a>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};
