import React from 'react';

interface FillButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const FillButton: React.FC<FillButtonProps> = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{ 
        fontSize: 'var(--font-size-base)',
        border: '2px solid var(--blue)',
        color: 'var(--blue)',
        backgroundColor: 'transparent'
      }}
    >
      <span className="relative z-10">{children}</span>
      <div 
        className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
        style={{ zIndex: 1 }}
      ></div>
    </button>
  );
};
