import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span className="font-serif text-2xl font-light tracking-widest text-white">
                SAMURA<span className="text-blush-300">CARE</span>
              </span>
              <p className="text-sm text-neutral-500 mt-0.5 font-sans tracking-widest">سامورا كير</p>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-5">
              Natural beauty knowledge, honest content, and handcrafted care — all in one place.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-neutral-800 rounded-full hover:bg-blush-400 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-neutral-800 rounded-full hover:bg-blush-400 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="mailto:hello@samuracare.com"
                className="p-2 bg-neutral-800 rounded-full hover:bg-blush-400 transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-white font-sans text-sm font-medium tracking-widest uppercase mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/articles" className="text-neutral-400 hover:text-white transition-colors">Beauty Articles</Link></li>
              <li><Link to="/guide" className="text-neutral-400 hover:text-white transition-colors">Beauty Makers Guide</Link></li>
              <li><Link to="/guide?category=recipes" className="text-neutral-400 hover:text-white transition-colors">DIY Recipes</Link></li>
              <li><Link to="/guide?category=oils" className="text-neutral-400 hover:text-white transition-colors">Natural Oils</Link></li>
              <li><Link to="/about" className="text-neutral-400 hover:text-white transition-colors">Our Story</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-sans text-sm font-medium tracking-widest uppercase mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-1 text-blush-300 shrink-0" />
                <a href="mailto:hello@samuracare.com" className="hover:text-white transition-colors">hello@samuracare.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 text-blush-300 shrink-0" />
                <span>samuracare.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-neutral-500">
          <p>© 2026 SamuraCare. All rights reserved.</p>
          <p className="text-center">
            <span className="text-neutral-600">Disclaimer: </span>
            All content on this site is for educational purposes only and does not constitute medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
