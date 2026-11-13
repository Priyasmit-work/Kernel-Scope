import React from 'react';
import { Button, Badge, IconButton } from '../ui';

interface ToolbarProps {
  hostname: string;
  isLive: boolean;
  onToggleLive: () => void;
  isAdvancedMode: boolean;
  onToggleAdvancedMode: () => void;
  notificationCount: number;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onCommandPalette: () => void;
}

export function Toolbar({
  hostname,
  isLive,
  onToggleLive,
  isAdvancedMode,
  onToggleAdvancedMode,
  notificationCount,
  onOpenNotifications,
  onOpenSettings,
  onCommandPalette,
}: ToolbarProps) {
  return (
    <header
      style={{
        height: 'var(--toolbar-height)',
        backgroundColor: 'var(--sidebar)',
        borderBottom: '1px solid var(--elevated)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
      }}
      role="banner"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, var(--primary-blue), var(--cyan))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em' }}>KernelScope</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px', borderLeft: '1px solid var(--elevated)', borderRight: '1px solid var(--elevated)' }}>
          <span className="mono" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{hostname}</span>
          <Badge size="sm" variant={isLive ? 'success' : 'warning'} dot>
            {isLive ? 'Live' : 'Paused'}
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleLive}
          aria-label={isLive ? 'Pause monitoring' : 'Resume monitoring'}
          leftIcon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isLive ? (
                <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
              ) : (
                <polygon points="5 3 19 12 5 21 5 3" />
              )}
            </svg>
          }
        >
          {isLive ? 'Pause' : 'Resume'}
        </Button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleAdvancedMode}
          aria-label={isAdvancedMode ? 'Switch to Simple mode' : 'Switch to Advanced mode'}
          leftIcon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="20" y2="4" />
            </svg>
          }
        >
          {isAdvancedMode ? 'Advanced' : 'Simple'}
        </Button>

        <IconButton
          variant="ghost"
          size="md"
          onClick={onOpenNotifications}
          aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount})` : ''}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {notificationCount > 0 && (
            <span style={{ position: 'absolute', top: 4, right: 4, minWidth: 18, height: 18, borderRadius: 9, background: 'var(--critical)', color: 'white', fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </IconButton>

        <IconButton
          variant="ghost"
          size="md"
          onClick={onOpenSettings}
          aria-label="Settings"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </IconButton>

        <IconButton
          variant="ghost"
          size="md"
          onClick={onCommandPalette}
          aria-label="Command palette (Ctrl+K)"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <kbd style={{ marginLeft: 4, padding: '2px 6px', fontSize: '10px', fontFamily: 'inherit', background: 'var(--elevated)', borderRadius: 4, color: 'var(--text-secondary)' }}>⌘K</kbd>
        </IconButton>
      </div>
    </header>
  );
}