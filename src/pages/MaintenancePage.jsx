import { useState, useEffect } from 'react';

export default function MaintenancePage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen bg-cream-50 flex flex-col items-center justify-center px-6 py-16"
      style={{ direction: 'rtl' }}
    >
      {/* Logo */}
      <div
        className={`transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <img
          src="/logo-full.png"
          alt="SamuraCare"
          className="h-12 md:h-16 mb-12"
          style={{
            filter: 'brightness(0.7) sepia(0.3) hue-rotate(10deg)',
          }}
        />
      </div>

      {/* Illustration */}
      <div
        className={`transition-all duration-700 ease-out delay-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="relative w-40 h-40 md:w-52 md:h-52 mb-10">
          {/* Decorative rings */}
          <div className="absolute inset-0 rounded-full border-2 border-olive-200 animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-4 rounded-full border-2 border-olive-300/60 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
          <div className="absolute inset-8 rounded-full border-2 border-olive-400/40 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-olive-500"
            >
              {/* Leaf icon */}
              <path
                d="M40 10C40 10 25 20 22 35C19 50 30 60 40 70C50 60 61 50 58 35C55 20 40 10 40 10Z"
                fill="currentColor"
                opacity="0.85"
              />
              <path
                d="M40 22C36 28 33 35 33 42C33 48 36 53 40 58C44 53 47 48 47 42C47 35 44 28 40 22Z"
                fill="white"
                opacity="0.3"
              />
              {/* Sparkle dots */}
              <circle cx="22" cy="22" r="3" fill="currentColor" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="58" cy="28" r="2.5" fill="currentColor" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="52" cy="18" r="2" fill="currentColor" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.15;0.5" dur="1.8s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </div>
      </div>

      {/* Text */}
      <div
        className={`text-center max-w-md transition-all duration-700 ease-out delay-400 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-neutral-800 mb-4 leading-tight">
          We're Improving Your Experience
        </h1>
        <p className="text-neutral-500 text-base md:text-lg leading-relaxed mb-10">
          Our website is currently undergoing maintenance and will be available again soon.
        </p>

        {/* Loading dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="w-2.5 h-2.5 rounded-full bg-olive-400 animate-bounce" style={{ animationDelay: '0s' }} />
          <span className="w-2.5 h-2.5 rounded-full bg-olive-500 animate-bounce" style={{ animationDelay: '0.15s' }} />
          <span className="w-2.5 h-2.5 rounded-full bg-olive-600 animate-bounce" style={{ animationDelay: '0.3s' }} />
        </div>

        {/* Contact */}
        <p className="text-sm text-neutral-400">
          Questions?{' '}
          <a
            href="mailto:support@samuracare.com"
            className="text-olive-500 hover:text-olive-600 font-medium transition-colors"
          >
            support@samuracare.com
          </a>
        </p>
      </div>

      {/* Footer */}
      <p className="mt-auto pt-16 text-xs text-neutral-300">
        &copy; {new Date().getFullYear()} SamuraCare. All rights reserved.
      </p>
    </div>
  );
}