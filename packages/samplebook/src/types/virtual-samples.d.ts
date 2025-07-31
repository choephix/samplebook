declare module 'virtual:samplebook-samples' {
  export interface Sample {
    name: string;
    func: string;
    file: string;
  }
  export const samples: Sample[];
  export const sampleFunctions: {
    [key: string]: () => unknown;
  };
  
  export type ProcessorFunction = (sampleFunction: () => unknown) => HTMLElement;
  export const processorFunction: ProcessorFunction | undefined;

  export const errorMessage: string | undefined;
} 