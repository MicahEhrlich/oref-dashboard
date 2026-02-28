export const theme = {
  colors: {
    bg: '#0a0a0f',
    surface: '#12121a',
    surface2: '#1c1c28',
    border: '#2a2a3d',
    text: '#e8e8f0',
    muted: '#6b6b8a',
    red: '#e63946',
    orange: '#f4a261',
    yellow: '#e9c46a',
  },
  fonts: {
    mono: "'Space Mono', monospace",
    sans: "'Heebo', sans-serif",
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
  },
} as const

export type Theme = typeof theme
