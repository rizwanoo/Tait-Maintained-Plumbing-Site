import React, { useState, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useConfig } from '../context/ConfigContext';
import {
  X,
  Sliders,
  Save,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Info
} from 'lucide-react';

export const ConfigModal: React.FC = () => {
  const { isSettingsOpen, closeSettings, config, updateConfig, resetConfig, showToast } = useConfig();
  const [mounted, setMounted] = useState(false);

  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  });

  const [formData, setFormData] = useState({
    whatsappNumber: config.whatsappNumber,
    phone: config.phone,
    phoneDisplay: config.phoneDisplay,
    email: config.email,
    serviceArea: config.serviceArea,
    hours: config.hours,
    facebookFollowers: config.facebookFollowers,
    facebookUrl: config.facebookUrl,
    instagramUrl: config.instagramUrl,
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
    if (isSettingsOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      setFormData({
        whatsappNumber: config.whatsappNumber,
        phone: config.phone,
        phoneDisplay: config.phoneDisplay,
        email: config.email,
        serviceArea: config.serviceArea,
        hours: config.hours,
        facebookFollowers: config.facebookFollowers,
        facebookUrl: config.facebookUrl,
        instagramUrl: config.instagramUrl,
      });
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
  }, [isSettingsOpen, config]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSettingsOpen) {
        closeSettings();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSettingsOpen, closeSettings]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formData);
    showToast('Business details updated!');
    closeSettings();
  };

  const handleReset = () => {
    if (window.confirm('Reset business contact placeholders to default settings?')) {
      resetConfig();
      closeSettings();
    }
  };

  if (!mounted || !isSettingsOpen) return null;

  const isMobile = viewport.isMobile;
  const modalMaxHeight = isMobile ? '100dvh' : `${Math.min(Math.round(viewport.height * 0.9), 860)}px`;
  const modalWidth = isMobile ? '100%' : 'min(94vw, 600px)';

  return createPortal(
    <div
      id="tm-config-modal-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="config-modal-title"
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
        onClick={closeSettings}
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
        {/* Header */}
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
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-[#2A9FE4] text-xs font-bold uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5" />
              <span>Business Details</span>
            </div>
            <h3 id="config-modal-title" className="text-base sm:text-lg font-bold font-heading text-[#0d2030]">
              Tait Maintained Settings
            </h3>
          </div>
          <button
            type="button"
            onClick={closeSettings}
            className="p-2.5 rounded-full bg-[#DCE6ED]/70 hover:bg-[#DCE6ED] text-[#0d2030] hover:text-[#2A9FE4] active:scale-90 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
            aria-label="Close configuration modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Solid background guaranteed, smooth native momentum scroll */}
        <form
          onSubmit={handleSave}
          style={{
            flex: '1 1 auto',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            backgroundColor: '#FDFDFE',
            padding: isMobile ? '16px' : '24px 28px',
          }}
          className="space-y-4"
        >
          <div className="p-3 rounded-2xl bg-[#DCE6ED]/50 border border-[#6FC5ED]/40 text-xs text-[#0d2030] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#2A9FE4] shrink-0 mt-0.5" />
            <span>
              Update your live phone numbers, email, or service area. Changes are saved locally.
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#2A9FE4]" />
              <span>Phone / Call Number</span>
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 403-613-0819"
              className="w-full px-3.5 py-3 rounded-xl border border-[#DCE6ED] bg-[#DCE6ED]/30 focus:bg-[#FDFDFE] focus:outline-none focus:ring-2 focus:ring-[#2A9FE4] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#2A9FE4]" />
                <span>Contact Email</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="taitmaintained@gmail.com"
                className="w-full px-3.5 py-3 rounded-xl border border-[#DCE6ED] bg-[#DCE6ED]/30 focus:bg-[#FDFDFE] focus:outline-none focus:ring-2 focus:ring-[#2A9FE4] transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2A9FE4]" />
                <span>Service Region</span>
              </label>
              <input
                type="text"
                value={formData.serviceArea}
                onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
                placeholder="Calgary & Surrounding Areas"
                className="w-full px-3.5 py-3 rounded-xl border border-[#DCE6ED] bg-[#DCE6ED]/30 focus:bg-[#FDFDFE] focus:outline-none focus:ring-2 focus:ring-[#2A9FE4] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#2A9FE4]" />
                <span>Operating Hours</span>
              </label>
              <input
                type="text"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                placeholder="Mon – Sat: 8:00 AM – 6:00 PM"
                className="w-full px-3.5 py-3 rounded-xl border border-[#DCE6ED] bg-[#DCE6ED]/30 focus:bg-[#FDFDFE] focus:outline-none focus:ring-2 focus:ring-[#2A9FE4] transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Facebook className="w-3.5 h-3.5 text-[#2A9FE4]" />
                <span>Facebook Metric</span>
              </label>
              <input
                type="text"
                value={formData.facebookFollowers}
                onChange={(e) => setFormData({ ...formData, facebookFollowers: e.target.value })}
                placeholder="2.4K followers • 18 following"
                className="w-full px-3.5 py-3 rounded-xl border border-[#DCE6ED] bg-[#DCE6ED]/30 focus:bg-[#FDFDFE] focus:outline-none focus:ring-2 focus:ring-[#2A9FE4] transition-all"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div
            style={{
              paddingTop: '16px',
              borderTop: '1px solid #DCE6ED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#0d2030]/60 hover:text-rose-600 hover:bg-rose-50 active:scale-95 transition-all cursor-pointer min-h-[44px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeSettings}
                className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#0d2030]/70 hover:text-[#0d2030] active:scale-95 transition-all cursor-pointer min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-heading font-bold text-[#FDFDFE] bg-[#2A9FE4] hover:bg-[#6FC5ED] active:scale-95 shadow-md transition-all text-xs sm:text-sm cursor-pointer min-h-[44px]"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
