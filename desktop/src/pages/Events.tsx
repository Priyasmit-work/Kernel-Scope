import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Badge, Button, IconButton } from '../components/ui';

const events = [
  { id: 1, time: '2026-11-14 14:32:15', level: 'critical', source: 'OOM Killer', message: 'Process chrome.exe (PID 12456) killed due to OOM', pid: 12456 },
  { id: 2, time: '2026-11-14 14:30:02', level: 'warning', source: 'TCP Retransmit', message: 'High retransmission rate on connection to 104.18.32.240:443', pid: 12456 },
  { id: 3, time: '2026-11-14 14:28:45', level: 'info', source: 'Process Start', message: 'docker.exe (PID 1842) started by user raj', pid: 1842 },
  { id: 4, time: '2026-11-14 14:25:10', level: 'warning', source: 'CPU Throttle', message: 'Thermal throttling detected on CPU core 3', pid: 0 },
  { id: 5, time: '2026-11-14 14:22:33', level: 'info', source: 'Network', message: 'New interface vEthernet (WSL) up at 10 Gbps', pid: 0 },
  { id: 6, time: '2026-11-14 14:20:01', level: 'critical', source: 'Disk Error', message: 'I/O error on /dev/nvme0n1p2, sector 2048576', pid: 0 },
  { id: 7, time: '2026-11-14 14:18:22', level: 'info', source: 'Process Exit', message: 'python.exe (PID 567) exited with code 0', pid: 567 },
  { id: 8, time: '2026-11-14 14:15:44', level: 'warning', source: 'Memory Pressure', message: 'Available memory below 10% (2.1 GB free)', pid: 0 },
  { id: 9, time: '2026-11-14 14:12:05', level: 'info', source: 'TCP Connect', message: 'New ESTABLISHED connection to 142.250.190.46:443', pid: 12456 },
  { id: 10, time: '2026-11-14 14:10:30', level: 'info', source: 'System', message: 'KernelScope agent connected successfully', pid: 0 },
];

const levelConfig = {
  critical: { color: 'var(--critical)', bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', icon: '🔴' },
  warning: { color: 'var(--warning)', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', icon: '🟡' },
  info: { color: 'var(--primary-blue)', bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', icon: '🔵' },
};

export function Events() {
  const [filterLevel, setFilterLevel] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [search, setSearch] = useState('');

  const filtered = events.filter((e) => {
    if (filterLevel !== 'all' && e.level !== filterLevel) return false;
    if (search && !e.message.toLowerCase().includes(search.toLowerCase()) && !e.source.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 280, padding: '8px 12px', fontSize: '13px' }}
          />
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value as any)}
            style={{ padding: '8px 12px', fontSize: '13px', minWidth: 140 }}
          >
            <option value="all">All Levels</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="ghost" size="sm" leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M1 20l21-21" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>}>Refresh</Button>
          <Button variant="secondary" size="sm" leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>}>Export</Button>
          <Button variant="secondary" size="sm" leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="12" x2="9" y2="12" /></svg>}>Clear</Button>
        </div>
      </div>

      <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CardHeader title="Event Timeline" subtitle={`${filtered.length} events`} />
        <div style={{ flex: 1, overflow: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>No events match the current filter</div>
          ) : (
            <div style={{ padding: '8px' }}>
              {filtered.map((event, i) => {
                const config = levelConfig[event.level];
                return (
                  <div
                    key={event.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '12px',
                      background: config.bg,
                      border: `1px solid ${config.border}`,
                      borderRadius: 8,
                      marginBottom: 8,
                      transition: 'background 0.1s',
                    }}
                  >
                    <div style={{ width: 160, fontSize: '12px', color: 'var(--text-secondary)', flexShrink: 0, fontFamily: 'JetBrains Mono' }}>{event.time}</div>
                    <Badge size="sm" variant={event.level} dot>{event.level.toUpperCase()}</Badge>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 600 }}>{event.source}</span>
                        {event.pid && <span className="mono" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>PID: {event.pid}</span>}
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{event.message}</div>
                    </div>
                    <IconButton variant="ghost" size="sm" aria-label="Copy event details"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg></IconButton>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}