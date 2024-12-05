import type { SampleFunction } from '../types/sample';

export const CustomCheckbox: SampleFunction = () => {
  const container = document.createElement('label');
  container.style.display = 'inline-flex';
  container.style.alignItems = 'center';
  container.style.cursor = 'pointer';
  container.style.userSelect = 'none';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.style.position = 'absolute';
  input.style.opacity = '0';
  input.style.cursor = 'pointer';

  const checkmark = document.createElement('div');
  checkmark.style.width = '24px';
  checkmark.style.height = '24px';
  checkmark.style.borderRadius = '4px';
  checkmark.style.border = '2px solid var(--text-secondary)';
  checkmark.style.marginRight = '8px';
  checkmark.style.transition = 'all 0.2s';
  checkmark.style.position = 'relative';

  const check = document.createElement('div');
  check.style.position = 'absolute';
  check.style.top = '50%';
  check.style.left = '50%';
  check.style.transform = 'translate(-50%, -50%) scale(0)';
  check.style.width = '12px';
  check.style.height = '12px';
  check.style.borderRadius = '2px';
  check.style.backgroundColor = 'var(--text-active)';
  check.style.transition = 'transform 0.2s';

  const text = document.createElement('span');
  text.textContent = 'Custom Checkbox';
  text.style.color = 'var(--text-primary)';

  input.addEventListener('change', () => {
    if (input.checked) {
      checkmark.style.borderColor = 'var(--text-active)';
      check.style.transform = 'translate(-50%, -50%) scale(1)';
    } else {
      checkmark.style.borderColor = 'var(--text-secondary)';
      check.style.transform = 'translate(-50%, -50%) scale(0)';
    }
  });

  checkmark.appendChild(check);
  container.appendChild(input);
  container.appendChild(checkmark);
  container.appendChild(text);

  return container;
};

export const SearchInput: SampleFunction = () => {
  const container = document.createElement('div');
  container.style.position = 'relative';
  container.style.width = '300px';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Search...';
  input.style.width = '100%';
  input.style.padding = '8px 12px';
  input.style.paddingLeft = '36px';
  input.style.borderRadius = '6px';
  input.style.border = '2px solid var(--border-color)';
  input.style.background = 'var(--bg-primary)';
  input.style.color = 'var(--text-primary)';
  input.style.outline = 'none';
  input.style.transition = 'border-color 0.2s';

  const icon = document.createElement('div');
  icon.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `;
  icon.style.position = 'absolute';
  icon.style.left = '12px';
  icon.style.top = '50%';
  icon.style.transform = 'translateY(-50%)';
  icon.style.color = 'var(--text-secondary)';

  input.addEventListener('focus', () => {
    input.style.borderColor = 'var(--text-active)';
  });

  input.addEventListener('blur', () => {
    input.style.borderColor = 'var(--border-color)';
  });

  container.appendChild(icon);
  container.appendChild(input);

  return container;
};