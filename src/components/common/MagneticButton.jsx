import React from 'react';

export const MagneticButton = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`inline-block cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MagneticButton;
