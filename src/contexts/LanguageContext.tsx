import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation data
const translations = {
  ar: {
    'windows10': 'ويندوز 10',
    'supportEndsCountdown': 'العد التنازلي لانتهاء الدعم',
    'supportDescription': 'ستنهي مايكروسوفت دعم ويندوز 10 في 14 أكتوبر 2025. الوقت المتبقي حتى انتهاء الدعم:',
    'supportHasEnded': 'انتهى الدعم',
    'supportStillActive': 'الدعم لا يزال نشطاً',
    'days': 'يوماً',
    'hours': 'ساعات',
    'minutes': 'دقائق',
    'seconds': 'ثوان',
    'endOfSupportDate': 'تاريخ انتهاء الدعم',
    'october14': '14 أكتوبر 2025',
    'utcTime': '12:00 ص بالتوقيت العالمي',
    'importantInformation': 'معلومات مهمة',
    'warningText': 'بعد 14 أكتوبر 2025، لن تقوم مايكروسوفت بتوفير تحديثات الأمان أو إصلاحات الأخطاء أو الدعم التقني لويندوز 10. فكر في الترقية إلى ويندوز 11 أو استكشاف أنظمة التشغيل البديلة لضمان بقاء جهازك آمناً.',
    'footerText': 'هذا العد التنازلي يتتبع النهاية الرسمية لدعم ويندوز 10 كما أعلنت مايكروسوفت'
  },
  en: {
    'windows10': 'Windows 10',
    'supportEndsCountdown': 'Support Ends Countdown',
    'supportDescription': 'Microsoft will end support for Windows 10 on October 14, 2025. Time remaining until the end of support:',
    'supportHasEnded': 'Support Has Ended',
    'supportStillActive': 'Support Still Active',
    'days': 'Days',
    'hours': 'Hours',
    'minutes': 'Minutes',
    'seconds': 'Seconds',
    'endOfSupportDate': 'End of Support Date',
    'october14': 'October 14, 2025',
    'utcTime': '12:00 AM UTC',
    'importantInformation': 'Important Information',
    'warningText': 'After October 14, 2025, Microsoft will no longer provide security updates, bug fixes, or technical support for Windows 10. Consider upgrading to Windows 11 or exploring alternative operating systems to ensure your device remains secure.',
    'footerText': 'This countdown tracks the official end of Windows 10 support as announced by Microsoft'
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar'); // Arabic by default

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
