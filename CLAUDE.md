# Portfolio Website - Development Guidelines

## Project Overview
A minimalistic, dark-themed portfolio website built with Next.js 15, TypeScript, Tailwind CSS v4, and Framer Motion. The design aesthetic is inspired by modern data visualization dashboards with clean lines, professional typography, and subtle accent colors (blue, coral, orange).

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (CSS-based configuration)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

---

## Architecture Patterns

### Atomic Design Principles
Components are organized in a hierarchical structure:

1. **UI Components** (`/components/ui/`)
   - Pure, reusable atoms (Button, Input, Card, Badge)
   - Single responsibility, highly composable
   - No business logic, only presentational

2. **Animation Wrappers** (`/components/animations/`)
   - Reusable animation HOCs (FadeIn, StaggerContainer)
   - Framer Motion based
   - Intersection Observer for scroll-triggered animations

3. **Feature Components** (`/components/features/`)
   - Molecules combining UI elements (ProjectCard, ContactForm)
   - May contain local state and logic
   - Domain-specific functionality

4. **Section Components** (`/components/sections/`)
   - Organisms representing full page sections (Hero, About, Skills)
   - Compose feature and UI components
   - Section-level layout and structure

5. **Layout Components** (`/components/layout/`)
   - Page-level structure (Header, Footer)
   - Global navigation and positioning
   - Consistent across all pages

---

## File Organization

### Directory Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page (all sections)
│   ├── globals.css         # Tailwind config & global styles
│   └── api/                # API routes
├── components/
│   ├── ui/                 # Atomic UI components
│   ├── animations/         # Animation wrappers
│   ├── features/           # Feature-specific components
│   ├── sections/           # Page section components
│   └── layout/             # Layout components
├── lib/
│   ├── utils.ts            # Utility functions (cn, etc.)
│   ├── animations.ts       # Framer Motion variants
│   └── constants.ts        # App-wide constants
├── data/
│   ├── personal.ts         # Personal info, social links
│   ├── skills.ts           # Skills data
│   └── projects.ts         # Projects data
└── types/
    ├── project.ts          # Project type definitions
    ├── skill.ts            # Skill type definitions
    └── index.ts            # Barrel exports
```

### Naming Conventions
- **Components**: PascalCase (e.g., `ProjectCard.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Types**: PascalCase interfaces (e.g., `Project`, `SkillCategory`)
- **CSS classes**: kebab-case via Tailwind utilities
- **Files**: Match the primary export name

---

## Component Composition Rules

### Props Interface Pattern
```typescript
// Always define explicit props interfaces
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  // Implementation
}
```

### Class Name Merging
Always use the `cn()` utility for merging Tailwind classes:
```typescript
import { cn } from '@/lib/utils';

<button className={cn(
  'base-classes',
  variant === 'primary' && 'variant-specific-classes',
  className  // User overrides last
)} />
```

### Component Splitting
- Keep components under 200 lines
- Extract complex logic into custom hooks
- Use composition over prop drilling
- Prefer multiple small components over one large component

---

## Data Management

### Static Data Pattern
All content is defined in typed data files:

```typescript
// types/project.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

// data/projects.ts
export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    // ...
  },
];
```

### Why Static Data?
- Type-safe at compile time
- Easy to version control
- Fast build times
- Can migrate to CMS later without refactoring components

---

## Styling Conventions

### Tailwind CSS v4 Usage
This project uses Tailwind v4 with CSS-based configuration in `globals.css`:

```css
@theme inline {
  --color-background: var(--background);
  --color-accent-blue: var(--accent-blue);
  /* etc. */
}
```

Access colors in components:
```typescript
<div className="bg-background text-foreground" />
<div className="text-accent-blue hover:text-accent-blue-light" />
```

### Responsive Design (Mobile-First)
```typescript
className={cn(
  'text-base',      // Mobile
  'md:text-lg',     // Tablet (768px+)
  'lg:text-xl',     // Desktop (1024px+)
)}
```

### Spacing Scale
- Section padding: `py-16 md:py-24`
- Container max-width: `max-w-7xl`
- Container padding: `px-4 sm:px-6 lg:px-8`
- Element gaps: `gap-4`, `gap-6`, `gap-8`

### Custom Utilities
```css
/* globals.css */
.text-balance { text-wrap: balance; }
.grid-bg { /* Grid background pattern */ }
```

---

## Animation Patterns

### Framer Motion Variants
Defined in `lib/animations.ts` for consistency:

```typescript
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};
```

### Intersection Observer Pattern
Use animation wrappers with `react-intersection-observer`:

```typescript
<FadeIn>
  <div>Content fades in when scrolled into view</div>
</FadeIn>
```

### Animation Best Practices
- Use `viewport={{ once: true }}` to animate only once
- Add `margin: "-100px"` to trigger animations slightly before scroll
- Keep duration under 600ms for responsiveness
- Use CSS easing functions: `ease-out` for entrances, `ease-in-out` for transitions

