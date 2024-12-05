export const getTweakerStyles = () => `
  .tweaker-ui {
    position: absolute;
    top: 20px;
    right: 20px;
    border-radius: 8px;
    padding: 12px;
    width: 250px;
    font-family: system-ui, -apple-system, sans-serif;
    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    transition: all 0.2s ease;
  }

  .tweaker-ui[data-theme="light"] {
    background: rgba(255, 255, 255, 0.95);
    color: #333;
  }

  .tweaker-ui[data-theme="dark"] {
    background: rgba(30, 30, 30, 0.95);
    color: #fff;
  }

  .tweaker-control {
    margin-bottom: 8px;
  }

  .tweaker-label {
    display: block;
    font-size: 12px;
    margin-bottom: 4px;
    transition: color 0.2s ease;
  }

  .tweaker-ui[data-theme="light"] .tweaker-label {
    color: #666;
  }

  .tweaker-ui[data-theme="dark"] .tweaker-label {
    color: #aaa;
  }

  .tweaker-button {
    width: 100%;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tweaker-ui[data-theme="light"] .tweaker-button {
    background: #f5f5f5;
    border: 1px solid #ddd;
    color: #333;
  }

  .tweaker-ui[data-theme="dark"] .tweaker-button {
    background: #2a2a2a;
    border: 1px solid #3a3a3a;
    color: #fff;
  }

  .tweaker-ui[data-theme="light"] .tweaker-button:hover {
    background: #eee;
  }

  .tweaker-ui[data-theme="dark"] .tweaker-button:hover {
    background: #3a3a3a;
  }

  .tweaker-input {
    width: 100%;
    padding: 6px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .tweaker-ui[data-theme="light"] .tweaker-input {
    background: #fff;
    border: 1px solid #ddd;
    color: #333;
  }

  .tweaker-ui[data-theme="dark"] .tweaker-input {
    background: #2a2a2a;
    border: 1px solid #3a3a3a;
    color: #fff;
  }

  .tweaker-ui[data-theme="light"] .tweaker-input:focus {
    outline: none;
    border-color: #999;
  }

  .tweaker-ui[data-theme="dark"] .tweaker-input:focus {
    outline: none;
    border-color: #4a4a4a;
  }

  .tweaker-range {
    width: 100%;
    margin: 8px 0;
    -webkit-appearance: none;
    background: transparent;
  }

  .tweaker-range::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    border-radius: 2px;
    transition: all 0.2s ease;
  }

  .tweaker-ui[data-theme="light"] .tweaker-range::-webkit-slider-runnable-track {
    background: #ddd;
    border: 1px solid #ccc;
  }

  .tweaker-ui[data-theme="dark"] .tweaker-range::-webkit-slider-runnable-track {
    background: #2a2a2a;
    border: 1px solid #3a3a3a;
  }

  .tweaker-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    margin-top: -7px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tweaker-ui[data-theme="light"] .tweaker-range::-webkit-slider-thumb {
    background: #666;
    border: 2px solid #fff;
  }

  .tweaker-ui[data-theme="dark"] .tweaker-range::-webkit-slider-thumb {
    background: #fff;
    border: 2px solid #2a2a2a;
  }

  .tweaker-select {
    width: 100%;
    padding: 6px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tweaker-ui[data-theme="light"] .tweaker-select {
    background: #fff;
    border: 1px solid #ddd;
    color: #333;
  }

  .tweaker-ui[data-theme="dark"] .tweaker-select {
    background: #2a2a2a;
    border: 1px solid #3a3a3a;
    color: #fff;
  }

  .tweaker-ui[data-theme="light"] .tweaker-select option {
    background: #fff;
    color: #333;
  }

  .tweaker-ui[data-theme="dark"] .tweaker-select option {
    background: #2a2a2a;
    color: #fff;
  }
`;