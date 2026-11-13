import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', elevated = false, onClick }: CardProps) {
  const baseStyles = `
    background: var(--card);
    border-radius: var(--card-radius);
    border: 1px solid var(--elevated);
    ${elevated ? 'box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);' : ''}
    ${onClick ? 'cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s;' : ''}
  `;

  return (
    <div
      className={className}
      style={{ cssText: baseStyles }}
      onClick={onClick}
      onMouseEnter={onClick ? () => {} : undefined}
      onMouseLeave={onClick ? () => {} : undefined}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, action, className = '' }: CardHeaderProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: '1px solid var(--elevated)',
      }}
    >
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className} style={{ padding: '20px' }}>
      {children}
    </div>
  );
}