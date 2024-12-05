# Component Preview

A lightweight, fast alternative to Storybook for previewing and testing UI components. Built with Astro and React.

## Why?

- **Lightweight**: No complex configuration, just create a `.sample.ts` file and export your component
- **Fast**: Instant hot-reloading, minimal build time
- **Interactive**: Built-in parameter controls without writing any boilerplate
- **Modern**: Dark/light mode, responsive design, and a clean interface

## Getting Started

```bash
npm install
npm run dev
```

## Usage

1. Create a `.sample.ts` file in `src/samples/`:

```typescript
export const MyButton = () => {
  const button = document.createElement('button');
  button.textContent = 'Click me';
  
  const tweaker = createTweakerUI()
    .addStringInput({
      label: 'Text',
      get: () => button.textContent || '',
      set: value => button.textContent = value
    });

  return [button, tweaker.dom];
};
```

2. That's it! Your component appears in the sidebar automatically.

## Features

### Interactive Controls

The built-in Tweaker UI lets you:
- Add sliders, inputs, and buttons
- Control numerical values
- Adjust colors and styles
- Transform properties
- Toggle states

No configuration or extra code required - just use the Tweaker API.

### Theme Support

- Automatic dark/light mode
- Smooth transitions
- Consistent styling across components
- System preference detection

### Developer Experience

- Hot module reloading
- Automatic file watching
- Simple file-based routing
- Zero configuration

## Project Structure

```
src/
├── components/    # Core UI components
├── samples/      # Your component samples
├── lib/          # Utilities and tools
└── utils/        # Helper functions
```

## Example Components

The project includes various sample components demonstrating different use cases:
- Basic UI elements (buttons, inputs, cards)
- Interactive animations
- 3D scenes (via Babylon.js)
- Data visualizations

## License

MIT