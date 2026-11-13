import React from 'react';
import { Card, CardHeader, CardContent, Badge, Button } from '../components/ui';

const tcpConnections = [
  { local: '192.168.1.42:54321', remote: '142.250.190.46:443', state: 'ESTABLISHED', srtt: '32ms', rttvar: '4ms', cwnd: 44, ssthresh: 65535, retrans: 0, unacked: 0, pid: 12456, process: 'chrome.exe' },
  { local: '192.168.1.42:54322', remote: '20.189.173.15:443', state: 'ESTABLISHED', srtt: '28ms', rttvar: '3ms', cwnd: 52, ssthresh: 65535, retrans: 0, unacked: 0, pid: 8934, process: 'code.exe' },
  { local: '192.168.1.42:54323', remote: '104.18.32.240:443', state: 'ESTABLISHED', srtt: '45ms', rttvar: '8ms', cwnd: 38, ssthresh: 65535, retrans: 1, unacked: 2, pid: 12456, process: 'chrome.exe' },
  { local: '127.0.0.1:5432', remote: '127.0.0.1:54324', state: 'ESTABLISHED', srtt: '0.2ms', rttvar: '0.1ms', cwnd: 64, ssthresh: 65535, retrans: 0, unacked: 0, pid: 890, process: 'postgres.exe' },
  { local: '192.168.1.42:54324', remote: '151.101.66.133:443', state: 'TIME_WAIT', srtt: '—', rttvar: '—', cwnd: 0, ssthresh: 0, retrans: 0, unacked: 0, pid: 0, process: '—' },
];

export function TcpDiagnostics() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '16px', height: '100%' }}>
      <Card style={{ gridColumn: '1 / -1' }}>
        <CardHeader title="TCP Connection Metrics" subtitle="eBPF-derived kernel telemetry" />
        <CardContent>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ color: 'var(--text-secondary)', background: 'var(--elevated)' }}>
                  <th style={{ textAlign: 'left', padding: '12px', width: 180 }}>Local</th>
                  <th style={{ textAlign: 'left', padding: '12px', width: 180 }}>Remote</th>
                  <th style={{ textAlign: 'left', padding: '12px', width: 100 }}>State</th>
                  <th style={{ textAlign: 'right', padding: '12px', width: 80 }}>SRTT</th>
                  <th style={{ textAlign: 'right', padding: '12px', width: 80 }}>RTTVAR</th>
                  <th style={{ textAlign: 'right', padding: '12px', width: 80 }}>CWND</th>
                  <th style={{ textAlign: 'right', padding: '12px', width: 80 }}>SSTHRESH</th>
                  <th style={{ textAlign: 'right', padding: '12px', width: 80 }}>Retrans</th>
                  <th style={{ textAlign: 'right', padding: '12px', width: 80 }}>Unacked</th>
                  <th style={{ textAlign: 'left', padding: '12px', width: 100 }}>PID</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Process</th>
                </tr>
              </thead>
              <tbody>
                {tcpConnections.map((conn, i) => (
                  <tr key={i} style={{ borderBottom: i < tcpConnections.length - 1 ? '1px solid var(--elevated)' : 'none' }}>
                    <td style={{ padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{conn.local}</td>
                    <td style={{ padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{conn.remote}</td>
                    <td style={{ padding: '12px' }}><Badge size="sm" variant={conn.state === 'ESTABLISHED' ? 'success' : 'default'}>{conn.state}</Badge></td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{conn.srtt}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{conn.rttvar}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'JetBrains Mono', fontSize: '12px', fontWeight: 600 }}>{conn.cwnd}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-secondary)' }}>{conn.ssthresh}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'JetBrains Mono', fontSize: '12px', color: conn.retrans > 0 ? 'var(--critical)' : 'var(--text-secondary)' }}>{conn.retrans}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'JetBrains Mono', fontSize: '12px', color: conn.unacked > 0 ? 'var(--warning)' : 'var(--text-secondary)' }}>{conn.unacked}</td>
                    <td style={{ padding: '12px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-secondary)' }}>{conn.pid || '—'}</td>
                    <td style={{ padding: '12px', fontWeight: 500 }}>{conn.process}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Retransmission Analysis" subtitle="Potential issues detected" />
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 500 }}>chrome.exe (PID 12456)</span>
                <Badge size="sm" variant="warning">1 retransmit</Badge>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Connection to 104.18.32.240:443 — SRTT 45ms, RTTVAR 8ms</div>
            </div>
            <div style={{ padding: '12px', background: 'var(--elevated)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 500 }}>All other connections</span>
                <Badge size="sm" variant="success">Healthy</Badge>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>No retransmissions, stable RTT variance</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Congestion Control" subtitle="Algorithm: CUBIC (default)" />
        <CardContent>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Active Connections</div>
              <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--primary-blue)' }}>{tcpConnections.filter(c => c.state === 'ESTABLISHED').length}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Total CWND</div>
              <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--success)' }}>{tcpConnections.reduce((a, b) => a + b.cwnd, 0)} MSS</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Avg RTT</div>
              <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--highlight-blue)' }}>
                {Math.round(tcpConnections.filter(c => c.srtt !== '—').reduce((a, b) => a + parseFloat(b.srtt.replace('ms', '')), 0) / tcpConnections.filter(c => c.srtt !== '—').length)}ms
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Retransmission Rate</div>
              <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--warning)' }}>
                {(tcpConnections.reduce((a, b) => a + b.retrans, 0) / tcpConnections.length * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Socket States" subtitle="Distribution" />
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { state: 'ESTABLISHED', count: 4, color: 'var(--success)' },
              { state: 'TIME_WAIT', count: 1, color: 'var(--text-secondary)' },
              { state: 'LISTEN', count: 12, color: 'var(--primary-blue)' },
              { state: 'SYN_SENT', count: 0, color: 'var(--warning)' },
              { state: 'SYN_RECV', count: 0, color: 'var(--warning)' },
              { state: 'FIN_WAIT1', count: 0, color: 'var(--text-secondary)' },
              { state: 'FIN_WAIT2', count: 0, color: 'var(--text-secondary)' },
              { state: 'CLOSE_WAIT', count: 0, color: 'var(--critical)' },
              { state: 'CLOSING', count: 0, color: 'var(--critical)' },
              { state: 'LAST_ACK', count: 0, color: 'var(--critical)' },
            ].map((item) => (
              <div key={item.state} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: item.state !== 'LAST_ACK' ? '1px solid var(--elevated)' : 'none' }}>
                <Badge size="sm" variant={item.color === 'var(--success)' ? 'success' : item.color === 'var(--primary-blue)' ? 'info' : item.color === 'var(--warning)' ? 'warning' : item.color === 'var(--critical)' ? 'critical' : 'default'} dot>{item.state}</Badge>
                <div style={{ flex: 1, height: 6, background: 'var(--elevated)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${item.count > 0 ? Math.max(10, (item.count / 12) * 100) : 0}%`, height: '100%', background: item.color, borderRadius: 3 }} />
                </div>
                <span className="mono" style={{ width: 40, textAlign: 'right', fontWeight: 600 }}>{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}