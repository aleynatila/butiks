/**
 * Input Component
 * Reusable input field with label, error, and helper text
 */

import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = '',
  ...props 
}, ref) => {
  
  const baseStyles = 'px-4 py-2 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1';
  const normalStyles = 'border-gray-300 focus:border-gray-900 focus:ring-gray-900';
  const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500';
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`${widthClass}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={`${baseStyles} ${error ? errorStyles : normalStyles} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${widthClass} ${className}`}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
