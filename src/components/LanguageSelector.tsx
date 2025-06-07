
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { value: 'ar' as Language, label: 'العربية', flag: '🇸🇦' },
    { value: 'en' as Language, label: 'English', flag: '🇺🇸' }
  ];

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <Globe className="w-4 h-4 text-gray-600" />
      <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
        <SelectTrigger className="w-40">
          <SelectValue>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span>{languages.find(lang => lang.value === language)?.flag}</span>
              <span>{languages.find(lang => lang.value === language)?.label}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
