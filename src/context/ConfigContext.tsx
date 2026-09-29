import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusinessConfig, ServiceItem, GalleryItem } from '../types';
import { INITIAL_CONFIG } from '../data/businessData';

interface ConfigContextType {
  config: BusinessConfig;
  updateConfig: (newConfig: Partial<BusinessConfig>) => void;
  resetConfig: () => void;
  // Modal controllers
  isBookingOpen: boolean;
  openBooking: (serviceId?: string) => void;
  closeBooking: () => void;
  selectedServiceForBooking: string | null;

  isQuoteOpen: boolean;
  openQuote: (serviceId?: string) => void;
  closeQuote: () => void;
  selectedServiceForQuote: string | null;

  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  isServiceDrawerOpen: boolean;
  selectedServiceForDetail: ServiceItem | null;
  openServiceDrawer: (service: ServiceItem) => void;
  closeServiceDrawer: () => void;

  lightboxItem: GalleryItem | null;
  openLightbox: (item: GalleryItem) => void;
  closeLightbox: () => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'tait_maintained_business_config_v1';

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return INITIAL_CONFIG;
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | null>(null);

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | null>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isServiceDrawerOpen, setIsServiceDrawerOpen] = useState(false);
  const [selectedServiceForDetail, setSelectedServiceForDetail] = useState<ServiceItem | null>(null);

  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  const updateConfig = (newConfig: Partial<BusinessConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...newConfig,
      whatsappLink: newConfig.whatsappNumber
        ? `https://wa.me/${newConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Tait Maintained, I would like to inquire about plumbing/heating services.')}`
        : prev.whatsappLink
    }));
    showToast('Business details updated successfully');
  };

  const resetConfig = () => {
    setConfig(INITIAL_CONFIG);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
    showToast('Reset to default business settings');
  };

  const openBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceForBooking(serviceId);
    }
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedServiceForBooking(null);
  };

  const openQuote = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceForQuote(serviceId);
    }
    setIsQuoteOpen(true);
  };

  const closeQuote = () => {
    setIsQuoteOpen(false);
    setSelectedServiceForQuote(null);
  };

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openServiceDrawer = (service: ServiceItem) => {
    setSelectedServiceForDetail(service);
    setIsServiceDrawerOpen(true);
  };

  const closeServiceDrawer = () => {
    setIsServiceDrawerOpen(false);
    setSelectedServiceForDetail(null);
  };

  const openLightbox = (item: GalleryItem) => setLightboxItem(item);
  const closeLightbox = () => setLightboxItem(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        isBookingOpen,
        openBooking,
        closeBooking,
        selectedServiceForBooking,
        isQuoteOpen,
        openQuote,
        closeQuote,
        selectedServiceForQuote,
        isSettingsOpen,
        openSettings,
        closeSettings,
        isSearchOpen,
        openSearch,
        closeSearch,
        isServiceDrawerOpen,
        selectedServiceForDetail,
        openServiceDrawer,
        closeServiceDrawer,
        lightboxItem,
        openLightbox,
        closeLightbox,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
