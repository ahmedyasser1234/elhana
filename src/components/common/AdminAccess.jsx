import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, Eye, EyeOff, CheckCircle2, AlertCircle, RefreshCw, ArrowRight, Mail, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { verifyAdminCredentials, setCurrentAdminUser, updateAdminPassword, PRIMARY_ADMIN } from '../../services/adminUsersService';

export default function AdminAccess({ children }) {
  const [authenticated, setAuthenticated] = useState(() => {
    return Boolean(sessionStorage.getItem('admin_token') || localStorage.getItem('admin_token'));
  });

  const [email, setEmail] = useState('ahmedyasser697@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Change / Reset password tab
  const [showResetTab, setShowResetTab] = useState(false);
  const [resetOldPass, setResetOldPass] = useState('');
  const [resetNewPass, setResetNewPass] = useState('');
  const [resetConfirmPass, setResetConfirmPass] = useState('');
  const [resetMessage, setResetMessage] = useState({ text: '', type: '' });

  // Submit Login
  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const verification = verifyAdminCredentials(email, password);

    if (verification.success && verification.user) {
      const token = 'local_admin_session_' + Date.now();
      sessionStorage.setItem('admin_token', token);
      if (rememberMe) {
        localStorage.setItem('admin_token', token);
      }
      setCurrentAdminUser(verification.user, rememberMe);
      setAuthenticated(true);
      setLoading(false);
      return;
    }

    // Invalid credentials
    setTimeout(() => {
      setError('بيانات الدخول غير صحيحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور.');
      setLoading(false);
    }, 300);
  }

  // Handle Password Change
  function handleResetPassword(e) {
    e.preventDefault();
    setResetMessage({ text: '', type: '' });

    const verification = verifyAdminCredentials(email, resetOldPass);
    if (!verification.success) {
      setResetMessage({ text: 'كلمة المرور الحالية غير صحيحة!', type: 'error' });
      return;
    }

    if (resetNewPass.length < 6) {
      setResetMessage({ text: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف أو أرقام على الأقل.', type: 'error' });
      return;
    }

    if (resetNewPass !== resetConfirmPass) {
      setResetMessage({ text: 'كلمتا المرور الجديدة غير متطابقتين!', type: 'error' });
      return;
    }

    updateAdminPassword(email, resetNewPass.trim());
    setResetMessage({ text: 'تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول بها.', type: 'success' });
    setPassword(resetNewPass.trim());
    setTimeout(() => {
      setShowResetTab(false);
      setResetMessage({ text: '', type: '' });
    }, 2000);
  }

  // Restore Default Credentials
  function restoreDefaultCredentials() {
    localStorage.removeItem('elhana_admin_password');
    setEmail('ahmedyasser697@gmail.com');
    setPassword('Ahmed123@@Ahmed');
    setResetMessage({ text: 'تمت استعادة بيانات الأدمن الأساسي الأصلية بنجاح!', type: 'success' });
    setTimeout(() => {
      setShowResetTab(false);
      setResetMessage({ text: '', type: '' });
    }, 2000);
  }

  if (authenticated) return children;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-slate-950 text-slate-100 relative overflow-hidden" dir="rtl">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 relative z-10 space-y-6">
        
        {/* Top Header Badge */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto border border-sky-500/20 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-black font-heading text-white">
              بوابة إدارة مجموعة الهنا
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              تسجيل دخول الأدمن الرئيسي والمشرفين المعتمدين
            </p>
          </div>
        </div>

        {/* View 1: Main Login Form */}
        {!showResetTab ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                البريد الإلكتروني للأدمن / المشرف
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="ahmedyasser697@gmail.com"
                  className="w-full pr-10 pl-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition font-mono"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                كلمة المرور السرية
              </label>
              <div className="relative">
                <input
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="w-full pr-10 pl-11 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                
                {/* Show/Hide Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Option */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#0284C7] cursor-pointer"
                />
                <span>تذكر تسجيل الدخول على هذا المتصفح</span>
              </label>

              <button
                type="button"
                onClick={() => setShowResetTab(true)}
                className="text-sky-400 hover:text-sky-300 transition text-[11px] font-bold"
              >
                تغيير الرمز؟
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-rose-500/15 border border-rose-500/30 text-rose-300 rounded-2xl text-xs font-bold leading-relaxed text-center flex items-center gap-2 justify-center">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-sm shadow-lg shadow-sky-600/30 cursor-pointer transition transform active:scale-98 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? 'جارٍ التحقق...' : 'دخول إلى لوحة التحكم'}</span>
            </button>

            {/* Quick Auto-Fill for Primary Admin */}
            <div className="pt-2 text-center bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setEmail('ahmedyasser697@gmail.com');
                  setPassword('Ahmed123@@Ahmed');
                }}
                className="w-full flex items-center justify-between text-[11px] text-slate-400 hover:text-sky-300 transition"
              >
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>الأدمن الأساسي:</span>
                  <span className="font-mono text-sky-400 font-bold">ahmedyasser697@gmail.com</span>
                </div>
                <span className="text-[10px] text-sky-500 font-bold bg-sky-500/10 px-2 py-0.5 rounded-md">
                  تعبئة تلقائية
                </span>
              </button>
            </div>

            {/* Back to Home Link */}
            <div className="pt-3 border-t border-slate-800/80 text-center">
              <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition">
                <ArrowRight className="w-3.5 h-3.5" />
                <span>العودة للموقع الرئيسي</span>
              </Link>
            </div>
          </form>
        ) : (
          /* View 2: Change / Reset Password Form */
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>تغيير كلمة مرور الأدمن</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowResetTab(false);
                  setResetMessage({ text: '', type: '' });
                }}
                className="text-xs text-slate-400 hover:text-white"
              >
                إلغاء
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                كلمة المرور الحالية *
              </label>
              <input
                type="password"
                required
                value={resetOldPass}
                onChange={e => setResetOldPass(e.target.value)}
                placeholder="أدخل كلمة المرور الحالية"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                كلمة المرور الجديدة *
              </label>
              <input
                type="password"
                required
                value={resetNewPass}
                onChange={e => setResetNewPass(e.target.value)}
                placeholder="كلمة مرور جديدة (6 أحرف/أرقام على الأقل)"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                تأكيد كلمة المرور الجديدة *
              </label>
              <input
                type="password"
                required
                value={resetConfirmPass}
                onChange={e => setResetConfirmPass(e.target.value)}
                placeholder="أعد كتابة كلمة المرور الجديدة"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {resetMessage.text && (
              <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                resetMessage.type === 'success'
                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
              }`}>
                {resetMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>{resetMessage.text}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition shadow-md shadow-amber-900/30"
            >
              حفظ كلمة المرور الجديدة
            </button>

            <button
              type="button"
              onClick={restoreDefaultCredentials}
              className="w-full py-2 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white font-semibold text-[11px] transition border border-slate-800 flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>استعادة بيانات الأدمن الأساسي الأصلية</span>
            </button>
          </form>
        )}

      </div>
    </main>
  );
}
