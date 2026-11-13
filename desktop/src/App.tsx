import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout';
import { Overview } from './pages/Overview';
import { Processes } from './pages/Processes';
import { Cpu } from './pages/Cpu';
import { Memory } from './pages/Memory';
import { Network } from './pages/Network';
import { TcpDiagnostics } from './pages/TcpDiagnostics';
import { Events } from './pages/Events';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/processes" element={<Processes />} />
          <Route path="/cpu" element={<Cpu />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/network" element={<Network />} />
          <Route path="/tcp" element={<TcpDiagnostics />} />
          <Route path="/events" element={<Events />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}