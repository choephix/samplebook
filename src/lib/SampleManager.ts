import type { Sample } from "@/types/sample";

export class SampleManager {
  private samples: Sample[] = [];
  private activeSample: string | null = null;
  private onUpdate: () => void;

  constructor(onUpdate: () => void) {
    this.onUpdate = onUpdate;
    this.loadSamples();
    this.setupHotReload();
  }

  public getSamples(): Sample[] {
    return this.samples;
  }

  public getActiveSample(): string | null {
    return this.activeSample;
  }

  public setActiveSample(sampleId: string): void {
    this.activeSample = sampleId;
    this.onUpdate();
  }

  private async loadSamples() {
    const modules = import.meta.glob('/src/samples/**/*.sample.ts');
    
    this.samples = [];
    for (const path in modules) {
      const module = await modules[path]();
      Object.entries(module as any).forEach(([exportName, fn]) => {
        if (typeof fn === 'function') {
          this.samples.push({
            meta: {
              title: exportName,
              group: path.split('/').slice(-2)[0]
            },
            fn: fn as () => HTMLElement | string
          });
        }
      });
    }

    this.onUpdate();
  }

  private setupHotReload() {
    if (import.meta.hot) {
      import.meta.hot.accept((newModule) => {
        this.loadSamples();
      });
    }
  }
}