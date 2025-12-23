import { cn } from '@/lib/utils';
import { FORM_FIELD_BASE_STYLES, FORM_LABEL_STYLES, FORM_ERROR_STYLES, FORM_FIELD_ERROR_STYLES } from '@/lib/form-styles';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className={FORM_LABEL_STYLES}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            ...FORM_FIELD_BASE_STYLES,
            error && FORM_FIELD_ERROR_STYLES,
            className
          )}
          {...props}
        />
        {error && (
          <p className={FORM_ERROR_STYLES}>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
