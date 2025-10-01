# Modular Theme System

A comprehensive, modular theme system for the SPŠD Student Hub application.

## Features

- **Multiple Theme Types**: Classic and Modern themes
- **Theme Variants**: Light/Dark modes for Classic theme
- **Modular Architecture**: Easy to extend and customize
- **Type Safety**: Full TypeScript support
- **CSS Integration**: Seamless integration with Tailwind CSS

## Usage

### Basic Theme Hook

```typescript
import { useTheme } from '@/lib/theme';

function MyComponent() {
  const { 
    theme, 
    classicMode, 
    switchTheme, 
    getBackgroundClass,
    isCurrentTheme 
  } = useTheme();

  return (
    <div className={getBackgroundClass()}>
      <button onClick={() => switchTheme('classic', 'dark')}>
        Switch to Classic Dark
      </button>
    </div>
  );
}
```

### Theme Configuration

```typescript
import { THEME_CONFIGS, getThemeConfig } from '@/lib/theme';

// Get all available themes
const themes = Object.values(THEME_CONFIGS);

// Get specific theme configuration
const classicConfig = getThemeConfig('classic');
```

### Dynamic Theme Selection

The theme system supports dynamic theme switching through the Dynamic Island UI component, allowing users to:

1. Choose between Classic and Modern themes
2. Select Light/Dark variants for Classic theme
3. See live preview of theme colors
4. Expand/collapse theme options

## Theme Structure

### Classic Theme
- **Light Mode**: Clean white background with SPŠD navy accents
- **Dark Mode**: Professional dark slate background with blue accents

### Modern Theme
- **Default**: Futuristic gradients with purple/blue color scheme

## Architecture

```
/lib/theme/
├── index.ts          # Main exports
├── ThemeConfig.ts    # Theme configurations and types
├── useTheme.ts       # React hook for theme management
└── README.md         # This documentation
```

### Key Components

1. **ThemeConfig.ts**: Defines theme structures, variants, and CSS classes
2. **useTheme.ts**: React hook providing theme state and utilities
3. **index.ts**: Centralized exports for easy importing

## CSS Integration

The theme system integrates with CSS through:

- CSS custom properties for SPŠD colors
- Tailwind CSS classes for responsive design
- Dynamic class application based on theme state

## Extending the System

### Adding a New Theme

1. Add theme configuration to `THEME_CONFIGS`
2. Define CSS classes in `THEME_CLASSES`
3. Add corresponding CSS styles
4. Update TypeScript types if needed

### Adding Theme Variants

1. Add variant to existing theme's `variants` array
2. Define CSS classes for the variant
3. Add any specific styling rules

## Example: Custom Theme

```typescript
// In ThemeConfig.ts
const CUSTOM_THEME: ThemeConfig = {
  id: 'custom',
  name: 'Custom',
  description: 'My custom theme',
  icon: Palette,
  defaultVariant: 'default',
  variants: [
    {
      id: 'default',
      name: 'Default',
      description: 'Custom theme variant',
      icon: Palette,
      colors: ['#ff0000', '#00ff00', '#0000ff'],
      cssClass: 'custom-default',
      backgroundGradient: 'bg-gradient-to-r from-red-500 to-blue-500'
    }
  ]
};
```

## Integration Points

- **Dynamic Island**: Theme selector with expandable variants
- **Client Layout**: Background and styling application
- **Welcome Dialog**: Initial theme selection during onboarding
- **Footer Components**: Theme-aware styling

This modular approach ensures maintainability, extensibility, and type safety across the entire theme system.