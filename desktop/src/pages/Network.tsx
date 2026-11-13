import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Badge, Button } from '../components/ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const netHistory = Array.from({ length: 60 }, (_, i) => ({
  time: `${i}s`,
  download: Math.random() * 50,
  upload: Math.random() * 15,
}));

const interfaces = [
  { name: 'Ethernet0', ipv4: '192.168.1.42', ipv6: 'fe80::1', speed: '1 Gbps', status: 'up', rx: '2.4 GB', tx: '890 MB' },
  { name: 'Wi-Fi', ipv4: '192.168.1.43', ipv6: 'fe80::2', speed: '866 Mbps', status: 'up', rx: '1.2 GB', tx: '456 MB' },
  { name: 'Docker0', ipv4: '172.17.0.1', ipv6: '—', speed: '—', status: 'up', rx: '120 MB', tx: '89 MB' },
  { name: 'vEthernet (WSL)', ipv4: '172.28.16.1', ipv6: 'fe80::3', speed: '10 Gbps', status: 'up', rx: '5.6 GB', tx: '2.1 GB' },
];

const connections = [
  { proto: 'TCP', local: '192.168.1.42:54321', remote: '142.250.190.46:443', state: 'ESTABLISHED', pid: 12456, process: 'chrome.exe' },
  { proto: 'TCP', local: '192.168.1.42:54322', remote: '20.189.173.15:443', state: 'ESTABLISHED', pid: 8934, process: 'code.exe' },
  { proto: 'TCP', local: '192.168.1.42:54323', remote: '104.18.32.240:443', state: 'ESTABLISHED', pid: 12456, process: 'chrome.exe' },
  { proto: 'TCP', local: '127.0.0.1:5432', remote: '127.0.0.1:54324', state: 'ESTABLISHED', pid: 890, process: 'postgres.exe' },
  { proto: 'UDP', local: '192.168.1.42:5353', remote: '*:*', state: 'LISTEN', pid: 921, process: 'explorer.exe' },
  { proto: 'TCP', local: '192.168.1.42:54324', remote: '151.101.66.133:443', state: 'TIME_WAIT', pid: 0, process: '—' },
];

export function Network() {
  const [activeTab, setActiveTab] = useState<'overview' | 'connections' | 'interfaces'>('overview');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      <div style={{ display: 'flex', gap: '4px', background: 'var(--elevated)', borderRadius: 8, padding: '4px' }}>
        {(['overview', 'connections', 'interfaces'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: 'none',
              background: activeTab === tab ? 'var(--card)' : 'transparent',
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          <Card style={{ gridColumn: '1 / -1' }}>
            <CardHeader title="Throughput" subtitle="Network I/O history (last 60s)" />
            <CardContent style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={netHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--elevated)" />
                  <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={11} tick={{ fill: 'var(--text-secondary)' }} />
                  <YAxis stroke="var(--text-secondary)" fontSize={11} tick={{ fill: 'var(--text-secondary)' }} />
                  <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--elevated)', borderRadius: 8 }} />
                  <Line type="monotone" dataKey="download" stroke="var(--success)" strokeWidth={2} dot={false} name="Download" />
                  <Line type="monotone" dataKey="upload" stroke="var(--warning)" strokeWidth={2} dot={false} name="Upload" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <Card>
              <CardHeader title="Download" subtitle="Current rate" />
              <CardContent>
                <div style={{ fontSize: '36px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--success)' }}>45.2 MB/s</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Total: 2.4 GB received</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Upload" subtitle="Current rate" />
              <CardContent>
                <div style={{ fontSize: '36px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--warning)' }}>12.8 MB/s</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Total: 890 MB sent</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Connections" subtitle="Active TCP/UDP" />
              <CardContent>
                <div style={{ fontSize: '36px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--primary-blue)' }}>142</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Established: 98 | Listen: 24</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Errors / Drops" subtitle="Interface counters" />
              <CardContent>
                <div style={{ fontSize: '36px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--critical)' }}>0</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Rx errors: 0 | Tx drops: 0</div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {activeTab === 'connections' && (
        <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <CardHeader title="Active Connections" subtitle={`${connections.length} connections`} />
          <div style={{ overflowX: 'auto', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ color: 'var(--text-secondary)', background: 'var(--elevated)' }}>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Proto</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Local Address</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Remote Address</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>State</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>PID</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Process</th>
                </tr>
              </thead>
              <tbody>
                {connections.map((conn, i) => (
                  <tr key={i} style={{ borderBottom: i < connections.length - 1 ? '1px solid var(--elevated)' : 'none' }}>
                    <td style={{ padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{conn.proto}</td>
                    <td style={{ padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{conn.local}</td>
                    <td style={{ padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{conn.remote}</td>
                    <td style={{ padding: '12px' }}><Badge size="sm" variant={conn.state === 'ESTABLISHED' ? 'success' : conn.state === 'LISTEN' ? 'info' : 'default'}>{conn.state}</Badge></td>
                    <td style={{ padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-secondary)' }}>{conn.pid || '—'}</td>
                    <td style={{ padding: '12px', fontWeight: 500 }}>{conn.process}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'interfaces' && (
        <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <CardHeader title="Network Interfaces" subtitle={`${interfaces.length} interfaces`} />
          <div style={{ overflowX: 'auto', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ color: 'var(--text-secondary)', background: 'var(--elevated)' }}>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Interface</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>IPv4</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>IPv6</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Speed</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Received</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Sent</th>
                </tr>
              </thead>
              <tbody>
                {interfaces.map((iface, i) => (
                  <tr key={i} style={{ borderBottom: i < interfaces.length - 1 ? '1px solid var(--elevated)' : 'none' }}>
                    <td style={{ padding: '12px', fontWeight: 500 }}>{iface.name}</td>
                    <td style={{ padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-secondary)' }}>{iface.ipv4}</td>
                    <td style={{ padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-secondary)' }}>{iface.ipv6}</td>
                    <td style={{ padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-secondary)' }}>{iface.speed}</td>
                    <td style={{ padding: '12px' }}><Badge size="sm" variant={iface.status === 'up' ? 'success' : 'default'} dot>{iface.status}</Badge></td>
                    <td style={{ padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-secondary)' }}>{iface.rx}</td>
                    <td style={{ padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-secondary)' }}>{iface.tx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}