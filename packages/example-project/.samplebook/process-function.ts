/**
 * Processor function for Samplebook samples
 * 
 * This function receives a sample function and processes its result.
 * If the result is an HTMLElement, it wraps it in a blue border.
 * Otherwise, it converts the result to a string and wraps it in a pink border.
 */

const createLabel = (color: string, text: string): HTMLDivElement => {
  const label = document.createElement('div');
  label.textContent = text;
  label.style.position = 'absolute';
  label.style.left = '8px';
  label.style.bottom = 'calc(100% - 0.5em)'; // move label down by half an em from top border
  label.style.backgroundColor = color;
  label.style.color = 'white';
  label.style.padding = '2px 8px';
  label.style.fontSize = '12px';
  label.style.borderRadius = '4px';
  label.style.fontWeight = 'bold';
  label.style.boxSizing = 'border-box';
  label.style.textAlign = 'left';
  label.style.whiteSpace = 'nowrap';
  label.style.maxWidth = 'none';
  return label;
};

const createCard = (color: string, labelText: string, content: HTMLElement): HTMLDivElement => {
  const card = document.createElement('div');
  card.style.border = `4px solid ${color}`;
  card.style.borderRadius = '8px';
  card.style.padding = '16px';
  card.style.position = 'relative';

  // Append "60" to the original color for semi-transparent background
  card.style.backgroundColor = `${color}20`;
  
  // card.style.position = 'absolute';
  // card.style.top = '0';
  // card.style.left = '0';
  // card.style.right = '0';
  // card.style.bottom = '0';
  // card.style.margin = '20px';
  
  card.appendChild(createLabel(color, labelText));
  card.appendChild(content);
  
  return card;
};

export default function processFunction(func: () => unknown): HTMLElement {
  const container = document.createElement('div');
  container.id = 'sample-function-container';
  container.style.position = 'relative';
  //// center the innards of the container vertically and horizontally
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.height = '100%';
  container.style.width = '100%';
  container.style.boxSizing = 'border-box';
  container.style.padding = '20px';
  container.style.gap = '16px';
  
  try {
    const result = func();
    
    if (result instanceof HTMLElement) {
      // Valid HTMLElement - wrap in greenish border
      const card = createCard('#22c55e', '✓ Processed HTMLElement', result);
      container.appendChild(card);
    } else {
      let stringified: string | undefined;
      try {
        stringified = JSON.stringify(result);
      } catch {}

      if (stringified !== undefined) {
        // JSON stringified - wrap in blue border
        const content = document.createElement('pre');
        content.textContent = JSON.stringify(result, null, 2);
        content.style.margin = '0';
        content.style.whiteSpace = 'pre-wrap';
        content.style.fontFamily = 'monospace';
        content.style.fontSize = '14px';
        
        const card = createCard('#3b82f6', 'ℹ JSON.stringified result', content);
        container.appendChild(card);
      } else {
        // Fallback to String() - wrap in pink border
        const content = document.createElement('div');
        content.textContent = String(result);
        content.style.fontFamily = 'monospace';
        content.style.fontSize = '14px';
        
        const card = createCard('#ec4899', '⚠ Processed Non-HTMLElement', content);
        container.appendChild(card);
      }
    }
  } catch (error) {
    // Error occurred - wrap in red border
    const errorContent = document.createElement('div');
    errorContent.textContent = error instanceof Error ? error.message : 'Unknown error';
    errorContent.style.color = '#dc2626';
    errorContent.style.fontFamily = 'monospace';
    
    const card = createCard('#ef4444', '✘ Error in Sample Function', errorContent);
    container.appendChild(card);
  }
  
  return container;
}
