import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success', duration = 4000) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  const hideToast = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, toast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
