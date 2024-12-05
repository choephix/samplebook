export type TweakerLabel = string | (() => string);

export interface ButtonConfig {
  label: TweakerLabel;
  trigger: () => void;
}

export interface StringInputConfig {
  label: TweakerLabel;
  get: () => string;
  set: (value: string) => void;
}

export interface NumericInputConfig {
  label: TweakerLabel;
  get: () => number;
  set: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export interface VectorInputConfig {
  label: TweakerLabel;
  get: () => number[];
  set: (values: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

export interface RangeInputConfig {
  label: TweakerLabel;
  get: () => number;
  set: (value: number) => void;
  start: number;
  end: number;
  step?: number;
}

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownConfig {
  label: TweakerLabel;
  get: () => string;
  set: (value: string) => void;
  options: DropdownOption[];
}

export interface TweakerControl {
  type: 'button' | 'string' | 'numeric' | 'range' | 'dropdown' | 'vector';
  element: HTMLElement;
  updateLabel: () => void;
}