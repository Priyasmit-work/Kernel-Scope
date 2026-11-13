export interface Process {
  pid: number;
  name: string;
  user: string;
  cpu: number;
  memory: number;
  status: 'running' | 'sleeping' | 'stopped' | 'zombie';
  ppid?: number;
  threads?: number;
  priority?: number;
  nice?: number;
  startTime?: string;
  command?: string;
}

export interface CpuMetrics {
  total: number;
  perCore: number[];
  loadAvg: [number, number, number];
  frequency: number[];
  temperature?: number[];
}

export interface MemoryMetrics {
  total: number;
  used: number;
  available: number;
  cached: number;
  buffers: number;
  swapTotal: number;
  swapUsed: number;
  swapFree: number;
}

export interface NetworkInterface {
  name: string;
  ipv4: string;
  ipv6: string;
  mac: string;
  speed: number;
  status: 'up' | 'down' | 'unknown';
  rxBytes: number;
  txBytes: number;
  rxPackets: number;
  txPackets: number;
  rxErrors: number;
  txErrors: number;
  rxDropped: number;
  txDropped: number;
}

export interface NetworkConnection {
  protocol: 'tcp' | 'udp';
  localAddress: string;
  localPort: number;
  remoteAddress: string;
  remotePort: number;
  state: string;
  pid: number;
  processName: string;
}

export interface TcpConnectionDetail {
  localAddress: string;
  localPort: number;
  remoteAddress: string;
  remotePort: number;
  state: string;
  srtt: number;
  rttvar: number;
  cwnd: number;
  ssthresh: number;
  retransmits: number;
  unacked: number;
  pid: number;
  processName: string;
}

export interface DiskMetrics {
  device: string;
  mountPoint: string;
  total: number;
  used: number;
  free: number;
  readBytes: number;
  writeBytes: number;
  readOps: number;
  writeOps: number;
  readLatency: number;
  writeLatency: number;
}

export interface Event {
  id: number;
  timestamp: string;
  level: 'critical' | 'warning' | 'info';
  source: string;
  message: string;
  pid?: number;
  metadata?: Record<string, any>;
}

export interface SystemInfo {
  hostname: string;
  os: string;
  kernel: string;
  uptime: number;
  cpuModel: string;
  cpuCores: number;
  totalMemory: number;
  bootTime: string;
}

export interface Settings {
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