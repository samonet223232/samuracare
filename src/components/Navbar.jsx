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
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
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
      style={{
        background: transparent ? 'transparent' : '#ffffff',
        boxShadow: transparent ? 'none' : '0 1px 3px rgba(0,0,0,0.08)',
        borderBottom: transparent ? 'none' : '1px solid #f0f0f0',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none shrink-0">
          <span
            style={{ color: transparent ? '#ffffff' : '#1a1a1a' }}
            className="font-serif text-2xl font-semibold tracking-wide transition-colors duration-300"
          >
            سامورا<span className="text-olive-500">كير</span>
          </span>
          <span
            style={{ color: transparent ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}
            className="text-xs font-sans tracking-widest transition-colors duration-300"
          >
            SAMURACARE
          </span>
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex items-center gap-10 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className="relative pb-1 text-base font-sans font-medium transition-colors duration-200"
                style={{
                  color: isActive
                    ? (transparent ? '#ffffff' : '#3d4a39')
                    : (transparent ? 'rgba(255,255,255,0.75)' : '#525252'),
                }}
              >
                {link.label}
                {/* Active indicator underline */}
                {isActive && (
                  <span
                    className="absolute bottom-0 right-0 left-0 h-[2px] rounded-full"
                    style={{ background: transparent ? '#ffffff' : '#4D5C4A' }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side: search + CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Expandable search */}
          <div className="flex items-center">
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ width: searchOpen ? '180px' : '0px', opacity: searchOpen ? 1 : 0 }}
            >
              <form onSubmit={handleSearch} className="pr-2">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                  placeholder="ابحثي في الدليل..."
                  className="w-full py-1.5 pr-4 pl-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent"
                  style={{
                    background: transparent ? 'rgba(255,255,255,0.15)' : '#f5f5f5',
                    border: transparent ? '1px solid rgba(255,255,255,0.3)' : '1px solid #e5e5e5',
                    color: transparent ? '#ffffff' : '#1a1a1a',
                  }}
                />
              </form>
            </div>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="بحث"
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
              style={{
                color: searchOpen ? '#ffffff' : (transparent ? 'rgba(255,255,255,0.8)' : '#525252'),
                background: searchOpen ? '#4D5C4A' : 'transparent',
              }}
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>
          </div>

        </div>

        {/* Mobile icons */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="بحث"
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ color: transparent ? 'rgba(255,255,255,0.85)' : '#525252' }}
          >
            <Search size={19} />
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ color: transparent ? 'rgba(255,255,255,0.85)' : '#525252' }}
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
                className={`py-2.5 px-3 rounded-xl text-sm font-sans font-medium transition-colors ${
                  isActive
                    ? 'text-olive-600 bg-olive-50 font-semibold'
                    : 'text-neutral-700 hover:text-olive-500 hover:bg-neutral-50'
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