---

## TypeScript Guidelines

### Strict Mode
- `strict: true` in `tsconfig.json`
- No `any` types (use `unknown` if truly needed)
- Define explicit return types for functions
- Use `interface` for object shapes, `type` for unions

### Type Exports
```typescript
// types/index.ts - Barrel export
export type { Project, ProjectCategory } from './project';
export type { Skill, SkillCategory } from './skill';
```

### Props vs. Types
- Use `interface` for component props (allows extension)
- Use `type` for utility types and unions

---

## Performance Optimization

### Image Optimization
Always use Next.js `Image` component:
```typescript
import Image from 'next/image';

<Image
  src="/images/project.jpg"
  alt="Project screenshot"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

### Code Splitting
- Use dynamic imports for heavy components:
```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

### Bundle Optimization
- `next.config.ts` removes console logs in production
- Tree-shaking enabled by default
- Only import what you need from libraries

---

## Accessibility Standards

### WCAG 2.1 AA Compliance
- All interactive elements have visible focus states
- Color contrast ratio ≥ 4.5:1 for text
- Touch targets ≥ 44px on mobile
- Semantic HTML (`nav`, `section`, `article`, `aside`)

### ARIA Labels
```typescript
<button aria-label="Navigate to Projects section">
  <ArrowDown />
</button>

<nav aria-label="Main navigation">
  {/* nav content */}
</nav>
```

### Keyboard Navigation
- All interactive elements reachable via Tab
- Enter/Space activate buttons
- Escape closes modals/menus
- Skip to main content link

---

## Testing Strategy

### Manual Testing Checklist
- [ ] All sections render correctly
- [ ] Smooth scroll navigation works
- [ ] Forms validate and submit
- [ ] Animations trigger on scroll
- [ ] Responsive on mobile, tablet, desktop
- [ ] Images load with proper optimization
- [ ] Keyboard navigation functional
- [ ] Screen reader compatibility
- [ ] Cross-browser (Chrome, Firefox, Safari, Edge)

### Performance Targets
- Lighthouse Performance: > 90
- Lighthouse Accessibility: > 95
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

---

## Environment Variables

### Required Variables
```bash
# .env.local
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
```

### Optional Variables
```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact Form (if using email service)
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

---

## Git Workflow

### Commit Message Format
```
type: Brief description (50 chars max)

Detailed explanation if needed (wrap at 72 chars)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Branch Strategy
- `main`: Production-ready code
- Feature branches: `feature/section-name`
- Bugfix branches: `fix/bug-description`

---

## Code Quality Standards

Following senior-level best practices:

1. **Single Responsibility**: Each component/function does one thing well
2. **DRY Principle**: No code repetition, extract reusable logic
3. **KISS Principle**: Simple solutions over complex ones
4. **Descriptive Naming**: Clear, self-documenting variable/function names
5. **Small Functions**: Keep functions focused and under 30 lines
6. **Comments**: Explain *why*, not *what* (code should be self-explanatory)
7. **Type Safety**: Leverage TypeScript fully, no `any` types
8. **Consistent Formatting**: Use Prettier/ESLint (auto-format on save)

### Code Review Checklist
- [ ] Component has single responsibility
- [ ] Props interface is clearly defined
- [ ] Accessibility attributes present
- [ ] Responsive design implemented
- [ ] TypeScript types are strict
- [ ] No console.logs or commented code
- [ ] Error handling present where needed
- [ ] Performance optimizations applied

---

## Deployment

### Vercel Deployment
1. Push code to GitHub
2. Import repository in Vercel
3. Configure environment variables
4. Deploy (automatic on push to `main`)
5. Configure custom domain (optional)

### Build Command
```bash
npm run build  # Runs next build
npm start      # Runs production server
```

### Pre-deployment Checklist
- [ ] All environment variables set
- [ ] Build succeeds locally
- [ ] No TypeScript errors
- [ ] Lighthouse scores meet targets
- [ ] SEO metadata complete
- [ ] 404 page exists
- [ ] robots.txt configured

---

## Maintenance & Updates

### Regular Tasks
- Update dependencies quarterly: `npm update`
- Review Lighthouse scores monthly
- Test on new browser versions
- Audit bundle size: `npm run build` (check .next/static)

### Adding New Sections
1. Create component in `src/components/sections/`
2. Add data to appropriate file in `src/data/`
3. Import and compose in `src/app/page.tsx`
4. Update navigation in `Header.tsx`
5. Test responsive design and animations

### Extending to Multi-page
Current single-page structure easily extends:
```
src/app/
├── page.tsx          # Home
├── projects/
│   └── page.tsx      # Projects page
└── blog/
    └── page.tsx      # Blog page
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Framer Motion API](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Web.dev Accessibility](https://web.dev/accessibility/)

---

## Contact & Support

For questions about this codebase architecture, refer to this document. For Next.js/React questions, consult official documentation.

**Last Updated**: 2025-12-22
