import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';

const navLinks = [
  { to: '/articles', label: 'المقالات' },
  { to: '/guide', label: 'دليل الجمال' },
  { to: '/about', label: 'عنّا' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  // Only go transparent on home hero, before scroll
  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
    // Reset scroll state when navigating away from home
    setScrolled(window.scrollY > 40);
  }, [location]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/guide?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: transparent
          ? 'transparent'
          : 'rgba(255, 255, 255, 0.97)',
        backdropFilter: transparent ? 'none' : 'blur(12px)',
        WebkitBackdropFilter: transparent ? 'none' : 'blur(12px)',
        boxShadow: transparent
          ? 'none'
          : '0 1px 0 rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)',
        transition: 'background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      <div
        className="max-w-7xl mx-auto px-8 flex items-center justify-between gap-8"
        style={{
          height: transparent ? '80px' : '68px',
          transition: 'height 0.4s ease',
        }}
      >

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none shrink-0">
          <span
            className="font-serif text-2xl font-semibold tracking-wide"
            style={{
              color: transparent ? '#ffffff' : '#1a1a1a',
              transition: 'color 0.4s ease',
            }}
          >
            سامورا<span style={{ color: '#4D5C4A' }}>كير</span>
          </span>
          <span
            className="text-xs font-sans tracking-widest"
            style={{
              color: transparent ? 'rgba(255,255,255,0.45)' : '#a0a0a0',
              transition: 'color 0.4s ease',
            }}
          >
            SAMURACARE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className="relative pb-1 text-base font-sans font-medium"
                style={{
                  color: isActive
                    ? transparent ? '#ffffff' : '#4D5C4A'
                    : transparent ? 'rgba(255,255,255,0.72)' : '#3a3a3a',
                  fontWeight: isActive ? '600' : '500',
                  transition: 'color 0.3s ease',
                }}
              >
                {link.label}
                {/* Active underline */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    height: '2px',
                    borderRadius: '2px',
                    background: isActive
                      ? transparent ? '#ffffff' : '#4D5C4A'
                      : 'transparent',
                    transition: 'background 0.3s ease',
                  }}
                />
              </Link>
            );
          })}
        </nav>

        {/* Search + mobile icons */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Desktop expandable search */}
          <div className="hidden md:flex items-center">
            <div
              style={{
                width: searchOpen ? '180px' : '0px',
                opacity: searchOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'width 0.35s ease, opacity 0.25s ease',
              }}
            >
              <form onSubmit={handleSearch} className="pl-2">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                  placeholder="ابحثي في الدليل..."
                  className="w-full py-2 pr-4 pl-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-olive-400"
                  style={{
                    background: transparent ? 'rgba(255,255,255,0.18)' : '#f2f2f2',
                    border: transparent ? '1px solid rgba(255,255,255,0.35)' : '1px solid #e0e0e0',
                    color: transparent ? '#ffffff' : '#1a1a1a',
                    transition: 'background 0.3s ease, border 0.3s ease',
                  }}
                />
              </form>
            </div>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="بحث"
              className="w-10 h-10 flex items-center justify-center rounded-full"
              style={{
                color: searchOpen ? '#ffffff' : transparent ? 'rgba(255,255,255,0.8)' : '#3a3a3a',
                background: searchOpen ? '#4D5C4A' : 'transparent',
                transition: 'color 0.3s ease, background 0.3s ease',
              }}
            >
              {searchOpen ? <X size={17} /> : <Search size={17} />}
            </button>
          </div>

          {/* Mobile search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="بحث"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full"
            style={{
              color: transparent ? 'rgba(255,255,255,0.85)' : '#3a3a3a',
              transition: 'color 0.3s ease',
            }}
          >
            <Search size={19} />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full"
            style={{
              color: transparent ? 'rgba(255,255,255,0.85)' : '#3a3a3a',
              transition: 'color 0.3s ease',
            }}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-5 py-3">
          <form onSubmit={handleSearch} className="relative">
            <Search size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحثي في الدليل..."
              autoFocus
              className="w-full pr-9 pl-4 py-2.5 rounded-full bg-neutral-100 border border-neutral-200 text-sm text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-olive-400"
            />
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-6 py-5 flex flex-col gap-1 shadow-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`py-3 px-4 rounded-xl text-base font-sans font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-olive-500 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
