import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../AdminContext';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6" dir="rtl">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-olive-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl font-bold">أ</span>
          </div>
          <h1 className="font-serif text-2xl font-semibold text-neutral-800">لوحة الإدارة</h1>
          <p className="text-sm text-neutral-500 mt-1">سامورا كير</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
          <div className="mb-4">
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false); }}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent transition-all"
              placeholder="••••••••"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 mb-3">كلمة المرور غير صحيحة. حاول مرة أخرى.</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-olive-500 text-white rounded-xl hover:bg-olive-600 transition-colors text-sm font-medium"
          >
            دخول
          </button>

          <p className="text-center text-xs text-neutral-400 mt-4">
            كلمة المرور الافتراضية: <span className="font-mono text-neutral-500">admin123</span>
          </p>
        </form>
      </div>
    </div>
  );
}