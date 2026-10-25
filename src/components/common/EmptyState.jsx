import React from 'react';
import { useTranslation } from 'react-i18next';
import { Compass, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({ title, message, onReset }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const defaultTitle = isAr ? "لم يتم العثور على رحلات مطابقة" : "No experiences found";
  const defaultMessage = isAr ? "جرّب تغيير كلمات البحث أو تعديل الفلاتر المختارة." : "Try adjusting your search criteria or filters.";
  const defaultResetText = isAr ? "إعادة ضبط الفلاتر" : "Reset Filters";

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-sky-100 shadow-md max-w-md mx-auto my-8 space-y-4">
      <div className="w-16 h-16 bg-[#0284C7]/15 text-[#0284C7] rounded-full flex items-center justify-center mx-auto border border-[#0284C7]/30">
        <Compass className="w-8 h-8 animate-spin-slow text-[#0284C7]" />
      </div>
      <h3 className="text-xl font-black text-slate-900 font-heading">{title || defaultTitle}</h3>
      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{message || defaultMessage}</p>
      {onReset && (
        <Button variant="outline" size="sm" onClick={onReset} icon={RefreshCw}>
          {defaultResetText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
