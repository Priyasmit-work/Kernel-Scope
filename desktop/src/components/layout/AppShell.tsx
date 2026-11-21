import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { Button } from '../ui';

export function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLive, setIsLive] = useState(true);
  const [isAdvancedMode, setIsAdvancedMode] = useState(() => {
    const saved = localStorage.getItem('kernelscope-advanced-mode');
    return saved ? JSON.parse(saved) : true;
  });
  const [notificationCount, setNotificationCount] = useState(0);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  useEffect(() => {
    localStorage.setItem('kernelscope-advanced-mode', JSON.stringify(isAdvancedMode));
  }, [isAdvancedMode]);

  const toggleLive = useCallback(() => setIsLive((prev) => !prev), []);
  const toggleAdvancedMode = useCallback(() => setIsAdvancedMode((prev) => !prev), []);
  const openNotifications = useCallback(() => {
    setNotificationCount(0);
    navigate('/events');
  }, [navigate]);
  const openSettings = useCallback(() => navigate('/settings'), [navigate]);
  const openCommandPalette = useCallback(() => setShowCommandPalette(true), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openCommandPalette();
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openCommandPalette]);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', minWidth: 0 }}>
        <Toolbar
          hostname={window.location.hostname || 'localhost'}
          isLive={isLive}
          onToggleLive={toggleLive}
          isAdvancedMode={isAdvancedMode}
          onToggleAdvancedMode={toggleAdvancedMode}
          notificationCount={notificationCount}
          onOpenNotifications={openNotifications}
          onOpenSettings={openSettings}
          onCommandPalette={openCommandPalette}
        />
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            padding: 'var(--content-padding)',
            backgroundColor: 'var(--bg)',
          }}
          role="main"
        >
          <Outlet />
        </main>
      </div>

      {showCommandPalette && (
        <CommandPalette onClose={() => setShowCommandPalette(false)} onSelect={(path) => { navigate(path); setShowCommandPalette(false); }} />
      )}
    </div>
  );
}

interface CommandPaletteProps {
  onClose: () => void;
  onSelect: (path: string) => void;
}

function CommandPalette({ onClose, onSelect }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const commands = [
    { label: 'Overview', path: '/', icon: <OverviewIcon />, category: 'Monitor' },
    { label: 'Processes', path: '/processes', icon: <ProcessesIcon />, category: 'Monitor' },
    { label: 'CPU', path: '/cpu', icon: <CpuIcon />, category: 'Monitor' },
    { label: 'Memory', path: '/memory', icon: <MemoryIcon />, category: 'Monitor' },
    { label: 'Network', path: '/network', icon: <NetworkIcon />, category: 'Monitor' },
    { label: 'TCP Diagnostics', path: '/tcp', icon: <TcpIcon />, category: 'Diagnostics' },
    { label: 'Events & Alerts', path: '/events', icon: <EventsIcon />, category: 'Diagnostics' },
    { label: 'Settings', path: '/settings', icon: <SettingsIcon />, category: 'Application' },
    { label: 'Toggle Live/Pause', path: '#toggle-live', icon: <PlayPauseIcon />, category: 'Actions' },
    { label: 'Toggle Advanced/Simple', path: '#toggle-mode', icon: <ModeIcon />, category: 'Actions' },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected) {
          if (selected.path.startsWith('#')) {
            if (selected.path === '#toggle-live') {
              // Will be handled by parent
            } else if (selected.path === '#toggle-mode') {
              // Will be handled by parent
            }
          } else {
            onSelect(selected.path);
          }
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredCommands, selectedIndex, onSelect, onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '560px',
        maxHeight: '60vh',
        backgroundColor: 'var(--sidebar)',
        border: '1px solid var(--elevated)',
        borderRadius: '12px',
        boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
        zIndex: 1000,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--elevated)' }}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
          placeholder="Type a command or search..."
          style={{
            width: '100%',
            backgroundColor: 'var(--bg)',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '14px',
            fontFamily: 'inherit',
            padding: '8px 12px',
            borderRadius: '8px',
          }}
          autoFocus
        />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        {filteredCommands.length === 0 ? (
          <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>No commands found</div>
        ) : (
          filteredCommands.map((cmd, idx) => (
            <div
              key={cmd.path}
              onClick={() => {
                if (cmd.path.startsWith('#')) {
                  // Handle actions
                } else {
                  onSelect(cmd.path);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: idx === selectedIndex ? 'var(--elevated)' : 'transparent',
                color: 'var(--text-primary)',
                transition: 'background-color 0.05s',
              }}
            >
              <span style={{ display: 'flex', width: 20, height: 20, color: 'var(--text-secondary)' }}>{cmd.icon}</span>
              <span style={{ flex: 1 }}>{cmd.label}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{cmd.category}</span>
              {cmd.path === '/settings' && <kbd style={{ fontSize: '10px', padding: '2px 6px', background: 'var(--bg)', borderRadius: 4 }}>⌘,</kbd>}
              {cmd.path === '#toggle-live' && <kbd style={{ fontSize: '10px', padding: '2px 6px', background: 'var(--bg)', borderRadius: 4 }}>Space</kbd>}
            </div>
          ))
        )}
      </div>
      <div style={{ padding: '8px 12px', borderTop: '1px solid var(--elevated)', fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', gap: '16px' }}>
        <kbd style={{ padding: '2px 6px', background: 'var(--bg)', borderRadius: 4 }}>↑/↓</kbd> Navigate
        <kbd style={{ padding: '2px 6px', background: 'var(--bg)', borderRadius: 4 }}>Enter</kbd> Select
        <kbd style={{ padding: '2px 6px', background: 'var(--bg)', borderRadius: 4 }}>Esc</kbd> Close
      </div>
    </div>
  );
}

// Icons for CommandPalette
function OverviewIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function ProcessesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h6" />
      <path d="M9 15h6" />
    </svg>
  );
}

function CpuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M9 4v1" />
      <path d="M9 19v1" />
      <path d="M4 9h1" />
      <path d="M19 9h1" />
      <path d="M4 15h1" />
      <path d="M19 15h1" />
    </svg>
  );
}

function MemoryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 1 10 10c0 4.97-4.03 9-9 9s-9-4.03-9-9a10 10 0 0 1 10-10z" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function TcpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      <path d="M15 9v6" />
      <path d="M9 12h6" />
    </svg>
  );
}

function EventsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function PlayPauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function ModeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="20" y2="4" />
    </svg>
  );
}