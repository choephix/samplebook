import type { Sample } from '../types/sample';

export function groupSamplesByCategory(samples: Sample[]): Record<string, Sample[]> {
  return samples.reduce((acc, sample) => {
    const group = sample.meta.group || 'Ungrouped';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(sample);
    return acc;
  }, {} as Record<string, Sample[]>);
}

export function findSampleByTitle(samples: Sample[], title: string | null): Sample | null {
  if (!title) return null;
  return samples.find(s => s.meta.title === title) || null;
}