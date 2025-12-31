import React from 'react';

const Button = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition duration-300 font-medium cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
