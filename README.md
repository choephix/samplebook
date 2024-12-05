# 🎨 Interactive Component Playground

A modern, interactive playground for exploring and experimenting with UI components, animations, and 3D scenes. Built with Astro and React.

## ✨ Features

- **Live Preview**: Instantly see your changes in action
- **Interactive Controls**: Tweak parameters in real-time with the built-in UI controls
- **Dark/Light Mode**: Seamless theme switching for comfortable viewing
- **Component Categories**:
  - 🎭 Animations (particles, waves, bouncing elements)
  - 🎲 3D Scenes (powered by Babylon.js)
  - 🎯 UI Components (buttons, cards, inputs)
  - 📊 Interactive Visualizations

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🛠 Structure

```
src/
├── components/    # Core UI components
├── samples/       # Interactive examples
├── lib/          # Shared utilities and tools
│   └── tweaker/  # Interactive control panel
├── hooks/        # React hooks
└── utils/        # Helper functions
```

## 🎮 Using the Tweaker

Each sample can be customized using the Tweaker panel:

- Adjust numerical values with sliders
- Toggle animations on/off
- Modify colors and styles
- Transform 3D objects
- Customize particle systems

## 🤝 Contributing

Feel free to experiment, create new samples, or improve existing ones. Each sample lives in its own file under `src/samples/` and follows a simple pattern:

```typescript
export const MySample: SampleFunction = () => {
  // Create your interactive component here
  return element;
};
```

## 📝 License

MIT