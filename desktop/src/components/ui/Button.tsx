import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    background: var(--primary-blue);
    color: white;
    border: none;
  `,
  secondary: `
    background: var(--elevated);
    color: var(--text-primary);
    border: 1px solid var(--sidebar);
  `,
  ghost: `
    background: transparent;
    color: var(--text-primary);
    border: none;
  `,
  danger: `
    background: var(--critical);
    color: white;
    border: none;
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'padding: 6px 12px; font-size: 12px; border-radius: 6px;',
  md: 'padding: 8px 16px; font-size: 14px; border-radius: 8px;',
  lg: 'padding: 12px 24px; font-size: 15px; border-radius: 8px;',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className = '',
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseStyle = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: inherit;
    font-weight: 500;
    cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
    transition: opacity 0.15s, background-color 0.15s, border-color 0.15s;
    opacity: ${isDisabled ? 0.5 : 1};
    width: ${fullWidth ? '100%' : 'auto'};
    white-space: nowrap;
    ${variantStyles[variant]}
    ${sizeStyles[size]}
  `;

  const hoverStyles = {
    primary: 'background: #2563EB;',
    secondary: 'background: var(--sidebar); border-color: var(--elevated);',
    ghost: 'background: var(--elevated);',
    danger: 'background: #DC2626;',
  };

  return (
    <button
      className={className}
      style={{ cssText: baseStyle, ...style }}
      disabled={isDisabled}
      onMouseEnter={!isDisabled ? (e) => { e.currentTarget.style.cssText += hoverStyles[variant]; } : undefined}
      onMouseLeave={!isDisabled ? (e) => { e.currentTarget.style.cssText = baseStyle; } : undefined}
      {...props}
    >
      {loading ? (
        <svg
          style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="31.4 31.4"
            style={{ animation: 'spin 1s linear infinite' }}
          />
        </svg>
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}

export function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  'aria-label': ariaLabel,
  ...props
}: Omit<ButtonProps, 'children'> & { 'aria-label': string; children: React.ReactNode }) {
  return (
    <Button
      variant={variant}
      size={size}
      style={{ padding: size === 'sm' ? '6px' : size === 'lg' ? '12px' : '8px', ...props.style }}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Button>
  );
}