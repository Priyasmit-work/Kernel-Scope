import React from 'react';
import { Card, CardHeader, CardContent, Badge } from '../components/ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const memHistory = Array.from({ length: 60 }, (_, i) => ({ time: `${i}s`, used: Math.floor(Math.random() * 8) + 10, cached: Math.floor(Math.random() * 4) + 2 }));

export function Memory() {
  const totalGB = 32;
  const usedGB = 12.4;
  const availableGB = totalGB - usedGB;
  const cachedGB = 3.2;
  const percent = (usedGB / totalGB) * 100;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px', height: '100%' }}>
      <Card style={{ gridColumn: '1 / -1' }}>
        <CardHeader title="Memory Usage" subtitle="Physical RAM utilization" />
        <CardContent>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: '24px' }}>
            <div style={{ width: 140, height: 140, position: 'relative' }}>
              <svg viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="70" cy="70" r="62" fill="none" stroke="var(--elevated)" strokeWidth="12" />
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  fill="none"
                  stroke="var(--highlight-blue)"
                  strokeWidth="12"
                  strokeDasharray="389"
                  strokeDashoffset={389 * (1 - percent / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{percent.toFixed(1)}%</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{usedGB.toFixed(1)} / {totalGB} GB</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: 16, background: 'var(--elevated)', borderRadius: 8, overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ width: `${(usedGB / totalGB) * 100}%`, height: '100%', background: 'var(--highlight-blue)', borderRadius: 8 }} />
                <div style={{ width: `${(cachedGB / totalGB) * 100}%`, height: '100%', background: 'var(--cyan)', borderRadius: 8, marginLeft: `${(usedGB / totalGB) * 100}%` }} />
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: 10, height: 10, background: 'var(--highlight-blue)', borderRadius: 2 }} /></span>Used: {usedGB.toFixed(1)} GB
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: 10, height: 10, background: 'var(--cyan)', borderRadius: 2 }} /></span>Cached: {cachedGB.toFixed(1)} GB
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: 10, height: 10, background: 'var(--success)', borderRadius: 2 }} /></span>Available: {availableGB.toFixed(1)} GB
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Committed</div>
              <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--text-primary)' }}>{(usedGB + cachedGB).toFixed(1)} GB</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>Swap: 0 / 8 GB</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="History" subtitle="Last 60 seconds" />
        <CardContent style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={memHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--elevated)" />
              <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={11} tick={{ fill: 'var(--text-secondary)' }} />
              <YAxis domain={[0, totalGB]} stroke="var(--text-secondary)" fontSize={11} tick={{ fill: 'var(--text-secondary)' }} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--elevated)', borderRadius: 8 }} />
              <Area type="monotone" dataKey="used" stroke="var(--highlight-blue)" fill="var(--highlight-blue)" fillOpacity={0.2} />
              <Area type="monotone" dataKey="cached" stroke="var(--cyan)" fill="var(--cyan)" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Processes" subtitle="Top memory consumers" />
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'chrome.exe', mem: '1,245 MB', pid: 12456 },
              { name: 'code.exe', mem: '892 MB', pid: 8934 },
              { name: 'docker.exe', mem: '1,102 MB', pid: 1842 },
              { name: 'postgres.exe', mem: '678 MB', pid: 890 },
              { name: 'node.exe', mem: '456 MB', pid: 3210 },
            ].map((proc, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 4 ? '1px solid var(--elevated)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="mono" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{proc.pid}</span>
                  <span style={{ fontWeight: 500 }}>{proc.name}</span>
                </div>
                <span className="mono" style={{ fontWeight: 600, color: 'var(--highlight-blue)' }}>{proc.mem}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Breakdown" subtitle="Memory categories" />
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Application', value: '8.2 GB', color: 'var(--highlight-blue)', percent: 25 },
              { label: 'Cached', value: '3.2 GB', color: 'var(--cyan)', percent: 10 },
              { label: 'Compressed', value: '1.1 GB', color: 'var(--warning)', percent: 3 },
              { label: 'System', value: '1.5 GB', color: 'var(--critical)', percent: 5 },
              { label: 'Available', value: '19.6 GB', color: 'var(--success)', percent: 57 },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px' }}>{item.label}</span>
                  <span className="mono" style={{ fontSize: '13px', fontWeight: 600, color: item.color }}>{item.value}</span>
                </div>
                <div style={{ height: 6, background: 'var(--elevated)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${item.percent}%`, height: '100%', background: item.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}