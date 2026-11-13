import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Badge } from '../ui';

export interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  badgeVariant?: 'default' | 'success' | 'warning' | 'critical' | 'info';
}

const MONITOR_ITEMS: NavItem[] = [
  { path: '/', label: 'Overview', icon: <OverviewIcon /> },
  { path: '/processes', label: 'Processes', icon: <ProcessesIcon /> },
  { path: '/cpu', label: 'CPU', icon: <CpuIcon /> },
  { path: '/memory', label: 'Memory', icon: <MemoryIcon /> },
  { path: '/network', label: 'Network', icon: <NetworkIcon /> },
];

const DIAGNOSTICS_ITEMS: NavItem[] = [
  { path: '/tcp', label: 'TCP Diagnostics', icon: <TcpIcon /> },
  { path: '/events', label: 'Events & Alerts', icon: <EventsIcon /> },
];

const APPLICATION_ITEMS: NavItem[] = [
  { path: '/settings', label: 'Settings', icon: <SettingsIcon /> },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '12px 16px 8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>
      {children}
    </div>
  );
}

function NavLinkItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <NavLink
      to={item.path}
      style={({ isActive: active }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        margin: '2px 8px',
        borderRadius: '8px',
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        backgroundColor: active ? 'var(--elevated)' : 'transparent',
        fontWeight: active ? 500 : 400,
        fontSize: '13px',
        textDecoration: 'none',
        transition: 'background-color 0.1s, color 0.1s',
        '&:hover': {
          backgroundColor: active ? 'var(--elevated)' : 'var(--sidebar)',
          color: 'var(--text-primary)',
        },
      })}
    >
      <span style={{ display: 'flex', width: 20, height: 20, color: 'inherit' }}>{item.icon}</span>
      <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
      {item.badge && <Badge size="sm" variant={item.badgeVariant || 'default'}>{item.badge}</Badge>}
    </NavLink>
  );
}

export function Sidebar() {
  const location = useLocation();

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        height: '100%',
        backgroundColor: 'var(--sidebar)',
        borderRight: '1px solid var(--elevated)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        flexShrink: 0,
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div style={{ padding: '16px', borderBottom: '1px solid var(--elevated)' }}>
        <h1 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          KernelScope
        </h1>
      </div>

      <nav style={{ flex: 1, padding: '8px 0' }}>
        <SectionTitle>MONITOR</SectionTitle>
        {MONITOR_ITEMS.map((item) => (
          <NavLinkItem key={item.path} item={item} isActive={location.pathname === item.path} />
        ))}

        <SectionTitle>DIAGNOSTICS</SectionTitle>
        {DIAGNOSTICS_ITEMS.map((item) => (
          <NavLinkItem key={item.path} item={item} isActive={location.pathname === item.path} />
        ))}

        <SectionTitle>APPLICATION</SectionTitle>
        {APPLICATION_ITEMS.map((item) => (
          <NavLinkItem key={item.path} item={item} isActive={location.pathname === item.path} />
        ))}
      </nav>

      <div style={{ padding: '16px', borderTop: '1px solid var(--elevated)' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center' }}>
          v0.1.0-dev
        </div>
      </div>
    </aside>
  );
}

// Icons
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