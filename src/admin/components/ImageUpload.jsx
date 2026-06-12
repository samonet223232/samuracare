import { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

const SIZE_HINTS = {
  hero: 'Recommended: 1920×800px (2:1 landscape) • Max 500KB',
  banner: 'Recommended: 1400×600px • Max 400KB',
  square: 'Recommended: 800×800px (1:1 square) • Max 300KB',
  thumbnail: 'Recommended: 400×400px (1:1 square) • Max 200KB',
  wide: 'Recommended: 1600×900px (16:9) • Max 500KB',
};

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent bg-white text-neutral-800";

export default function ImageUpload({ value, onChange, label, sizeHint = 'hero', showUrl = true }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image is too large. Maximum size is 5MB.');
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange(ev.target?.result || '');
      setUploading(false);
    };
    reader.onerror = () => {
      alert('Failed to read the image file. Please try again.');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (url) => {
    onChange(url);
  };

  const clearImage = () => {
    onChange('');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-medium text-neutral-500 mb-1.5">{label}</label>
      )}

      {/* Image Preview */}
      {value ? (
        <div className="relative w-full h-32 rounded-xl overflow-hidden border border-neutral-100 bg-neutral-50 mb-2 group">
          <img
            src={value}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.querySelector('.fallback')?.classList.remove('hidden');
            }}
          />
          <div className="fallback hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-sm">
            Image preview unavailable
          </div>
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 p-1 bg-white/90 rounded-lg text-neutral-500 hover:text-red-500 hover:bg-white shadow-sm transition-all opacity-0 group-hover:opacity-100"
            title="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="w-full h-32 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 mb-2 flex flex-col items-center justify-center gap-1 text-neutral-400">
          <ImageIcon size={24} className="text-neutral-300" />
          <span className="text-xs">No image selected</span>
        </div>
      )}

      {/* Upload Button & URL Input */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 bg-olive-500 text-white text-xs font-medium rounded-lg hover:bg-olive-600 transition-colors shrink-0 disabled:opacity-60"
        >
          <Upload size={14} />
          {uploading ? 'Loading...' : 'Upload Image'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
        {showUrl && (
          <input
            className={inputClass + ' text-xs flex-1'}
            value={value || ''}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="Or paste image URL..."
            dir="ltr"
          />
        )}
      </div>

      {/* Size Hint */}
      {SIZE_HINTS[sizeHint] && (
        <p className="text-[11px] text-neutral-400 leading-tight">{SIZE_HINTS[sizeHint]}</p>
      )}
    </div>
  );
}