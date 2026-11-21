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

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--primary-blue)',
    color: 'white',
    border: 'none',
  },
  secondary: {
    background: 'var(--elevated)',
    color: 'var(--text-primary)',
    border: '1px solid var(--sidebar)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: 'none',
  },
  danger: {
    background: 'var(--critical)',
    color: 'white',
    border: 'none',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '6px 12px', fontSize: '12px', borderRadius: '6px' },
  md: { padding: '8px 16px', fontSize: '14px', borderRadius: '8px' },
  lg: { padding: '12px 24px', fontSize: '15px', borderRadius: '8px' },
};

const hoverStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: { background: '#2563EB' },
  secondary: { background: 'var(--sidebar)', borderColor: 'var(--elevated)' },
  ghost: { background: 'var(--elevated)' },
  danger: { background: '#DC2626' },
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

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'inherit',
    fontWeight: 500,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'opacity 0.15s, background-color 0.15s, border-color 0.15s',
    opacity: isDisabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    whiteSpace: 'nowrap',
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  return (
    <button
      className={className}
      style={baseStyle}
      disabled={isDisabled}
      onMouseEnter={!isDisabled ? (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        Object.assign(target.style, hoverStyles[variant]);
      } : undefined}
      onMouseLeave={!isDisabled ? (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        Object.assign(target.style, variantStyles[variant], sizeStyles[size]);
      } : undefined}
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