
import React from 'react';

const LoadingFallback = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto animate-pulse">
          <div className="w-8 h-8 bg-white rounded"></div>
        </div>
        <h1 className="text-2xl font-bold text-blue-800">Windows 10 Countdown</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
