import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Preview } from '@/components/Preview';
import { useSampleManager } from '@/hooks/useSampleManager';
import { ThemeProvider } from '@/contexts/ThemeContext';

export function App() {
  const { samples, activeSample, setActiveSample } = useSampleManager();

  return (
    <ThemeProvider>
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar
          samples={samples}
          activeSample={activeSample}
          onSampleSelect={setActiveSample}
        />
        <Preview 
          sample={samples.find(s => s.meta.title === activeSample) || null} 
        />
      </div>
    </ThemeProvider>
  );
}