# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build
npm run preview  # Preview production build
```

## Environment

Set `GEMINI_API_KEY` in `.env.local` (currently unused in the app but configured in Vite).

## Architecture

This is a React 19 + TypeScript ROI calculator for RVK AI, built with Vite. The app calculates revenue impact across four AI agent scenarios.

Source files are in the project root (not in a `src/` directory). Entry point: `index.tsx` → `App.tsx`.

### Path Alias

Import using `@/` to reference the project root (configured in `vite.config.ts`).

### Core Structure

- **`App.tsx`**: Main component containing all calculator logic and UI. Manages state via `useState<CalculatorState>` and performs all ROI calculations inline.
- **`types.ts`**: Defines `CalculatorState` interface and `DEFAULT_STATE` with all input parameters and their defaults.
- **`utils.ts`**: Formatting utilities (`formatCurrency`, `formatNumber`, `formatPercent`) using `Intl.NumberFormat`.
- **`components/`**: Presentational components (`Input`, `ResultRow`, `SectionHeader`) - display only, no business logic.

### Calculator Sections (in App.tsx)

1. **Missed Calls (Ella)**: Revenue from recovering abandoned inbound calls
2. **Outbound Lost Opportunity (Juliana)**: Revenue from re-engaging dead leads
3. **Alumni Re-Admission (Sophy)**: Revenue from eligible alumni engagement
4. **Assessments (Connie)**: Cost savings from assessment automation (FTE hours saved × hourly rate)

### Key Dependencies

- **recharts**: Horizontal bar chart for impact visualization
- **lucide-react**: Icons
- **Tailwind CSS**: Loaded via CDN in `index.html` (not local config)

### Styling

Tailwind is loaded from CDN (`cdn.tailwindcss.com`). No local Tailwind config exists. Inter font is loaded from Google Fonts.
