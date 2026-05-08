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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
  }, [location]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/guide?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isScrolledOrOpen = scrolled || open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolledOrOpen ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none shrink-0">
          <span className={`font-serif text-2xl font-semibold tracking-wide transition-colors duration-300 ${
            isScrolledOrOpen ? 'text-neutral-800' : 'text-white'
          }`}>
            سامورا<span className="text-olive-400">كير</span>
          </span>
          <span className={`text-xs font-sans tracking-widest mt-0.5 transition-colors duration-300 ${
            isScrolledOrOpen ? 'text-neutral-400' : 'text-white/60'
          }`}>
            SAMURACARE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-sans font-medium transition-colors duration-200 ${
                  isActive
                    ? isScrolledOrOpen
                      ? 'text-olive-600'
                      : 'text-white'
                    : isScrolledOrOpen
                      ? 'text-neutral-600 hover:text-olive-500'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                {/* Active underline indicator */}
                {isActive && (
                  <span className={`absolute -bottom-1 right-0 left-0 h-0.5 rounded-full ${
                    isScrolledOrOpen ? 'bg-olive-500' : 'bg-white'
                  }`} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side: Search + CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Search toggle */}
          <div className="relative flex items-center">
            <form
              onSubmit={handleSearch}
              className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
                searchOpen ? 'w-52 opacity-100' : 'w-0 opacity-0 pointer-events-none'
              }`}
            >
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                placeholder="ابحثي في الدليل..."
                className={`w-full py-2 pr-4 pl-3 text-sm font-sans rounded-full border focus:outline-none focus:ring-2 focus:ring-olive-400 transition-colors ${
                  isScrolledOrOpen
                    ? 'bg-neutral-100 border-neutral-200 text-neutral-800 placeholder-neutral-400'
                    : 'bg-white/15 border-white/30 text-white placeholder-white/60'
                }`}
              />
            </form>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="بحث"
              className={`p-2 rounded-full transition-all duration-200 ${
                searchOpen
                  ? isScrolledOrOpen ? 'text-olive-600 bg-olive-50' : 'text-white bg-white/20'
                  : isScrolledOrOpen ? 'text-neutral-600 hover:text-olive-500 hover:bg-neutral-100' : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>
          </div>

          <Link
            to="/guide"
            className="bg-olive-500 text-white text-sm px-5 py-2.5 rounded-full hover:bg-olive-600 transition-colors duration-300 whitespace-nowrap"
          >
            استكشف الدليل
          </Link>
        </div>

        {/* Mobile: search icon + menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="بحث"
            className={`p-2 rounded-full transition-colors ${
              isScrolledOrOpen ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white/90 hover:bg-white/15'
            }`}
          >
            <Search size={20} />
          </button>
          <button
            className={`p-2 transition-colors ${
              isScrolledOrOpen ? 'text-neutral-700' : 'text-white'
            }`}
            onClick={() => setOpen(!open)}
            aria-label="فتح القائمة"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-6 py-3">
          <form onSubmit={handleSearch} className="relative">
            <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحثي في الدليل..."
              autoFocus
              className="w-full pr-9 pl-4 py-2.5 rounded-full bg-neutral-100 border border-neutral-200 text-sm font-sans text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-olive-400"
            />
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-cream-200 px-6 py-6 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-base font-sans py-1 transition-colors ${
                  isActive ? 'text-olive-600 font-semibold' : 'text-neutral-700 hover:text-olive-500'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/guide"
            className="mt-2 bg-olive-500 text-white text-sm px-5 py-3 rounded-full text-center hover:bg-olive-600 transition-colors"
          >
            استكشف الدليل
          </Link>
        </div>
      )}
    </header>
  );
}
