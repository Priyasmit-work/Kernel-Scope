import React from 'react';
import { Card, CardHeader, CardContent, Badge } from '../components/ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const cpuHistory = Array.from({ length: 60 }, (_, i) => ({ time: `${i}s`, value: Math.floor(Math.random() * 40) + 20 }));
const perCoreData = Array.from({ length: 8 }, (_, i) => ({ core: i, usage: Math.floor(Math.random() * 60) + 10 }));

export function Cpu() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px', height: '100%' }}>
      <Card style={{ gridColumn: '1 / -1' }}>
        <CardHeader title="CPU Utilization" subtitle="System-wide history (last 60s)" />
        <CardContent style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cpuHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--elevated)" />
              <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={11} tick={{ fill: 'var(--text-secondary)' }} />
              <YAxis domain={[0, 100]} stroke="var(--text-secondary)" fontSize={11} tick={{ fill: 'var(--text-secondary)' }} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--elevated)', borderRadius: 8 }} />
              <Line type="monotone" dataKey="value" stroke="var(--primary-blue)" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Per-Core Usage" subtitle="8 logical cores" />
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {perCoreData.map((core) => (
              <div key={core.core} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: 50, fontSize: '12px', color: 'var(--text-secondary)' }}>Core {core.core}</span>
                <div style={{ flex: 1, height: 10, background: 'var(--elevated)', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{ width: `${core.usage}%`, height: '100%', background: core.usage > 80 ? 'var(--critical)' : core.usage > 50 ? 'var(--warning)' : 'var(--primary-blue)', borderRadius: 5, transition: 'width 0.3s' }} />
                </div>
                <span className="mono" style={{ width: 45, textAlign: 'right', fontWeight: 600, color: core.usage > 80 ? 'var(--critical)' : 'var(--text-primary)' }}>{core.usage}%</span>
              </div>
            ))}
          </div>
        </CardContent      </Card>

      <Card>
        <CardHeader title="System Load" subtitle="1m / 5m / 15m averages" />
        <CardContent>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { label: '1 min', value: '2.34', max: 8 },
              { label: '5 min', value: '1.87', max: 8 },
              { label: '15 min', value: '1.42', max: 8 },
            ].map((item) => (
              <div key={item.label} style={{ textAlign: 'center', padding: '16px', background: 'var(--elevated)', borderRadius: 8 }}>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{item.label}</div>
                <div style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--primary-blue)' }}>{item.value}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>{(parseFloat(item.value) / item.max * 100).toFixed(0)}% of {item.max} cores</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Frequency" subtitle="Current clock speeds" />
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {perCoreData.map((core) => (
              <div key={core.core} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: core.core < 7 ? '1px solid var(--elevated)' : 'none' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Core {core.core}</span>
                <span className="mono" style={{ fontSize: '13px', fontWeight: 600 }}>{(Math.random() * 1.5 + 2.8).toFixed(1)} GHz</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Processes" subtitle="Top CPU consumers" />
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'chrome.exe', cpu: '18.2%', pid: 12456 },
              { name: 'code.exe', cpu: '12.7%', pid: 8934 },
              { name: 'node.exe', cpu: '8.4%', pid: 3210 },
              { name: 'python.exe', cpu: '4.2%', pid: 567 },
              { name: 'docker.exe', cpu: '3.1%', pid: 1842 },
            ].map((proc, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 4 ? '1px solid var(--elevated)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="mono" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{proc.pid}</span>
                  <span style={{ fontWeight: 500 }}>{proc.name}</span>
                </div>
                <span className="mono" style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>{proc.cpu}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}