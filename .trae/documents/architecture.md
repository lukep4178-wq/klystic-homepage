## 1. Architecture Design

This is a pure static single-page frontend. No backend or database is required.

```mermaid
flowchart LR
    "Browser" --> "Static Single-Page App"
    "Static Single-Page App" --> "External Service Links (new tab)"
    "External Service Links (new tab)" --> "Google"
    "External Service Links (new tab)" --> "Webmail"
    "External Service Links (new tab)" --> "Keplerio (keplerio.com)"
    "External Service Links (new tab)" --> "Knotenplanner (knotenplanner.com)"
```

## 2. Technology Description
- **Frontend**: React 18 + TypeScript + Tailwind CSS 3 + Vite
- **Initialization tool**: `vite-init` using the `react-ts` template (pure frontend, no backend)
- **State management**: Zustand (not strictly required but included by the template; may be used for live clock if desired)
- **Icons**: `lucide-react`
- **Routing**: `react-router-dom` is included but only `/` (Home) is used
- **Backend**: None
- **Database**: None

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| `/` | Klystic Intranet Home — welcome hero + 4 quick-link cards with gradient wave background |

## 4. API Definitions
No backend APIs are used. External link targets:
- Google: `https://www.google.com`
- Webmail: `https://mail.google.com` (generic webmail default; can be swapped)
- Keplerio: `https://keplerio.com`
- Knotenplanner: `https://knotenplanner.com`

All links use `target="_blank"` and `rel="noopener noreferrer"`.

## 5. Server Architecture Diagram
Not applicable — no backend.

## 6. Data Model
Not applicable — no database.
