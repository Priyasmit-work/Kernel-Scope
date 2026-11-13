import React from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'critical' | 'info';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'background: var(--elevated); color: var(--text-secondary);',
  success: 'background: rgba(34, 197, 94, 0.15); color: var(--success); border: 1px solid rgba(34, 197, 94, 0.3);',
  warning: 'background: rgba(245, 158, 11, 0.15); color: var(--warning); border: 1px solid rgba(245, 158, 11, 0.3);',
  critical: 'background: rgba(239, 68, 68, 0.15); color: var(--critical); border: 1px solid rgba(239, 68, 68, 0.3);',
  info: 'background: rgba(59, 130, 246, 0.15); color: var(--highlight-blue); border: 1px solid rgba(59, 130, 246, 0.3);',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'padding: 2px 8px; font-size: 11px; border-radius: 9999px;',
  md: 'padding: 4px 10px; font-size: 12px; border-radius: 9999px;',
};

export function Badge({ children, variant = 'default', size = 'md', className = '', dot = false }: BadgeProps) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontWeight: 500,
        fontFamily: 'inherit',
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        ...(variantStyles[variant]),
        ...(sizeStyles[size]),
      }}
    >
      {dot && (
        <span
          style={{
            width: size === 'sm' ? '6px' : '8px',
            height: size === 'sm' ? '6px' : '8px',
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  );
}

export function StatusDot({ status, size = 8 }: { status: 'running' | 'stopped' | 'warning' | 'unknown'; size?: number }) {
  const colors = {
    running: 'var(--success)',
    stopped: 'var(--text-secondary)',
    warning: 'var(--warning)',
    unknown: 'var(--critical)',
  };

  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: colors[status],
        boxShadow: `0 0 ${size * 0.75}px ${colors[status]}`,
      }}
    />
  );
}