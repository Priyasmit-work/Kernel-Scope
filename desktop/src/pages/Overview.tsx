import React from 'react';
import { Card, CardHeader, CardContent, Badge } from '../components/ui';
import { Link } from 'react-router-dom';

export function Overview() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
      <Card>
        <CardHeader title="CPU" subtitle="System-wide utilization" />
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '36px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--primary-blue)' }}>42%</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total utilization</div>
            </div>
            <div style={{ width: 120, height: 120 }}>
              <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="54" fill="none" stroke="var(--elevated)" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="var(--primary-blue)"
                  strokeWidth="8"
                  strokeDasharray="339"
                  strokeDashoffset="197"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--elevated)', paddingTop: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Top Processes by CPU</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'chrome.exe', pid: 12456, cpu: '18.2%' },
                { name: 'code.exe', pid: 8934, cpu: '12.7%' },
                { name: 'node.exe', pid: 3210, cpu: '8.4%' },
              ].map((proc, i) => (
                <Link key={i} to={`/processes?pid=${proc.pid}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--elevated)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Badge size="sm" variant="default" className="mono">{proc.pid}</Badge>
                      <span style={{ fontSize: '13px', fontWeight: 500 }}>{proc.name}</span>
                    </div>
                    <span className="mono" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-blue)' }}>{proc.cpu}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Memory" subtitle="RAM usage" />
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '36px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--highlight-blue)' }}>12.4 / 32 GB</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>38% used</div>
            </div>
            <div style={{ width: 120, height: 120 }}>
              <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="54" fill="none" stroke="var(--elevated)" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="var(--highlight-blue)"
                  strokeWidth="8"
                  strokeDasharray="339"
                  strokeDashoffset="210"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div style={{ height: 8, background: 'var(--elevated)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: '38%', height: '100%', background: 'var(--highlight-blue)', borderRadius: 4 }} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Network" subtitle="Throughput" />
        <CardContent>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Download</div>
              <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--success)' }}>45.2 MB/s</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Upload</div>
              <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--warning)' }}>12.8 MB/s</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Disk I/O" subtitle="Read/Write activity" />
        <CardContent>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Read</div>
              <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--cyan)' }}>245 MB/s</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Write</div>
              <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--critical)' }}>89 MB/s</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}