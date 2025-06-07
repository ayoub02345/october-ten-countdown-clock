
import CountdownTimer from "@/components/CountdownTimer";
import LanguageSelector from "@/components/LanguageSelector";
import { useAdSense } from "@/hooks/useAdSense";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  // Initialize AdSense
  useAdSense();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%230369a1%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        <CountdownTimer />
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-500 text-sm space-y-2">
        <p>
          {t('footerText')}
        </p>
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
          <span>{t('madeWithLove')}</span>
          <a 
            href="https://x.com/ayoub17111" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Ayoub
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
