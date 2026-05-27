import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div style={{ width: '58px', height: '58px', overflow: 'hidden', flexShrink: 0 }}>
                <img src="/logo-icon.png" alt="Samura Care" style={{
                  width: '145px', height: '145px',
                  marginTop: '-32px', marginRight: '-43px',
                  filter: 'brightness(0) invert(1)',
                  display: 'block',
                }} />
              </div>
              <div style={{ width: '150px', height: '46px', overflow: 'hidden' }}>
                <img src="/logo-text.png" alt="SAMURA CARE" style={{
                  width: '300px', height: '300px',
                  marginTop: '-114px', marginRight: '-75px',
                  filter: 'brightness(0) invert(1)',
                  display: 'block',
                }} />
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-5">
              معرفة الجمال الطبيعي، محتوى صادق، وعناية مصنوعة بقلب — كل ذلك في مكان واحد.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-neutral-800 rounded-full hover:bg-olive-500 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-neutral-800 rounded-full hover:bg-olive-500 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="mailto:hello@samuracare.com"
                className="p-2 bg-neutral-800 rounded-full hover:bg-olive-500 transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-sans text-sm font-medium tracking-widest uppercase mb-4">استكشف</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/articles" className="text-neutral-400 hover:text-white transition-colors">مقالات الجمال</Link></li>
              <li><Link to="/guide" className="text-neutral-400 hover:text-white transition-colors">دليل صانعي الجمال</Link></li>
              <li><Link to="/guide?category=recipes" className="text-neutral-400 hover:text-white transition-colors">وصفات منزلية</Link></li>
              <li><Link to="/guide?category=oils" className="text-neutral-400 hover:text-white transition-colors">الزيوت الطبيعية</Link></li>
              <li><Link to="/about" className="text-neutral-400 hover:text-white transition-colors">قصتنا</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-sans text-sm font-medium tracking-widest uppercase mb-4">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-1 text-olive-300 shrink-0" />
                <a href="mailto:hello@samuracare.com" className="hover:text-white transition-colors">hello@samuracare.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 text-olive-300 shrink-0" />
                <span>samuracare.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-neutral-500">
          <p>© 2026 سامورا كير. جميع الحقوق محفوظة.</p>
          <p className="text-center">
            <span className="text-neutral-600">إخلاء المسؤولية: </span>
            جميع المحتويات لأغراض تعليمية فقط ولا تُعدّ نصيحة طبية.
          </p>
        </div>
      </div>
    </footer>
  );
}
