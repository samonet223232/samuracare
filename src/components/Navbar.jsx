import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/articles', label: 'المقالات' },
  { to: '/guide', label: 'دليل الجمال' },
  { to: '/about', label: 'عنّا' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-serif text-2xl font-semibold tracking-wide text-neutral-800">
            سامورا<span className="text-blush-400">كير</span>
          </span>
          <span className="text-xs font-sans text-neutral-400 tracking-widest mt-0.5">
            SAMURACARE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-sans font-medium transition-colors duration-200 hover:text-blush-400 ${
                location.pathname.startsWith(link.to)
                  ? 'text-blush-400'
                  : 'text-neutral-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/guide"
            className="bg-neutral-800 text-white text-sm px-5 py-2.5 rounded-full hover:bg-blush-400 transition-colors duration-300"
          >
            استكشف الدليل
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-neutral-700"
          onClick={() => setOpen(!open)}
          aria-label="فتح القائمة"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-cream-200 px-6 py-6 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-base font-sans text-neutral-700 hover:text-blush-400 transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/guide"
            className="mt-2 bg-neutral-800 text-white text-sm px-5 py-3 rounded-full text-center hover:bg-blush-400 transition-colors"
          >
            استكشف الدليل
          </Link>
        </div>
      )}
    </header>
  );
}
