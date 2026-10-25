import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/common/SEOHead';

const NotFoundPage = () => {
  const { currentLang } = useLanguage();
  const lang = currentLang || 'en';

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <SEOHead 
        title={lang === 'ar' ? 'الصفحة غير موجودة | الهناء جروب' : 'Page Not Found | El Hana Group'}
        description="404 Error: The page you are looking for does not exist."
      />
      <div className="max-w-xl w-full bg-slate-800/80 rounded-3xl p-8 sm:p-12 text-center border border-slate-700/80 shadow-2xl backdrop-blur-md">
        <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-white mb-4">404</h1>
        
        <h2 className="text-xl sm:text-2xl font-bold text-slate-300 mb-4">
          {lang === 'ar' ? 'عذراً، هذه الصفحة غير متوفرة!' : 'Oops, Page Not Found!'}
        </h2>
        
        <p className="text-sm text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
          {lang === 'ar'
            ? 'يبدو أنك وصلت لرابط غير صحيح أو تم تغيير مسار هذه الرحلة. يمكنك العودة للصفحة الرئيسية واستكشاف رحلاتنا مجدداً.'
            : 'It seems you followed a broken link or the page has been moved. You can head back to the homepage to explore our tours.'}
        </p>

        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369a1] text-white text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Home className="w-4 h-4" />
          <span>{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
