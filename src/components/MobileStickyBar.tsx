import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

export const MobileStickyBar: React.FC = () => {
  const {
    openBooking,
    config,
    isBookingOpen,
    isQuoteOpen,
    isServiceDrawerOpen,
    isSearchOpen,
    isSettingsOpen,
    lightboxItem
  } = useConfig();

  const isAnyModalOpen = isBookingOpen || isQuoteOpen || isServiceDrawerOpen || isSearchOpen || isSettingsOpen || !!lightboxItem;

  // Hide sticky bar when a modal is open to keep mobile screen 100% focused and uncluttered
  if (isAnyModalOpen) return null;

  return (
    <aside aria-label="Quick mobile actions" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFDFE]/95 backdrop-blur-xl border-t border-[#DCE6ED] p-2 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl transition-all duration-200">
      <div className="grid grid-cols-3 gap-2">
        
        {/* Call Button */}
        <a
          href="tel:+14036130819"
          className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-[#DCE6ED]/60 border border-[#DCE6ED] text-[#0d2030] active:scale-95 transition-all text-center min-h-[48px]"
        >
          <Phone className="w-4 h-4 text-[#2A9FE4] mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={config.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-[#DCE6ED]/60 border border-[#DCE6ED] text-[#0d2030] active:scale-95 transition-all text-center min-h-[48px]"
        >
          <MessageCircle className="w-4 h-4 text-[#2A9FE4] mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Book Button */}
        <button
          type="button"
          onClick={() => openBooking()}
          className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-gradient-to-r from-[#2A9FE4] to-[#6FC5ED] text-[#FDFDFE] font-bold active:scale-95 transition-all shadow-md shadow-[#2A9FE4]/30 cursor-pointer min-h-[48px]"
        >
          <Calendar className="w-4 h-4 text-[#FDFDFE] mb-0.5" />
          <span className="text-[11px] font-extrabold tracking-tight">Book</span>
        </button>

      </div>
    </aside>
  );
};
