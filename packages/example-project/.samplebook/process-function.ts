/**
 * Processor function for Samplebook samples
 * 
 * This function receives a sample function and processes its result.
 * If the result is an HTMLElement, it wraps it in a blue border.
 * Otherwise, it converts the result to a string and wraps it in a pink border.
 */

export default function processFunction(func: () => unknown): HTMLElement {
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
  const container = document.createElement('div');
  
  try {
    const result = func();
    
    if (result instanceof HTMLElement) {
      // Valid HTMLElement - wrap in greenish border
      container.style.border = '4px solid #22c55e';
      container.style.borderRadius = '8px';
      container.style.padding = '16px';
      container.style.backgroundColor = '#f0fdf4';
      container.style.position = 'relative';

      container.appendChild(createLabel('#22c55e', '✓ Processed HTMLElement'));
      container.appendChild(result);
    } else {
      let stringified: string | undefined;
      try {
        stringified = JSON.stringify(result);
      } catch {}

      if (stringified !== undefined) {
        // JSON stringified - wrap in blue border
        container.style.border = '4px solid #3b82f6';
        container.style.borderRadius = '8px';
        container.style.padding = '16px';
        container.style.backgroundColor = '#eff6ff';
        container.style.position = 'relative';
        container.style.fontFamily = 'monospace';
        container.style.fontSize = '14px';

        container.appendChild(createLabel('#3b82f6', 'ℹ JSON.stringified result'));
        const content = document.createElement('pre');
        content.textContent = JSON.stringify(result, null, 2);
        content.style.margin = '0';
        content.style.whiteSpace = 'pre-wrap';
        container.appendChild(content);
      } else {
        // Fallback to String() - wrap in pink border
        container.style.border = '4px solid #ec4899';
        container.style.borderRadius = '8px';
        container.style.padding = '16px';
        container.style.backgroundColor = '#fdf2f8';
        container.style.position = 'relative';
        container.style.fontFamily = 'monospace';
        container.style.fontSize = '14px';

        container.appendChild(createLabel('#ec4899', '⚠ Processed Non-HTMLElement'));
        const content = document.createElement('div');
        content.textContent = String(result);
        container.appendChild(content);
      }
    }
  } catch (error) {
    // Error occurred - wrap in red border
    container.style.border = '4px solid #ef4444';
    container.style.borderRadius = '8px';
    container.style.padding = '16px';
    container.style.backgroundColor = '#fef2f2';
    container.style.position = 'relative';
    
    container.appendChild(createLabel("#ef4444", "✘ Error in Sample Function"));
      const errorContent = document.createElement('div');
      errorContent.textContent = error instanceof Error ? error.message : 'Unknown error';
      errorContent.style.color = '#dc2626';
      errorContent.style.fontFamily = 'monospace';
      container.appendChild(errorContent);
  }
  
  return container;
}
