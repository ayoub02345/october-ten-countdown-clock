
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AdSense from './AdSense';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date('2025-10-14T00:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: t('days'), value: timeLeft.days },
    { label: t('hours'), value: timeLeft.hours },
    { label: t('minutes'), value: timeLeft.minutes },
    { label: t('seconds'), value: timeLeft.seconds },
  ];

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {t('windows10')}
          </h1>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            {t('supportEndsCountdown')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('supportDescription')}
          </p>
        </div>
      </div>

      {/* Top Ad - Banner */}
      <div className="w-full max-w-4xl">
        <AdSense 
          adSlot="1234567890" 
          adFormat="horizontal"
          className="text-center mb-4"
        />
      </div>

      {/* Status Badge */}
      <Badge 
        variant={isExpired ? "destructive" : "default"}
        className="px-4 py-2 text-sm font-medium"
      >
        {isExpired ? (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <AlertTriangle className="w-4 h-4" />
            <span>{t('supportHasEnded')}</span>
          </div>
        ) : (
          t('supportStillActive')
        )}
      </Badge>

      {/* Countdown Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl">
        {timeUnits.map((unit, index) => (
          <Card key={unit.label} className="bg-gradient-to-b from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="text-3xl md:text-5xl font-bold text-blue-700 mb-2 font-mono">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base font-medium text-blue-600 uppercase tracking-wide">
                {unit.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Middle Ad - Rectangle */}
      <div className="w-full max-w-md">
        <AdSense 
          adSlot="2345678901" 
          adFormat="rectangle"
          className="text-center my-4"
        />
      </div>

      {/* Target Date Display */}
      <Card className="w-full max-w-md bg-gray-50 border-gray-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {t('endOfSupportDate')}
          </h3>
          <div className="text-2xl font-bold text-red-600">
            {t('october14')}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {t('utcTime')}
          </p>
        </CardContent>
      </Card>

      {/* Information Section */}
      <div className="max-w-3xl mx-auto text-center space-y-4 bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-amber-700">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="text-lg font-semibold">{t('importantInformation')}</h3>
        </div>
        <p className="text-amber-800 text-sm leading-relaxed">
          {t('warningText')}
        </p>
      </div>

      {/* Bottom Ad - Banner */}
      <div className="w-full max-w-4xl">
        <AdSense 
          adSlot="3456789012" 
          adFormat="horizontal"
          className="text-center mt-4"
        />
      </div>
    </div>
  );
};

export default CountdownTimer;
