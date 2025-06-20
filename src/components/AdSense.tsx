
import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style,
  className = ''
}) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Security: Validate adSlot format (should be numeric)
    if (!/^\d+$/.test(adSlot)) {
      console.warn('Invalid AdSense slot format:', adSlot);
      return;
    }

    try {
      // Push the ad to AdSense with error handling
      if (window.adsbygoogle && adRef.current) {
        // Check if the ad has already been initialized
        const existingAd = adRef.current.getAttribute('data-adsbygoogle-status');
        if (!existingAd) {
          (window.adsbygoogle as any[]).push({});
        }
      }
    } catch (error) {
      console.error('AdSense initialization error:', error);
    }
  }, [adSlot]);

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6528013296323055"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
};

export default AdSense;
