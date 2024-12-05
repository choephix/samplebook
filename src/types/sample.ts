export type SampleFunction = () => HTMLElement | HTMLElement[] | string | string[];

export interface SampleMeta {
  title: string;
  group?: string;
}

export interface Sample {
  meta: SampleMeta;
  fn: SampleFunction;
}