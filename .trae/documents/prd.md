## 1. Product Overview

Klystic Intranet Portal is a central company dashboard landing page for employees to quickly access essential tools and services. It provides a clean, visually striking entry point with direct links to Google, Webmail, Keplerio, and Knotenplanner.

- **Purpose**: Consolidate frequently used company web services into one beautiful, intuitive homepage.
- **Target users**: All Klystic employees and team members.
- **Value**: Reduces navigation friction and boosts productivity by putting essential tools one click away.

## 2. Core Features

### 2.1 User Roles
There is no authentication or role distinction for this static portal.

| Role | Registration Method | Core Permissions |
|------|---------------------|------------------|
| Employee / Guest | Direct access via intranet URL | View and click service links |

### 2.2 Feature Module
1. **Home page**: branded header with Klystic logo, hero welcome area, quick-link cards grid, footer.

### 2.3 Page Details
| Page Name | Module Name | Feature description |
|-----------|-------------|---------------------|
| Home page | Branded Header | Fixed/sticky Klystic logo and tagline in the top-right area, matching the reference image brand identity. |
| Home page | Welcome Hero | Centered greeting with current day/time and a short motivational tagline. |
| Home page | Quick-link Cards Grid | Four visually distinct cards linking to Google, Webmail, Keplerio, and Knotenplanner. Each card has an icon, label, and hover animation. Links open in new tab. |
| Home page | Background Layer | Dynamic gradient wave shapes in blue/purple/pink/orange echoing the reference image aesthetic, with subtle particle/dot texture. |
| Home page | Footer | Simple copyright and company name footer. |

## 3. Core Process

When a user opens the intranet page in their browser, the page animates in with a staggered reveal of the logo, welcome text, and link cards. The user then clicks any service card, which opens the target URL in a new browser tab.

```mermaid
flowchart TD
    "A: User visits intranet URL" --> "B: Page loads with staggered reveal animations"
    "B" --> "C: User views quick-link cards"
    "C" --> "D: User hovers over a card (glow + lift effect)"
    "D" --> "E: User clicks card"
    "E" --> "F: Target service opens in new tab"
```

## 4. User Interface Design

### 4.1 Design Style
- **Primary palette**: Electric blue (#1e90ff), vivid purple (#8a2be2), hot pink (#ff3ea5), warm orange (#ff8a3d) — flowing from the reference image.
- **Background**: Near-white canvas (#fafcff) with layered semi-transparent gradient wave shapes at the bottom-left and subtle dotted halftone texture.
- **Button / Card style**: Glassmorphic cards with soft rounded corners (18–24px), subtle backdrop blur, thin light border, and hover state with lift, scale, and colored glow shadow matching the card accent.
- **Typography**:
  - Display/Brand font: A distinctive geometric sans with character (e.g., "Sora" or "Poppins" for headings).
  - Body font: Clean modern sans (e.g., "Inter" or "Sora") for readability.
  - Sizes: Brand name large (36–44px), welcome headline (28–32px), card titles (18px), captions (13px).
- **Layout**: Centered column with logo anchored top-right; hero block centered; 2×2 card grid below (4 cards).
- **Icon style**: Colored Lucide icons inside rounded icon tiles matching each service's brand feel.
- **Motion**: Staggered fade-and-slide-in on load (logo → hero → cards); smooth hover transitions; subtle floating animation on wave shapes.

### 4.2 Page Design Overview
| Page Name | Module Name | UI Elements |
|-----------|-------------|-------------|
| Home page | Branded Header | Top-right Klystic wordmark + tagline ("Advanced Web Solutions. Software. SaaS.") — uses gradient blue/purple/pink/orange accents matching logo. Sticky position. |
| Home page | Welcome Hero | Centered. Greets user with "Welcome to Klystic Intranet" headline, live date/time chip, and short tagline. Generous negative space. |
| Home page | Quick-link Cards Grid | 2 columns × 2 rows on desktop, single column on mobile. Cards: Google (red/orange accent), Webmail (blue accent), Keplerio (purple accent), Knotenplanner (teal/green accent). Each has icon tile, title, short description, arrow indicator. External `target="_blank"` links. |
| Home page | Background Layer | Layered CSS wave gradients (blue → purple → pink → orange) in the bottom-left, softly overlapping. Dotted radial texture overlay with low opacity. |
| Home page | Footer | Thin bottom bar with copyright notice, centered, low-contrast text. |

### 4.3 Responsiveness
- Desktop-first design.
- At `lg` breakpoint (1024px): cards remain 2×2.
- At `md` breakpoint (768px): cards collapse to 1×4 column; logo shrinks slightly.
- At `sm` breakpoint (480px): card paddings tighten; typography scales down.
- All touch targets have a minimum 44×44px hit area.

### 4.4 3D Scene Guidance
Not applicable for this project.
