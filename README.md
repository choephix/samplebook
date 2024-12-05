# Component Preview

A minimal, fast alternative to Storybook for testing components in your monorepo.

## Why?

- **Zero Config**: Add as a workspace, write `.sample.ts` files, done
- **Fast**: Instant hot-reloading, no build step
- **Simple**: Test components from other workspaces without ceremony
- **Practical**: Built-in parameter controls that just work

## Usage

1. Add to your monorepo:

```json
{
  "workspaces": [
    "packages/*",
    "preview"
  ]
}
```

2. Install your workspace dependencies:

```json
{
  "dependencies": {
    "@your-org/components": "workspace:*"
  }
}
```

3. Create a `.sample.ts` file:

```typescript
import { Button } from '@your-org/components';

export const Primary = () => {
  const button = Button({ variant: 'primary' });
  
  const tweaker = createTweakerUI()
    .addDropdown({
      label: 'Variant',
      options: ['primary', 'secondary'],
      get: () => button.variant,
      set: value => button.setVariant(value)
    });

  return [button.element, tweaker.dom];
};
```

## Tweaker API

Control your components with zero boilerplate:

```typescript
createTweakerUI()
  .addButton({ label: 'Click', trigger: fn })
  .addStringInput({ label: 'Text', get: fn, set: fn })
  .addNumericInput({ label: 'Width', get: fn, set: fn })
  .addRangeInput({ label: 'Opacity', get: fn, set: fn })
  .addDropdown({ label: 'Size', options: [], get: fn, set: fn })
  .addVectorInput({ label: 'Position', get: fn, set: fn })
```

## Development

```bash
npm install
npm run dev
```

## License

MIT