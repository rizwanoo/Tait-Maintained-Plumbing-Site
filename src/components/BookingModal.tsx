import React, { useEffect, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useConfig } from '../context/ConfigContext';
import { BookingSystem } from './BookingSystem';
import { X, Calendar } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBooking } = useConfig();
  const [mounted, setMounted] = useState(false);

  // Dynamic JavaScript viewport state - recalculates on resize & orientation change
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 640 : false,
    isTablet: typeof window !== 'undefined' ? (window.innerWidth >= 640 && window.innerWidth < 1024) : false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // JavaScript dynamic screen size listener
  useLayoutEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setViewport({
        width: w,
        height: h,
        isMobile: w < 640,
        isTablet: w >= 640 && w < 1024,
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

  // Prevent background body scroll when modal is open
  useEffect(() => {
    if (isBookingOpen) {
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
  }, [isBookingOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isBookingOpen) {
        closeBooking();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBookingOpen, closeBooking]);

  if (!mounted || !isBookingOpen) return null;

  // JavaScript computed sizing
  const isMobile = viewport.isMobile;
  const modalMaxHeight = isMobile ? '100dvh' : `${Math.min(Math.round(viewport.height * 0.9), 860)}px`;
  const modalWidth = isMobile ? '100%' : 'min(94vw, 768px)';

  return createPortal(
    <div
      id="tm-booking-modal-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
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
      {/* Dark backdrop with blur - Clicking this closes the modal */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(13, 32, 48, 0.75)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 1,
        }}
        onClick={closeBooking}
        aria-hidden="true"
      />

      {/* Modal Dialog Card - Dynamic JS sizing ensures it fits any screen perfectly */}
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
        {/* Header with Title & Close Button - Sticky at top, solid brand background */}
        <div
          style={{
            flexShrink: 0,
            padding: isMobile ? '12px 16px' : '16px 24px',
            paddingTop: isMobile ? 'max(12px, env(safe-area-inset-top))' : '16px',
            backgroundColor: '#FDFDFE',
            borderBottom: '1px solid #DCE6ED',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 20,
          }}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#DCE6ED] text-[#2A9FE4] shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 id="booking-modal-title" className="text-sm sm:text-base font-bold font-heading text-[#0d2030] uppercase tracking-wider">
                Book a Service Request
              </h3>
              <p className="text-[11px] text-[#0d2030]/65 hidden sm:block">
                Tait Maintained • Upfront Pricing & Peace of Mind
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeBooking}
            className="p-2.5 rounded-full bg-[#DCE6ED]/70 hover:bg-[#DCE6ED] text-[#0d2030] hover:text-[#2A9FE4] active:scale-90 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body with Guaranteed Solid Background */}
        <div
          style={{
            flex: '1 1 auto',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            backgroundColor: '#FDFDFE',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <BookingSystem isModalMode={true} onClose={closeBooking} />
        </div>
      </div>
    </div>,
    document.body
  );
};
