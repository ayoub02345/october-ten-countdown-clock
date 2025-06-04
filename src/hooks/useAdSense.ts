
import { useEffect } from 'react';

export const useAdSense = () => {
  useEffect(() => {
    // Check if the script is already loaded
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6528013296323055';
      script.crossOrigin = 'anonymous';
      
      script.onerror = () => {
        console.error('Failed to load AdSense script');
      };
      
      document.head.appendChild(script);
    }

    // Initialize adsbygoogle array if it doesn't exist
    if (!window.adsbygoogle) {
      window.adsbygoogle = [];
    }
  }, []);
};

// Extend the Window interface to include adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
