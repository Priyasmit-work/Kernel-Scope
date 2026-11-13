import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Badge, Button, IconButton } from '../components/ui';

interface SettingsState {
  advancedMode: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  theme: 'dark' | 'light' | 'system';
  notifications: boolean;
  soundAlerts: boolean;
  dataRetention: number;
  agentEndpoint: string;
  ebpfEnabled: boolean;
}

const defaultSettings: SettingsState = {
  advancedMode: true,
  autoRefresh: true,
  refreshInterval: 2000,
  theme: 'dark',
  notifications: true,
  soundAlerts: false,
  dataRetention: 7,
  agentEndpoint: 'ws://localhost:8080',
  ebpfEnabled: false,
};

export function Settings() {
  const [settings, setSettings] = useState<SettingsState>(() => {
    const saved = localStorage.getItem('kernelscope-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('kernelscope-settings', JSON.stringify(settings));
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings]);

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Settings</h1>

      <Card>
        <CardHeader title="General" subtitle="Application behavior" />
        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SettingRow
            label="Advanced Mode"
            description="Show detailed metrics, kernel diagnostics, and advanced controls"
            value={settings.advancedMode}
            onChange={(v) => updateSetting('advancedMode', v)}
            type="toggle"
          />
          <SettingRow
            label="Auto Refresh"
            description="Automatically poll for new telemetry data"
            value={settings.autoRefresh}
            onChange={(v) => updateSetting('autoRefresh', v)}
            type="toggle"
          />
          {settings.autoRefresh && (
            <SettingRow
              label="Refresh Interval"
              description="How often to fetch new data (milliseconds)"
              value={settings.refreshInterval}
              onChange={(v) => updateSetting('refreshInterval', v)}
              type="select"
              options={[
                { value: 500, label: '500 ms (Fast)' },
                { value: 1000, label: '1 second' },
                { value: 2000, label: '2 seconds (Default)' },
                { value: 5000, label: '5 seconds' },
                { value: 10000, label: '10 seconds' },
              ]}
            />
          )}
          <SettingRow
            label="Theme"
            description="Color scheme preference"
            value={settings.theme}
            onChange={(v) => updateSetting('theme', v as any)}
            type="select"
            options={[
              { value: 'dark', label: 'Dark (Default)' },
              { value: 'light', label: 'Light' },
              { value: 'system', label: 'System Preference' },
            ]}
          />
          <SettingRow
            label="Data Retention"
            description="Days to keep historical telemetry in local storage"
            value={settings.dataRetention}
            onChange={(v) => updateSetting('dataRetention', v)}
            type="select"
            options={[
              { value: 1, label: '1 day' },
              { value: 3, label: '3 days' },
              { value: 7, label: '7 days (Default)' },
              { value: 30, label: '30 days' },
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Notifications" subtitle="Alert preferences" />
        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SettingRow
            label="Enable Notifications"
            description="Show toast notifications for critical events"
            value={settings.notifications}
            onChange={(v) => updateSetting('notifications', v)}
            type="toggle"
          />
          <SettingRow
            label="Sound Alerts"
            description="Play sound for critical alerts (requires notifications)"
            value={settings.soundAlerts}
            onChange={(v) => updateSetting('soundAlerts', v)}
            type="toggle"
            disabled={!settings.notifications}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Agent & eBPF" subtitle="Backend connection and kernel telemetry" />
        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SettingRow
            label="Agent Endpoint"
            description="WebSocket endpoint for the KernelScope agent"
            value={settings.agentEndpoint}
            onChange={(v) => updateSetting('agentEndpoint', v)}
            type="text"
            placeholder="ws://localhost:8080"
          />
          <SettingRow
            label="eBPF Kernel Telemetry"
            description="Enable eBPF-based kernel diagnostics (requires Linux/WSL2, root privileges)"
            value={settings.ebpfEnabled}
            onChange={(v) => updateSetting('ebpfEnabled', v)}
            type="toggle"
          />
          {settings.ebpfEnabled && (
            <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 8 }}>
              <div style={{ fontWeight: 500, marginBottom: '4px' }}>eBPF Status</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Running in WSL2 Ubuntu — 3 programs loaded (tcpconnect, tcpretransmit, oomkill)</div>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                <Button variant="ghost" size="sm">View Programs</Button>
                <Button variant="ghost" size="sm">Reload</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="About" subtitle="Version and build information" />
        <CardContent>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Version</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 600 }}>0.1.0-dev</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Build</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 600 }}>2026-11-14</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Frontend</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 600 }}>React 18 + TypeScript + Vite</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Desktop Shell</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 600 }}>Tauri (planned)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
        <Button variant="secondary" onClick={() => setSettings(defaultSettings)}>Reset to Defaults</Button>
        <Button variant="primary" onClick={() => { localStorage.setItem('kernelscope-settings', JSON.stringify(settings)); }}>Save Settings</Button>
      </div>
    </div>
  );
}

interface SettingRowProps {
  label: string;
  description: string;
  value: any;
  onChange: (value: any) => void;
  type: 'toggle' | 'select' | 'text';
  options?: { value: any; label: string }[];
  disabled?: boolean;
  placeholder?: string;
}

function SettingRow({ label, description, value, onChange, type, options, disabled, placeholder }: SettingRowProps) {
  const commonInputStyle = {
    padding: '8px 12px',
    fontSize: '13px',
    fontFamily: 'inherit',
    background: 'var(--card)',
    border: '1px solid var(--elevated)',
    borderRadius: 6,
    color: 'var(--text-primary)',
    minWidth: 200,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '12px 0', borderBottom: '1px solid var(--elevated)' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '14px', fontWeight: 500, color: disabled ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{label}</div>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{description}</div>
      </div>
      <div style={{ flexShrink: 0 }}>
        {type === 'toggle' && (
          <button
            onClick={() => onChange(!value)}
            disabled={disabled}
            style={{
              width: 48,
              height: 28,
              borderRadius: 14,
              background: value ? 'var(--primary-blue)' : 'var(--elevated)',
              border: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              position: 'relative',
              transition: 'background 0.15s',
            }}
            aria-checked={value}
            role="switch"
          >
            <span
              style={{
                position: 'absolute',
                top: 2,
                left: value ? 24 : 2,
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                transition: 'left 0.15s',
              }}
            />
          </button>
        )}
        {type === 'select' && (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            style={commonInputStyle}
          >
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}
        {type === 'text' && (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            style={commonInputStyle}
          />
        )}
      </div>
    </div>
  );
}