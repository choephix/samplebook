import type { SampleFunction } from '../types/sample';

export const SimpleList: SampleFunction = () => {
  const list = document.createElement('ul');
  list.style.listStyle = 'none';
  list.style.padding = '0';
  
  const items = ['Item 1', 'Item 2', 'Item 3'];
  
  items.forEach(text => {
    const item = document.createElement('li');
    item.textContent = text;
    item.style.padding = '0.5rem';
    item.style.borderBottom = '1px solid #ddd';
    list.appendChild(item);
  });

  return list;
};