import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { BRAND_ASSETS } from '../data/businessData';

export const FloatingWhatsApp: React.FC = () => {
  const {
    config,
    isBookingOpen,
    isQuoteOpen,
    isServiceDrawerOpen,
    isSearchOpen,
    isSettingsOpen,
    lightboxItem
  } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const isAnyModalOpen = isBookingOpen || isQuoteOpen || isServiceDrawerOpen || isSearchOpen || isSettingsOpen || !!lightboxItem;

  // Hide floating button while modal is open
  if (isAnyModalOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = customMsg.trim() || 'Hello Tait Maintained, I would like to inquire about plumbing/heating services.';
    const url = `https://wa.me/14036130819?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden animate-scaleUp text-slate-900">
          {/* Header */}
          <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/60 bg-emerald-700">
                <img src={BRAND_ASSETS.logo} alt="Tait Maintained" className="w-full h-full object-cover" />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-emerald-600"></span>
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm leading-tight">Tait Maintained</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span>Direct WhatsApp Line</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-emerald-700 transition-colors"
              aria-label="Close chat bubble"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Preview message */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="p-3 rounded-2xl rounded-tl-none bg-white border border-slate-200 shadow-sm text-xs text-slate-700 space-y-1">
              <p className="font-semibold text-slate-900">Hey there! 👋</p>
              <p className="leading-relaxed">
                Have a question about a leak, heating maintenance, or water heaters? Send us a message directly.
              </p>
              <span className="text-[10px] text-slate-400 block text-right">Tait Maintained • +1 403-613-0819</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSend} className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-colors shrink-0"
                aria-label="Send via WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="relative flex items-center gap-2 group">
        {!isOpen && (
          <span className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-semibold shadow-lg backdrop-blur-md border border-slate-800 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat on WhatsApp (+1 403-613-0819)
          </span>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-emerald-500/20 focus:outline-none cursor-pointer"
          aria-label="Open WhatsApp Chat"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7 fill-white" />
              {/* Online pulse ring */}
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-emerald-600 animate-pulse"></span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
