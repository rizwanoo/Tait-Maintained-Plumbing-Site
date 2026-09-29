import React, { useState, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useConfig } from '../context/ConfigContext';
import {
  X,
  Upload,
  CheckCircle2,
  MessageCircle,
  Trash2,
  FileText,
  AlertCircle,
  Loader2,
  Wrench,
  Flame,
  Droplets,
  Shield,
  Phone,
  Check
} from 'lucide-react';

export const QuoteModal: React.FC = () => {
  const { isQuoteOpen, closeQuote, selectedServiceForQuote, config, showToast } = useConfig();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [quoteRef, setQuoteRef] = useState<string>('');

  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  });

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    service: selectedServiceForQuote || 'plumbing',
    timeline: 'this_week',
    description: '',
    contactMethod: 'phone',
  });

  const [photos, setPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (selectedServiceForQuote) {
      setForm(prev => ({ ...prev, service: selectedServiceForQuote }));
    }
  }, [selectedServiceForQuote]);

  useEffect(() => {
    if (isQuoteOpen) {
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
  }, [isQuoteOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isQuoteOpen) {
        closeQuote();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQuoteOpen, closeQuote]);

  const serviceOptions = [
    { id: 'plumbing', label: 'Plumbing Repair', icon: <Wrench className="w-4 h-4" /> },
    { id: 'heating', label: 'Heating Maintenance', icon: <Flame className="w-4 h-4" /> },
    { id: 'water_heaters', label: 'Water Heater Install / Fix', icon: <Droplets className="w-4 h-4" /> },
    { id: 'maintenance', label: 'Property Inspection', icon: <Shield className="w-4 h-4" /> },
    { id: 'other', label: 'Other Work', icon: <FileText className="w-4 h-4" /> },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          setPhotos(prev => [...prev, loadEvt.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    showToast('Photo attached to quote request');
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!form.phone.trim()) {
      errs.phone = 'Please enter a phone number so we can provide your estimate.';
    } else if (form.phone.replace(/[^0-9]/g, '').length < 7) {
      errs.phone = 'Please enter a valid contact phone number.';
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.description.trim()) {
      errs.description = 'Please describe the project or problem.';
    } else if (form.description.trim().length < 5) {
      errs.description = 'Please add a little more detail so we can provide an accurate quote.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ref = `QT-${Math.floor(1000 + Math.random() * 9000)}`;
      setQuoteRef(ref);
      setIsSubmitting(false);
      setSubmitted(true);
      showToast(`Quote request #${ref} submitted!`);
    }, 600);
  };

  const getWhatsAppQuoteText = () => {
    const serviceLabel = serviceOptions.find(s => s.id === form.service)?.label || form.service;
    return encodeURIComponent(
      `*Quote Request — Tait Maintained*\n` +
      `Quote ID: #${quoteRef || 'QT-Request'}\n` +
      `Customer: ${form.fullName}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email || 'Not provided'}\n` +
      `Service: ${serviceLabel}\n` +
      `Timeline: ${form.timeline.toUpperCase()}\n` +
      `Address: ${form.address || 'Calgary Area'}\n` +
      `Details: ${form.description}`
    );
  };

  const resetForm = () => {
    setSubmitted(false);
    setPhotos([]);
    setErrors({});
    setForm({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      service: 'plumbing',
      timeline: 'this_week',
      description: '',
      contactMethod: 'phone',
    });
    closeQuote();
  };

  if (!mounted || !isQuoteOpen) return null;

  const isMobile = viewport.isMobile;
  const modalMaxHeight = isMobile ? '100dvh' : `${Math.min(Math.round(viewport.height * 0.9), 860)}px`;
  const modalWidth = isMobile ? '100%' : 'min(94vw, 680px)';

  return createPortal(
    <div
      id="tm-quote-modal-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
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
        onClick={closeQuote}
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
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2A9FE4] animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-mono-code font-bold uppercase tracking-wider text-[#2A9FE4]">
                Upfront Project Pricing
              </span>
            </div>
            <h3 id="quote-modal-title" className="text-sm sm:text-xl font-bold font-heading text-[#0d2030]">
              Request a Free Project Quote
            </h3>
          </div>

          <button
            type="button"
            onClick={closeQuote}
            className="p-2.5 rounded-full bg-[#DCE6ED]/70 hover:bg-[#DCE6ED] text-[#0d2030] hover:text-[#2A9FE4] active:scale-90 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Solid background guaranteed, smooth native momentum scroll */}
        <div
          style={{
            flex: '1 1 auto',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            backgroundColor: '#FDFDFE',
            padding: isMobile ? '16px' : '24px 28px',
          }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              {/* Service Selection Pills */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                  Select Service Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {serviceOptions.map((opt) => {
                    const isSelected = form.service === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setForm({ ...form, service: opt.id })}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer min-h-[44px] ${
                          isSelected
                            ? 'border-[#2A9FE4] bg-[#2A9FE4] text-[#FDFDFE] shadow-sm'
                            : 'border-[#DCE6ED] bg-[#FDFDFE] text-[#0d2030]/80 hover:bg-[#DCE6ED]/40 active:scale-95'
                        }`}
                      >
                        <span className="shrink-0">{opt.icon}</span>
                        <span className="truncate">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                    Full Name <span className="text-[#2A9FE4]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => {
                      setForm({ ...form, fullName: e.target.value });
                      if (errors.fullName) setErrors({});
                    }}
                    placeholder="Your Full Name"
                    className={`w-full px-3.5 py-3 rounded-xl border bg-[#DCE6ED]/20 focus:bg-[#FDFDFE] focus:outline-none transition-all ${
                      errors.fullName
                        ? 'border-rose-400 ring-2 ring-rose-100'
                        : 'border-[#DCE6ED] focus:ring-2 focus:ring-[#2A9FE4]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-600 font-medium">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                    Phone Number <span className="text-[#2A9FE4]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });
                      if (errors.phone) setErrors({});
                    }}
                    placeholder="(403) 555-0192"
                    className={`w-full px-3.5 py-3 rounded-xl border bg-[#DCE6ED]/20 focus:bg-[#FDFDFE] focus:outline-none transition-all ${
                      errors.phone
                        ? 'border-rose-400 ring-2 ring-rose-100'
                        : 'border-[#DCE6ED] focus:ring-2 focus:ring-[#2A9FE4]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-600 font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors({});
                    }}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-3 rounded-xl border bg-[#DCE6ED]/20 focus:bg-[#FDFDFE] focus:outline-none transition-all ${
                      errors.email
                        ? 'border-rose-400 ring-2 ring-rose-100'
                        : 'border-[#DCE6ED] focus:ring-2 focus:ring-[#2A9FE4]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-600 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                    Property Address or Area
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="e.g. NW Calgary / Street Address"
                    className="w-full px-3.5 py-3 rounded-xl border border-[#DCE6ED] focus:outline-none focus:ring-2 focus:ring-[#2A9FE4] bg-[#DCE6ED]/20 focus:bg-[#FDFDFE] transition-all"
                  />
                </div>
              </div>

              {/* Project Description */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                    Project / Problem Details <span className="text-[#2A9FE4]">*</span>
                  </label>
                  <span className="text-[10px] text-[#0d2030]/50 font-mono-code">
                    {form.description.length} chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => {
                    setForm({ ...form, description: e.target.value });
                    if (errors.description) setErrors({});
                  }}
                  placeholder="Describe what needs to be quoted, replaced, or fixed..."
                  className={`w-full px-3.5 py-3 rounded-xl border bg-[#DCE6ED]/20 focus:bg-[#FDFDFE] focus:outline-none transition-all resize-none ${
                    errors.description
                      ? 'border-rose-400 ring-2 ring-rose-100'
                      : 'border-[#DCE6ED] focus:ring-2 focus:ring-[#2A9FE4]'
                  }`}
                />
                {errors.description && (
                  <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.description}</span>
                  </p>
                )}
              </div>

              {/* Photo Upload Section */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                  Upload Photos (Optional)
                </label>
                <div className="p-3.5 rounded-xl border-2 border-dashed border-[#DCE6ED] bg-[#DCE6ED]/20 text-center hover:bg-[#DCE6ED]/40 transition-colors">
                  <input
                    type="file"
                    id="quote-photos"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="quote-photos" className="cursor-pointer flex flex-col items-center gap-1">
                    <Upload className="w-4 h-4 text-[#2A9FE4]" />
                    <span className="text-xs font-semibold text-[#0d2030]">Attach photos of fixture, boiler, pipe or water heater</span>
                  </label>
                </div>

                {photos.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {photos.map((p, i) => (
                      <div key={i} className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-[#DCE6ED]">
                        <img src={p} alt="attached" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-rose-600 text-white cursor-pointer"
                          aria-label="Delete attached image"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Timeline options */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                  Target Project Timeline
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'urgent', label: 'Urgent (24–48h)' },
                    { id: 'this_week', label: 'This Week' },
                    { id: 'next_week', label: 'Next 2 Weeks' },
                    { id: 'flexible', label: 'Just Researching' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setForm({ ...form, timeline: t.id })}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer min-h-[44px] ${
                        form.timeline === t.id
                          ? 'border-[#2A9FE4] bg-[#DCE6ED]/70 font-bold text-[#0d2030] ring-1 ring-[#2A9FE4]'
                          : 'border-[#DCE6ED] bg-[#FDFDFE] text-[#0d2030]/70 hover:bg-[#DCE6ED]/30 active:scale-95'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sticky Action Footer */}
              <div className="pt-3 border-t border-[#DCE6ED] flex items-center justify-between gap-3 sticky bottom-0 bg-[#FDFDFE]/98 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                <button
                  type="button"
                  onClick={closeQuote}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#0d2030]/70 hover:text-[#0d2030] active:scale-95 transition-all cursor-pointer min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 sm:px-8 py-3 rounded-xl font-heading font-bold text-[#FDFDFE] bg-[#2A9FE4] hover:bg-[#6FC5ED] active:scale-95 shadow-md transition-all text-xs sm:text-sm cursor-pointer disabled:opacity-75 inline-flex items-center gap-2 min-h-[44px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>SUBMIT QUOTE REQUEST</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4 sm:space-y-5 max-w-md mx-auto">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#DCE6ED] text-[#2A9FE4] flex items-center justify-center mx-auto ring-8 ring-[#6FC5ED]/20">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-mono-code text-[#2A9FE4] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#DCE6ED] inline-block">
                  QUOTE REF: #{quoteRef}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-heading text-[#0d2030]">
                  Quote Request Received!
                </h4>
                <p className="text-xs sm:text-sm text-[#0d2030]/75 leading-relaxed">
                  Thank you, {form.fullName.split(' ')[0]}. We will review your project details and get back to you at <strong>{form.phone}</strong> with a clear estimate.
                </p>
              </div>

              {/* Direct WhatsApp Option */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#DCE6ED]/60 border border-[#6FC5ED]/40 text-left space-y-2">
                <p className="text-xs font-bold text-[#0d2030]">Want faster feedback?</p>
                <a
                  href={`${config.whatsappLink}&text=${getWhatsAppQuoteText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#FDFDFE] bg-[#2A9FE4] hover:bg-[#6FC5ED] active:scale-95 shadow-sm transition-all min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Forward to Technician WhatsApp</span>
                </a>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-xl font-heading font-bold text-xs bg-[#0d2030] text-[#FDFDFE] hover:bg-[#2A9FE4] active:scale-95 transition-colors cursor-pointer min-h-[44px]"
                >
                  Done & Close
                </button>
                <a
                  href="tel:+14036130819"
                  className="px-4 py-2.5 rounded-xl font-heading font-semibold text-xs text-[#0d2030] bg-[#DCE6ED] hover:bg-[#DCE6ED]/80 active:scale-95 transition-colors inline-flex items-center gap-1.5 min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#2A9FE4]" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
