import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg";
  
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white",
    secondary: "bg-orange-500 hover:bg-orange-600 text-white",
    outline: "bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};