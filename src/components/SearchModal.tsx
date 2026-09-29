import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useConfig } from '../context/ConfigContext';
import { SERVICES_DATA, EDUCATION_ARTICLES } from '../data/businessData';
import {
  Search,
  X,
  Wrench,
  Flame,
  Droplets,
  Phone,
  FileText,
  ArrowRight
} from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, openBooking, openQuote, openServiceDrawer } = useConfig();
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');

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
    if (isSearchOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      setQuery('');
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
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return null;

    const matchedServices = SERVICES_DATA.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.shortDesc.toLowerCase().includes(q) ||
      s.commonIssues.some(issue => issue.toLowerCase().includes(q))
    );

    const matchedArticles = EDUCATION_ARTICLES.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.teaser.toLowerCase().includes(q) ||
      a.content.overview.toLowerCase().includes(q)
    );

    return { services: matchedServices, articles: matchedArticles };
  }, [query]);

  if (!mounted || !isSearchOpen) return null;

  const isMobile = viewport.isMobile;
  const modalMaxHeight = isMobile ? '100dvh' : `${Math.min(Math.round(viewport.height * 0.85), 780)}px`;
  const modalWidth = isMobile ? '100%' : 'min(94vw, 680px)';

  return createPortal(
    <div
      id="tm-search-modal-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: isMobile ? 'stretch' : 'flex-start',
        justifyContent: 'center',
        padding: isMobile ? 0 : '24px 16px',
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
        onClick={closeSearch}
        aria-hidden="true"
      />

      {/* Search Dialog */}
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
          marginTop: isMobile ? 0 : '32px',
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div
          style={{
            flexShrink: 0,
            padding: isMobile ? '12px 16px' : '16px 20px',
            paddingTop: isMobile ? 'max(12px, env(safe-area-inset-top))' : '16px',
            backgroundColor: 'rgba(220, 230, 237, 0.35)',
            borderBottom: '1px solid #DCE6ED',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Search className="w-5 h-5 text-[#2A9FE4] shrink-0" />
          <input
            id="search-modal-title"
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, issues (e.g. running toilet, leak, boiler)..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-[#0d2030] placeholder:text-[#0d2030]/40 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#0d2030]/40 hover:text-[#0d2030] cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-md bg-[#DCE6ED] text-[#0d2030]/70 uppercase hidden sm:inline-block shrink-0">
              ESC
            </span>
          )}
          <button
            type="button"
            onClick={closeSearch}
            className="p-2 rounded-full text-[#0d2030]/50 hover:text-[#0d2030] active:scale-90 transition-colors ml-1 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div
          style={{
            flex: '1 1 auto',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            backgroundColor: '#FDFDFE',
            padding: isMobile ? '16px' : '20px 24px',
          }}
          className="space-y-4 sm:space-y-5"
        >
          {searchResults ? (
            <div className="space-y-4">
              {searchResults.services.length === 0 && searchResults.articles.length === 0 && (
                <div className="text-center py-6 sm:py-8 space-y-2">
                  <p className="text-sm font-semibold text-[#0d2030]">No direct results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-[#0d2030]/65">
                    Need immediate help? Request a booking or call us directly.
                  </p>
                  <div className="pt-2 flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        closeSearch();
                        openBooking();
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#FDFDFE] bg-[#2A9FE4] hover:bg-[#6FC5ED] active:scale-95 transition-all cursor-pointer min-h-[44px]"
                    >
                      Book a Service
                    </button>
                    <a
                      href="tel:+14036130819"
                      className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#0d2030] bg-[#DCE6ED]/60 hover:bg-[#DCE6ED] active:scale-95 transition-all min-h-[44px] inline-flex items-center"
                    >
                      Call (403) 613-0819
                    </a>
                  </div>
                </div>
              )}

              {/* Services Matches */}
              {searchResults.services.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#2A9FE4] block">
                    Services ({searchResults.services.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.services.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          closeSearch();
                          openServiceDrawer(s);
                        }}
                        className="p-3 rounded-2xl border border-[#DCE6ED] hover:border-[#2A9FE4] hover:bg-[#DCE6ED]/40 active:scale-[0.99] transition-all flex items-center justify-between cursor-pointer group min-h-[48px]"
                      >
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-bold text-[#0d2030] group-hover:text-[#2A9FE4]">
                            {s.title}
                          </h4>
                          <p className="text-xs text-[#0d2030]/65 line-clamp-1">
                            {s.shortDesc}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#0d2030]/40 group-hover:text-[#2A9FE4] transition-colors shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Matches */}
              {searchResults.articles.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#2A9FE4] block">
                    Jobsite Knowledge & Guides ({searchResults.articles.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.articles.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          closeSearch();
                          const el = document.getElementById('education');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="p-3 rounded-2xl border border-[#DCE6ED] hover:border-[#2A9FE4] hover:bg-[#DCE6ED]/40 active:scale-[0.99] transition-all flex items-center justify-between cursor-pointer group min-h-[48px]"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#DCE6ED] text-[#0d2030] font-bold uppercase">
                              {a.tag}
                            </span>
                            <h4 className="text-sm font-bold text-[#0d2030] group-hover:text-[#2A9FE4]">
                              {a.title}
                            </h4>
                          </div>
                          <p className="text-xs text-[#0d2030]/65 line-clamp-1">
                            {a.teaser}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#0d2030]/40 group-hover:text-[#2A9FE4] transition-colors shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#0d2030]/50 block">
                Quick Shortcuts & Common Requests
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    closeSearch();
                    openBooking('plumbing');
                  }}
                  className="p-3 rounded-2xl border border-[#DCE6ED] hover:border-[#2A9FE4] hover:bg-[#DCE6ED]/40 active:scale-[0.98] transition-all flex items-center gap-3 text-left cursor-pointer min-h-[52px]"
                >
                  <div className="p-2 rounded-xl bg-[#DCE6ED] text-[#2A9FE4]">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0d2030]">Plumbing Repair</p>
                    <p className="text-[11px] text-[#0d2030]/65">Leaks, taps, drainage, valves</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeSearch();
                    openBooking('water_heaters');
                  }}
                  className="p-3 rounded-2xl border border-[#DCE6ED] hover:border-[#2A9FE4] hover:bg-[#DCE6ED]/40 active:scale-[0.98] transition-all flex items-center gap-3 text-left cursor-pointer min-h-[52px]"
                >
                  <div className="p-2 rounded-xl bg-[#DCE6ED] text-[#2A9FE4]">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0d2030]">Water Heaters</p>
                    <p className="text-[11px] text-[#0d2030]/65">Service, maintenance & replacement</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeSearch();
                    openBooking('heating');
                  }}
                  className="p-3 rounded-2xl border border-[#DCE6ED] hover:border-[#2A9FE4] hover:bg-[#DCE6ED]/40 active:scale-[0.98] transition-all flex items-center gap-3 text-left cursor-pointer min-h-[52px]"
                >
                  <div className="p-2 rounded-xl bg-[#DCE6ED] text-[#2A9FE4]">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0d2030]">Heating Systems</p>
                    <p className="text-[11px] text-[#0d2030]/65">Hydronic, radiators, diagnostics</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeSearch();
                    openQuote();
                  }}
                  className="p-3 rounded-2xl border border-[#DCE6ED] hover:border-[#2A9FE4] hover:bg-[#DCE6ED]/40 active:scale-[0.98] transition-all flex items-center gap-3 text-left cursor-pointer min-h-[52px]"
                >
                  <div className="p-2 rounded-xl bg-[#DCE6ED] text-[#2A9FE4]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0d2030]">Request Free Quote</p>
                    <p className="text-[11px] text-[#0d2030]/65">Upfront project estimate</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Shortcuts */}
        <div
          style={{
            flexShrink: 0,
            padding: isMobile ? '12px 16px' : '14px 20px',
            paddingBottom: isMobile ? 'max(12px, env(safe-area-inset-bottom))' : '14px',
            backgroundColor: 'rgba(220, 230, 237, 0.35)',
            borderTop: '1px solid #DCE6ED',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
          }}
        >
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#2A9FE4]" />
            <span>Direct: <a href="tel:+14036130819" className="font-bold text-[#0d2030] hover:text-[#2A9FE4] hover:underline">(403) 613-0819</a></span>
          </div>
          <button
            type="button"
            onClick={() => {
              closeSearch();
              openBooking();
            }}
            className="font-bold text-[#2A9FE4] hover:underline cursor-pointer py-1 px-2"
          >
            Book Service →
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
