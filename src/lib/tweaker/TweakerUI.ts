import { getTweakerStyles } from './styles/TweakerStyles';
import type { 
  TweakerControl, 
  ButtonConfig, 
  NumericInputConfig, 
  StringInputConfig,
  RangeInputConfig,
  DropdownConfig,
  VectorInputConfig,
  TweakerLabel 
} from './types';

export class TweakerUI {
  private container: HTMLElement;
  private controls: TweakerControl[] = [];

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'tweaker-ui';
    this.applyStyles();
    this.setupThemeSync();
  }

  private setupThemeSync() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const theme = document.documentElement.getAttribute('data-theme');
          this.container.setAttribute('data-theme', theme || 'dark');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    const theme = document.documentElement.getAttribute('data-theme');
    this.container.setAttribute('data-theme', theme || 'dark');
  }

  private applyStyles() {
    const style = document.createElement('style');
    style.textContent = getTweakerStyles();
    this.container.appendChild(style);
  }

  private resolveLabel(label: TweakerLabel): string {
    return typeof label === 'function' ? label() : label;
  }

  private createLabelElement(labelConfig: TweakerLabel): HTMLLabelElement {
    const label = document.createElement('label');
    label.className = 'tweaker-label';
    label.textContent = this.resolveLabel(labelConfig);
    return label;
  }

  public addButton(config: ButtonConfig) {
    const control = document.createElement('div');
    control.className = 'tweaker-control';

    const button = document.createElement('button');
    button.className = 'tweaker-button';
    button.textContent = this.resolveLabel(config.label);
    
    button.onclick = () => {
      config.trigger();
      updateLabel();
    };

    control.appendChild(button);
    this.container.appendChild(control);

    const updateLabel = () => {
      button.textContent = this.resolveLabel(config.label);
    };

    this.controls.push({ type: 'button', element: control, updateLabel });

    return this;
  }

  public addStringInput(config: StringInputConfig) {
    const control = document.createElement('div');
    control.className = 'tweaker-control';

    const label = this.createLabelElement(config.label);
    
    const input = document.createElement('input');
    input.className = 'tweaker-input';
    input.type = 'text';
    input.value = config.get();
    input.onchange = (e) => {
      config.set((e.target as HTMLInputElement).value);
      updateLabel();
    };

    control.appendChild(label);
    control.appendChild(input);
    this.container.appendChild(control);

    const updateLabel = () => {
      label.textContent = this.resolveLabel(config.label);
    };

    this.controls.push({ type: 'string', element: control, updateLabel });

    return this;
  }

  public addNumericInput(config: NumericInputConfig) {
    const control = document.createElement('div');
    control.className = 'tweaker-control';

    const label = this.createLabelElement(config.label);
    
    const input = document.createElement('input');
    input.className = 'tweaker-input';
    input.type = 'number';
    input.value = config.get().toString();
    input.step = config.step?.toString() || 'any';
    if (config.min !== undefined) input.min = config.min.toString();
    if (config.max !== undefined) input.max = config.max.toString();
    input.onchange = (e) => {
      config.set(parseFloat((e.target as HTMLInputElement).value));
      updateLabel();
    };

    control.appendChild(label);
    control.appendChild(input);
    this.container.appendChild(control);

    const updateLabel = () => {
      label.textContent = this.resolveLabel(config.label);
    };

    this.controls.push({ type: 'numeric', element: control, updateLabel });

    return this;
  }

  public addVectorInput(config: VectorInputConfig) {
    const control = document.createElement('div');
    control.className = 'tweaker-control';

    const label = this.createLabelElement(config.label);
    control.appendChild(label);

    const values = config.get();
    const inputs: HTMLInputElement[] = [];

    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${values.length}, 1fr)`;
    container.style.gap = '4px';

    values.forEach((value, index) => {
      const input = document.createElement('input');
      input.className = 'tweaker-input';
      input.type = 'number';
      input.value = value.toString();
      input.step = config.step?.toString() || 'any';
      if (config.min !== undefined) input.min = config.min.toString();
      if (config.max !== undefined) input.max = config.max.toString();
      
      input.onchange = () => {
        const newValues = [...config.get()];
        newValues[index] = parseFloat(input.value);
        config.set(newValues);
        updateLabel();
      };

      inputs.push(input);
      container.appendChild(input);
    });

    control.appendChild(container);
    this.container.appendChild(control);

    const updateLabel = () => {
      label.textContent = this.resolveLabel(config.label);
      const currentValues = config.get();
      inputs.forEach((input, index) => {
        input.value = currentValues[index].toString();
      });
    };

    this.controls.push({ type: 'vector', element: control, updateLabel });

    return this;
  }

  public addRangeInput(config: RangeInputConfig) {
    const control = document.createElement('div');
    control.className = 'tweaker-control';

    const label = this.createLabelElement(config.label);
    
    const input = document.createElement('input');
    input.className = 'tweaker-range';
    input.type = 'range';
    input.min = config.start.toString();
    input.max = config.end.toString();
    input.step = config.step?.toString() || 'any';
    input.value = config.get().toString();
    
    input.oninput = (e) => {
      const value = parseFloat((e.target as HTMLInputElement).value);
      config.set(value);
      updateLabel();
    };

    control.appendChild(label);
    control.appendChild(input);
    this.container.appendChild(control);

    const updateLabel = () => {
      label.textContent = this.resolveLabel(config.label);
    };

    this.controls.push({ type: 'range', element: control, updateLabel });

    return this;
  }

  public addDropdown(config: DropdownConfig) {
    const control = document.createElement('div');
    control.className = 'tweaker-control';

    const label = this.createLabelElement(config.label);
    
    const select = document.createElement('select');
    select.className = 'tweaker-select';
    
    config.options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      select.appendChild(optionElement);
    });
    
    select.value = config.get();
    select.onchange = (e) => {
      config.set((e.target as HTMLSelectElement).value);
      updateLabel();
    };

    control.appendChild(label);
    control.appendChild(select);
    this.container.appendChild(control);

    const updateLabel = () => {
      label.textContent = this.resolveLabel(config.label);
    };

    this.controls.push({ type: 'dropdown', element: control, updateLabel });

    return this;
  }

  public get dom(): HTMLElement {
    return this.container;
  }
}

export function createTweakerUI(): TweakerUI {
  return new TweakerUI();
}