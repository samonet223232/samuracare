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
  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Close mobile search on scroll
      if (window.scrollY > 60) setSearchOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
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
        background: transparent ? 'transparent' : 'rgba(255,255,255,0.97)',
        backdropFilter: transparent ? 'none' : 'blur(12px)',
        WebkitBackdropFilter: transparent ? 'none' : 'blur(12px)',
        boxShadow: transparent ? 'none' : '0 1px 0 rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)',
        transition: 'background 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      <div
        className="max-w-7xl mx-auto px-8 flex items-center justify-between gap-8"
        style={{ height: transparent ? '84px' : '72px', transition: 'height 0.4s ease' }}
      >
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none shrink-0">
          <span
            className="font-serif font-semibold tracking-wide"
            style={{
              fontSize: '26px',
              color: transparent ? '#ffffff' : '#1a1a1a',
              transition: 'color 0.4s ease',
            }}
          >
            سامورا<span style={{ color: '#4D5C4A' }}>كير</span>
          </span>
          <span
            className="font-sans tracking-widest"
            style={{
              fontSize: '10px',
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
                className="relative pb-1"
                style={{
                  fontSize: '21px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive
                    ? transparent ? '#ffffff' : '#4D5C4A'
                    : transparent ? 'rgba(255,255,255,0.78)' : '#1a1a1a',
                  transition: 'color 0.3s ease',
                  letterSpacing: '0.01em',
                }}
              >
                {link.label}
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

          {/* Desktop search */}
          <div className="hidden md:flex items-center">
            {searchOpen ? (
              <form onSubmit={handleSearch} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={15} style={{ position: 'absolute', right: '12px', color: '#a0a0a0', pointerEvents: 'none' }} />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                  placeholder="بحث"
                  style={{
                    width: '200px',
                    padding: '7px 36px 7px 36px',
                    fontSize: '15px',
                    borderRadius: '999px',
                    background: '#f2f2f2',
                    border: '1px solid #e0e0e0',
                    color: '#1a1a1a',
                    outline: 'none',
                    boxShadow: 'none',
                    direction: 'rtl',
                    transition: 'border 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onFocus={e => { e.target.style.boxShadow = '0 0 0 3px rgba(77,92,74,0.15)'; e.target.style.borderColor = '#4D5C4A'; }}
                  onBlur={e => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = '#e0e0e0'; }}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  style={{ position: 'absolute', left: '8px', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '999px', background: '#4D5C4A', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                  <X size={12} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="بحث"
                style={{
                  width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '999px', border: 'none', cursor: 'pointer',
                  color: transparent ? 'rgba(255,255,255,0.85)' : '#1a1a1a',
                  background: 'transparent',
                  transition: 'color 0.3s ease',
                }}
              >
                <Search size={18} />
              </button>
            )}
          </div>

          {/* Mobile search button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="بحث"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full"
            style={{
              color: transparent ? 'rgba(255,255,255,0.85)' : '#1a1a1a',
              transition: 'color 0.3s ease',
            }}
          >
            <Search size={20} />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full"
            style={{
              color: transparent ? 'rgba(255,255,255,0.85)' : '#1a1a1a',
              transition: 'color 0.3s ease',
            }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-5 py-3">
          <form onSubmit={handleSearch} className="relative">
            <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="بحث"
              autoFocus
              style={{
                width: '100%',
                padding: '7px 36px 7px 16px',
                fontSize: '15px',
                borderRadius: '999px',
                background: '#f2f2f2',
                border: '1px solid #e0e0e0',
                color: '#1a1a1a',
                outline: 'none',
                boxShadow: 'none',
                transition: 'border 0.2s ease, box-shadow 0.2s ease',
              }}
              onFocus={e => { e.target.style.boxShadow = '0 0 0 3px rgba(77,92,74,0.15)'; e.target.style.borderColor = '#4D5C4A'; }}
              onBlur={e => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = '#e0e0e0'; }}
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
                className="py-3 px-4 rounded-xl font-sans font-medium transition-colors"
                style={{
                  fontSize: '16px',
                  color: isActive ? '#ffffff' : '#1a1a1a',
                  background: isActive ? '#4D5C4A' : 'transparent',
                  fontWeight: isActive ? '600' : '500',
                }}
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
