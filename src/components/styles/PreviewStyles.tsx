import React from 'react';

export function PreviewStyles() {
  return (
    <style>{`
      .preview {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: var(--bg-primary);
      }
      .preview-header {
        padding: 0.75rem 1rem;
        background: var(--bg-secondary);
        border-bottom: 1px solid var(--border-color);
        font-weight: normal;
        color: var(--text-primary);
        font-size: 0.9rem;
      }
      .preview-content {
        flex: 1;
        padding: 2rem;
        overflow: auto;
        background-image: var(--checkerboard-pattern);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        position: relative;
      }
      .preview-content canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .empty {
        color: var(--text-secondary);
        text-align: center;
        margin-top: 2rem;
        font-size: 0.9rem;
      }
      .error {
        color: var(--error-color);
        padding: 1rem;
        border: 1px solid var(--error-color);
        border-radius: 4px;
        background: var(--error-bg);
        font-size: 0.9rem;
      }
    `}</style>
  );
}