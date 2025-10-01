import { LucideIcon, BookOpen, Sparkles, Sun, Moon } from 'lucide-react';

export type ThemeType = 'classic' | 'modern';
export type ClassicModeType = 'light' | 'dark';

export interface ThemeVariant {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  colors: string[];
  cssClass?: string;
  backgroundGradient?: string;
}

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  description: string;
  icon: LucideIcon;
  variants: ThemeVariant[];
  defaultVariant: string;
}

export const THEME_CONFIGS: Record<ThemeType, ThemeConfig> = {
  classic: {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional, clean, focused',
    icon: BookOpen,
    defaultVariant: 'light',
    variants: [
      {
        id: 'light',
        name: 'Light',
        description: 'Clean white background',
        icon: Sun,
        colors: ['#002b4e', '#c81e1c', '#e95d41'],
        cssClass: 'classic-light',
        backgroundGradient: 'bg-white'
      },
      {
        id: 'dark',
        name: 'Dark',
        description: 'Dark professional theme',
        icon: Moon,
        colors: ['#0f172a', '#1e293b', '#334155'],
        cssClass: 'classic-dark',
        backgroundGradient: 'bg-gradient-to-b from-slate-900 to-slate-800'
      }
    ]
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Dynamic, animated, futuristic',
    icon: Sparkles,
    defaultVariant: 'default',
    variants: [
      {
        id: 'default',
        name: 'Modern',
        description: 'Futuristic with animations',
        icon: Sparkles,
        colors: ['#3b82f6', '#8b5cf6', '#ec4899'],
        cssClass: 'modern-default',
        backgroundGradient: 'bg-gray-900'
      }
    ]
  }
};

export const getThemeConfig = (theme: ThemeType): ThemeConfig => {
  return THEME_CONFIGS[theme];
};

export const getThemeVariant = (theme: ThemeType, variantId: string): ThemeVariant | undefined => {
  const config = getThemeConfig(theme);
  return config.variants.find(v => v.id === variantId);
};

export const getDefaultVariant = (theme: ThemeType): ThemeVariant => {
  const config = getThemeConfig(theme);
  const defaultVariant = config.variants.find(v => v.id === config.defaultVariant);
  return defaultVariant || config.variants[0];
};

// CSS Classes for theme variants - Strict SPSD Colors
export const THEME_CLASSES = {
  'classic-light': {
    background: 'bg-[var(--spsd-bg-light)]',
    text: 'text-[var(--spsd-text-light)]',
    cardBg: 'bg-[var(--spsd-bg-light)]',
    border: 'border-[var(--spsd-navy-light)]',
    accent: 'text-[var(--spsd-navy)]'
  },
  'classic-dark': {
    background: 'bg-[var(--spsd-bg-dark)]',
    text: 'text-[var(--spsd-text-dark)]',
    cardBg: 'bg-[var(--spsd-bg-dark-secondary)]',
    border: 'border-[var(--spsd-navy-lighter)]',
    accent: 'text-[var(--spsd-red-light)]'
  },
  'modern-default': {
    background: 'bg-gray-900',
    text: 'text-white',
    cardBg: 'bg-white/5 backdrop-blur-xl',
    border: 'border-white/10',
    accent: 'text-purple-400'
  }
} as const;

export type ThemeClassName = keyof typeof THEME_CLASSES;