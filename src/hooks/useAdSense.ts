
import { useEffect } from 'react';

export const useAdSense = () => {
  useEffect(() => {
    // Check if the script is already loaded
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6528013296323055';
      script.crossOrigin = 'anonymous';
      
      // Enhanced error handling
      script.onerror = (error) => {
        console.error('Failed to load AdSense script:', error);
        // Remove the failed script element
        script.remove();
      };
      
      script.onload = () => {
        console.log('AdSense script loaded successfully');
      };
      
      // Security: Validate the script source before adding
      if (script.src.includes('googlesyndication.com')) {
        document.head.appendChild(script);
      } else {
        console.error('Invalid AdSense script source');
      }
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
