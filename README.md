# 🚨 Oref Alert Intelligence Dashboard

A React + TypeScript dashboard that visualizes alert data from Israel's Home Front Command (Pikud HaOref) in real time.

![CI](https://github.com/YOUR_USERNAME/oref-dashboard/actions/workflows/ci.yml/badge.svg)

## Features

- **Champion card** — instantly see the single most-targeted city
- **City rankings** — all cities sorted by alert count with proportional bars and live search
- **Hourly heatmap** — histogram of alerts by hour of day
- **Alert timeline** — chronological log of up to 200 recent alerts
- **Drill-down** — click any city to filter all panels to that city only
- **Refresh** button to re-fetch live data

## Tech Stack

| Tool | Purpose |
|---|---|
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [React 18](https://react.dev) | UI framework |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [styled-components](https://styled-components.com) | CSS-in-JS styling |
| [ESLint](https://eslint.org) + [Prettier](https://prettier.io) | Linting & formatting |

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/oref-dashboard.git
cd oref-dashboard
npm install
```

### Environment

Copy the example env file:

```bash
cp .env.example .env
```

The defaults point to the official Oref API — no changes needed for standard usage.

### Development

```bash
npm run dev
```

The dev server starts on `http://localhost:5173` and is exposed on your **local network** automatically (thanks to `host: true` in `vite.config.ts`), so you can open it on your phone via `http://<YOUR_IP>:5173`.

To find your local IP:

```bash
# macOS
ipconfig getifaddr en0

# Windows
ipconfig   # look for IPv4 Address under Wi-Fi

# Linux
hostname -I
```

### Build

```bash
npm run build
npm run preview   # preview the production build locally
```

### Lint & Format

```bash
npm run lint
npm run format
```

## Project Structure

```
src/
├── components/
│   ├── AlertTimeline.tsx   # Chronological alert log
│   ├── ChampionCard.tsx    # Most-targeted city highlight
│   ├── CityRankings.tsx    # Ranked list with search
│   ├── Header.tsx          # Top bar with refresh
│   ├── HourlyChart.tsx     # Hour-of-day histogram
│   ├── StatsRow.tsx        # Summary stat cards
│   └── StateMessages.tsx   # Loading / error states
├── hooks/
│   ├── useAlerts.ts        # Data fetching + state
│   └── useDebounce.ts      # Input debounce utility
├── styles/
│   ├── GlobalStyle.ts      # CSS reset + global styles
│   └── theme.ts            # Design tokens
├── types/
│   └── index.ts            # TypeScript interfaces
├── utils/
│   ├── alerts.ts           # Data transformation helpers
│   └── api.ts              # Fetch logic
├── App.tsx                 # Root component
└── main.tsx                # Entry point
```

## CORS Note

The Oref API may block cross-origin requests depending on how you serve the app. During development, if you hit a CORS error, you can add a Vite proxy in `vite.config.ts`:

```ts
server: {
  host: true,
  proxy: {
    '/api': {
      target: 'https://www.oref.org.il',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, ''),
    },
  },
}
```

Then set `VITE_API_BASE_URL=/api` in your `.env`.

## License

MIT
