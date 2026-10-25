import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({ message = "Failed to load data. Please check your connection.", onRetry }) => {
  return (
    <div className="bg-red-50/60 rounded-3xl p-8 text-center border border-red-200 max-w-md mx-auto my-8 space-y-4">
      <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-stone-900">Connection Issue</h3>
      <p className="text-sm text-stone-600">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} icon={RefreshCw}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
