import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Badge, Button, IconButton } from '../components/ui';

const mockProcesses = [
  { pid: 12456, name: 'chrome.exe', user: 'raj', cpu: '18.2', mem: '1,245', status: 'running' },
  { pid: 8934, name: 'code.exe', user: 'raj', cpu: '12.7', mem: '892', status: 'running' },
  { pid: 3210, name: 'node.exe', user: 'raj', cpu: '8.4', mem: '456', status: 'running' },
  { pid: 1842, name: 'docker.exe', user: 'system', cpu: '5.2', mem: '1,102', status: 'running' },
  { pid: 921, name: 'explorer.exe', user: 'raj', cpu: '2.1', mem: '234', status: 'running' },
  { pid: 456, name: 'svchost.exe', user: 'system', cpu: '1.8', mem: '156', status: 'running' },
  { pid: 789, name: 'teams.exe', user: 'raj', cpu: '3.4', mem: '567', status: 'sleeping' },
  { pid: 234, name: 'chrome.exe', user: 'raj', cpu: '0.8', mem: '234', status: 'sleeping' },
  { pid: 567, name: 'python.exe', user: 'raj', cpu: '4.2', mem: '345', status: 'running' },
  { pid: 890, name: 'postgres.exe', user: 'postgres', cpu: '2.1', mem: '678', status: 'running' },
];

export function Processes() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'cpu' | 'mem' | 'pid' | 'name'>('cpu');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filtered = mockProcesses
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || String(p.pid).includes(search))
    .sort((a, b) => {
      const av = sortBy === 'cpu' || sortBy === 'mem' ? parseFloat(a[sortBy].replace(',', '')) : a[sortBy];
      const bv = sortBy === 'cpu' || sortBy === 'mem' ? parseFloat(b[sortBy].replace(',', '')) : b[sortBy];
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

  const SortableHeader = ({ label, key: sortKey }: { label: string; key: 'cpu' | 'mem' | 'pid' | 'name' }) => (
    <button
      style={{
        background: 'none',
        border: 'none',
        color: sortBy === sortKey ? 'var(--primary-blue)' : 'var(--text-secondary)',
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        cursor: 'pointer',
        padding: '8px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}
      onClick={() => {
        if (sortBy === sortKey) {
          setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
          setSortBy(sortKey);
          setSortDir('desc');
        }
      }}
    >
      {label}
      {sortBy === sortKey && (sortDir === 'asc' ? '▲' : '▼')}
    </button>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input
            type="text"
            placeholder="Search processes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 300, padding: '8px 12px', fontSize: '13px' }}
          />
          <Badge size="sm" variant="info" className="mono">{filtered.length} processes</Badge>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="ghost" size="sm" leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M1 20l21-21" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>}>Refresh</Button>
          <Button variant="secondary" size="sm" leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="12" x2="9" y2="12" /></svg>}>End Process</Button>
        </div>
      </div>

      <Card style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--elevated)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ color: 'var(--text-secondary)' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px', width: 80 }}><SortableHeader label="PID" key="pid" /></th>
                <th style={{ textAlign: 'left', padding: '8px 12px', width: 200 }}><SortableHeader label="Name" key="name" /></th>
                <th style={{ textAlign: 'left', padding: '8px 12px', width: 100 }}><SortableHeader label="User" key="user" /></th>
                <th style={{ textAlign: 'right', padding: '8px 12px', width: 80 }}><SortableHeader label="CPU %" key="cpu" /></th>
                <th style={{ textAlign: 'right', padding: '8px 12px', width: 100 }}><SortableHeader label="Memory (MB)" key="mem" /></th>
                <th style={{ textAlign: 'left', padding: '8px 12px', width: 100 }}>Status</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', width: 120 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((proc, i) => (
                <tr key={proc.pid} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--elevated)' : 'none' }}>
                  <td style={{ padding: '10px 12px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-secondary)' }}>{proc.pid}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 500 }}>{proc.name}</td>
                  <td style={{ padding: '10px 12px', fontSize: '12px', color: 'var(--text-secondary)' }}>{proc.user}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'JetBrains Mono', fontWeight: 500, color: parseFloat(proc.cpu) > 10 ? 'var(--warning)' : 'var(--text-primary)' }}>{proc.cpu}%</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-secondary)' }}>{proc.mem}</td>
                  <td style={{ padding: '10px 12px' }}><Badge size="sm" variant={proc.status === 'running' ? 'success' : 'default'} dot>{proc.status}</Badge></td>
                  <td style={{ padding: '10px 12px' }}>
                    <IconButton variant="ghost" size="sm" aria-label={`End ${proc.name}`}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="12" x2="9" y2="12" /></svg></IconButton>
                    <IconButton variant="ghost" size="sm" aria-label={`Details for ${proc.name}`}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg></IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}