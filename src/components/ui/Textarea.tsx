import { cn } from '@/lib/utils';
import { FORM_FIELD_BASE_STYLES, FORM_LABEL_STYLES, FORM_ERROR_STYLES, FORM_FIELD_ERROR_STYLES } from '@/lib/form-styles';
import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className={FORM_LABEL_STYLES}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            ...FORM_FIELD_BASE_STYLES,
            'resize-none',
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

Textarea.displayName = 'Textarea';
