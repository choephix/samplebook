import React from 'react';
import type { Sample } from '../types/sample';
import { groupSamplesByCategory } from '../utils/sampleUtils';
import { SidebarStyles } from './styles/SidebarStyles';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  samples: Sample[];
  activeSample: string | null;
  onSampleSelect: (sampleId: string) => void;
}

export function Sidebar({ samples, activeSample, onSampleSelect }: SidebarProps) {
  const groupedSamples = groupSamplesByCategory(samples);

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {Object.entries(groupedSamples).map(([group, groupSamples]) => (
          <div key={group} className="sidebar-group">
            <h3>{group}</h3>
            <ul>
              {groupSamples.map((sample) => (
                <li
                  key={sample.meta.title}
                  className={activeSample === sample.meta.title ? 'active' : ''}
                  onClick={() => onSampleSelect(sample.meta.title)}
                >
                  {sample.meta.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <ThemeToggle />
      </div>
      <SidebarStyles />
    </div>
  );
}