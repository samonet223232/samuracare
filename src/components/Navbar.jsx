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

  // Transparent only on home page before scrolling
  const isTransparent = isHome && !scrolled && !open;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isTransparent ? 'bg-transparent' : 'bg-white shadow-sm border-b border-neutral-100'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

        {/* Logo — right side in RTL */}
        <Link to="/" className="flex flex-col leading-none shrink-0">
          <span className={`font-serif text-xl font-semibold tracking-wide transition-colors duration-300 ${
            isTransparent ? 'text-white' : 'text-neutral-800'
          }`}>
            سامورا<span className="text-olive-500">كير</span>
          </span>
          <span className={`text-[10px] font-sans tracking-widest transition-colors duration-300 ${
            isTransparent ? 'text-white/50' : 'text-neutral-400'
          }`}>
            SAMURACARE
          </span>
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-sans font-medium pb-0.5 transition-colors duration-200 ${
                  isActive
                    ? isTransparent ? 'text-white' : 'text-olive-600'
                    : isTransparent ? 'text-white/75 hover:text-white' : 'text-neutral-600 hover:text-olive-500'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className={`absolute -bottom-0.5 right-0 left-0 h-[2px] rounded-full transition-colors duration-300 ${
                    isTransparent ? 'bg-white' : 'bg-olive-500'
                  }`} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side actions — search + CTA */}
        <div className="hidden md:flex items-center gap-2 shrink-0">

          {/* Expandable search */}
          <div className="flex items-center gap-1">
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              searchOpen ? 'w-48 opacity-100 mr-1' : 'w-0 opacity-0'
            }`}>
              <form onSubmit={handleSearch}>
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                  placeholder="ابحثي في الدليل..."
                  className={`w-full py-1.5 pr-4 pl-3 text-sm rounded-full border focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent transition-all ${
                    isTransparent
                      ? 'bg-white/15 border-white/30 text-white placeholder-white/50'
                      : 'bg-neutral-100 border-neutral-200 text-neutral-800 placeholder-neutral-400'
                  }`}
                />
              </form>
            </div>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="بحث"
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 ${
                searchOpen
                  ? 'bg-olive-500 text-white'
                  : isTransparent
                    ? 'text-white/80 hover:text-white hover:bg-white/15'
                    : 'text-neutral-500 hover:text-olive-600 hover:bg-olive-50'
              }`}
            >
              {searchOpen ? <X size={16} /> : <Search size={16} />}
            </button>
          </div>

          <Link
            to="/guide"
            className="bg-olive-500 text-white text-sm px-5 py-2 rounded-full hover:bg-olive-600 transition-colors duration-200 whitespace-nowrap"
          >
            استكشف الدليل
          </Link>
        </div>

        {/* Mobile icons */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="بحث"
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
              isTransparent ? 'text-white/80 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Search size={19} />
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
              isTransparent ? 'text-white/80 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
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
          <Link
            to="/guide"
            className="mt-3 bg-olive-500 text-white text-sm px-5 py-3 rounded-full text-center hover:bg-olive-600 transition-colors"
          >
            استكشف الدليل
          </Link>
        </div>
      )}
    </header>
  );
}
