import type { SampleFunction } from '../src/types/sample';

export const BasicButton: SampleFunction = () => {
  const button = document.createElement('button');
  button.textContent = 'Click me';
  button.style.padding = '0.5rem 1rem';
  button.style.borderRadius = '4px';
  button.style.border = '1px solid #ddd';
  button.style.background = '#f5f5f5';
  button.style.cursor = 'pointer';
  
  button.addEventListener('click', () => {
    alert('Button clicked!');
  });

  return button;
};

export const PrimaryButton: SampleFunction = () => {
  const button = document.createElement('button');
  button.textContent = 'Primary Button';
  button.style.padding = '0.5rem 1rem';
  button.style.borderRadius = '4px';
  button.style.border = 'none';
  button.style.background = '#0066cc';
  button.style.color = 'white';
  button.style.cursor = 'pointer';
  
  button.addEventListener('click', () => {
    alert('Primary button clicked!');
  });

  return button;
};