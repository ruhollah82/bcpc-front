# BCPC Frontend - AI Agent Guidelines

## 🎯 Project Overview

This is the frontend for **Birjand Competitive Programming Contest (BCPC)** — the local branch of ICPC at the University of Birjand.

### Core Pages & Features

- **Landing Page** — Hero section with engaging animations, smooth scroll, contest highlights
- **About Contest** — Introduction to ICPC/BCPC, rules, timeline
- **Gallery** — Photos from previous years' contests
- **Register** — Registration form for participants
- **Online Contest Entry** — Login/entry portal for the live contest
- **Contact Us** — Contact form and organizer information

### Design Philosophy

- **Mobile-first responsive** design (critical: mobile & desktop parity)
- **Smooth scrolling** and micro-interactions
- **Modern, engaging animations** (not heavy — performance-aware)
- **Clean, academic yet modern** aesthetic (fitting for a university contest)
- **Persian (RTL) support** — primary language is Persian, English secondary
- **Dark/Light mode** support via shadcn theme system

---

## 📁 Project Structure

```
src/
├── assets/
│   ├── images/          # Photos (gallery, hero, sponsors)
│   └── icons/           # Custom SVG icons
├── components/
│   ├── ui/              # shadcn/ui primitives (DO NOT edit manually — use CLI)
│   ├── sections/        # Landing page sections (Hero, About, Gallery, etc.)
│   ├── layout/          # Header, Footer, Navbar, MobileMenu
│   ├── animations/      # Reusable animation components & variants
│   └── shared/          # Reusable components (Button, Card, etc.)
├── hooks/
│   ├── use-scroll-animation.ts
│   ├── use-countdown.ts
│   └── use-media-query.ts
├── layouts/             # Astro layouts (BaseLayout, AuthLayout, etc.)
├── lib/
│   ├── utils.ts         # cn() helper
│   ├── constants.ts     # Site-wide constants (dates, links, texts)
│   ├── animations.ts    # Animation variants & presets
│   └── api.ts           # API client (if needed)
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── gallery.astro
│   ├── register.astro
│   ├── contact.astro
│   ├── login.astro
│   └── api/
└── styles/
    ├── global.css
    └── animations.css   # Custom keyframes
```

### Rules for Structure

- ✅ **One component per file** — never combine multiple components
- ✅ **Section components** go in `components/sections/` (e.g., `HeroSection.tsx`)
- ✅ **Animation components** go in `components/animations/` (e.g., `FadeIn.tsx`)
- ✅ **Layout components** go in `components/layout/` (e.g., `Header.tsx`)
- ✅ **Page-specific logic** stays in the page file or a dedicated hook
- ❌ **Never** put business logic inside UI components
- ❌ **Never** create files deeper than 3 levels in `components/`

---

## 🎨 Tech Stack & Conventions

### Framework

- **Astro 7** — static-first, islands architecture
- **React 19** — for interactive components (add `client:load`, `client:visible`, or `client:only` as needed)
- **TypeScript (strict mode)** — no `any`, no `@ts-ignore`

### Styling

- **Tailwind CSS v4** — utility-first, via Vite plugin
- **shadcn/ui (base-nova style)** — component library
- **CSS Variables** — for theming (defined in `global.css`)
- **`cn()` utility** — always use for merging classes: `cn("base", condition && "conditional", className)`

### Animation Stack

- **Framer Motion (`motion`)** — for React component animations (primary)
- **CSS transitions** — for simple hover/focus states
- **CSS keyframes** — for complex repeating animations (defined in `animations.css`)
- **Astro `transition:animate`** — for page transitions (if using View Transitions)
- **Intersection Observer** — for scroll-triggered animations (via custom hooks)

### Icons

- **Lucide React** — primary icon library
- Import only what you use: `import { Menu } from "lucide-react"`

---

## 📝 Code Style Rules

### Components

```tsx
// ✅ GOOD — Named export, typed props, default values
interface HeroSectionProps {
  title: string;
  subtitle?: string;
}

export function HeroSection({ title, subtitle = "Welcome" }: HeroSectionProps) {
  return <section>...</section>;
}
```

```tsx
// ❌ BAD — Default export, untyped, inline styles
export default function Hero({ title }: any) {
  return <section style={{ color: "red" }}>...</section>;
}
```

### Rules

- ✅ Use **named exports** (not default) for components
- ✅ Define **TypeScript interfaces** for all props
- ✅ Use **`client:visible`** for below-the-fold animations (performance)
- ✅ Use **`client:load`** only for critical interactive components
- ✅ Extract **reusable logic** into custom hooks (`useScrollAnimation`, `useCountdown`)
- ✅ Use **semantic HTML** (`<section>`, `<article>`, `<nav>`, `<main>`)
- ✅ Add **`aria-label`** and **`alt`** attributes for accessibility
- ❌ Don't use inline styles — use Tailwind classes
- ❌ Don't use `!important` in Tailwind unless absolutely necessary
- ❌ Don't hardcode strings — use `lib/constants.ts` for translatable text

### File Naming

- Components: `PascalCase.tsx` (e.g., `HeroSection.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `use-countdown.ts`)
- Utils: `kebab-case.ts` (e.g., `date-utils.ts`)
- Pages: `kebab-case.astro` or `index.astro`

---

## 🎬 Animation Guidelines (CRITICAL)

### Core Principles

1. **Performance First** — animations must be smooth (60fps) on mobile
2. **Purposeful** — every animation must have a reason (guide attention, provide feedback, enhance UX)
3. **Subtle > Flashy** — prefer elegant micro-interactions over flashy effects
4. **Accessible** — respect `prefers-reduced-motion`
5. **RTL-Aware** — test animations in both directions

### Animation Types & When to Use

#### 1. **Scroll-Triggered Animations** (Most Common)

Use for revealing content as user scrolls. **Must use `client:visible`** for performance.

```tsx
// ✅ GOOD — components/animations/FadeIn.tsx
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const directionOffset = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
```

**Usage in Astro:**

```astro
---
import { FadeIn } from "@/components/animations/FadeIn";
---
<FadeIn client:visible direction="up" delay={0.1}>
  <h2>عنوان بخش</h2>
</FadeIn>
```

#### 2. **Hover Animations** (Micro-interactions)

Use for buttons, cards, links. **Use CSS transitions, not Framer Motion** for performance.

```tsx
// ✅ GOOD — Tailwind + CSS transitions
export function Card({ title }: { title: string }) {
  return (
    <div className="group rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
        {title}
      </h3>
    </div>
  );
}
```

```tsx
// ❌ BAD — Framer Motion for simple hover (overkill, worse performance)
export function Card({ title }: { title: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
      <h3>{title}</h3>
    </motion.div>
  );
}
```

#### 3. **Page Load Animations** (Hero Section)

Use for initial page load. **Stagger children** for elegant effect.

```tsx
// ✅ GOOD — components/animations/StaggerContainer.tsx
import { motion } from "motion/react";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
```

**Usage:**

```tsx
<StaggerContainer>
  <StaggerItem>
    <h1>مسابقه برنامه‌نویسی بیرجند</h1>
  </StaggerItem>
  <StaggerItem>
    <p>بزرگترین رویداد برنامه‌نویسی دانشگاه</p>
  </StaggerItem>
  <StaggerItem>
    <Button>ثبت‌نام</Button>
  </StaggerItem>
</StaggerContainer>
```

#### 4. **Countdown/Timer Animations**

Use for contest countdown. **Use `useCountdown` hook**.

```tsx
// ✅ GOOD — hooks/use-countdown.ts
import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(targetDate: Date): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}
```

```tsx
// ✅ GOOD — components/CountdownTimer.tsx
import { motion } from "motion/react";
import { useCountdown } from "@/hooks/use-countdown";

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const timeLeft = useCountdown(targetDate);

  const timeUnits = [
    { label: "روز", value: timeLeft.days },
    { label: "ساعت", value: timeLeft.hours },
    { label: "دقیقه", value: timeLeft.minutes },
    { label: "ثانیه", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4">
      {timeUnits.map((unit) => (
        <div key={unit.label} className="text-center">
          <motion.div
            key={unit.value}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold text-primary"
          >
            {unit.value.toString().padStart(2, "0")}
          </motion.div>
          <div className="text-sm text-muted-foreground">{unit.label}</div>
        </div>
      ))}
    </div>
  );
}
```

#### 5. **Smooth Scroll** (Navigation)

Use for anchor links. **Use CSS `scroll-behavior: smooth`**.

```css
/* styles/global.css */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

#### 6. **Loading States**

Use for async operations. **Use skeleton loaders, not spinners** (better UX).

```tsx
// ✅ GOOD — components/Skeleton.tsx
import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
}
```

### Animation Performance Rules

#### ✅ DO:

- Use `transform` and `opacity` only (GPU-accelerated)
- Use `will-change` sparingly (only for elements that will animate)
- Use `viewport={{ once: true }}` for scroll animations (don't re-animate)
- Use `client:visible` for below-the-fold animations
- Keep animation duration between **0.2s - 0.6s** (fast enough to feel responsive)
- Use easing functions like `[0.21, 0.47, 0.32, 0.98]` (natural feel)
- Test on **low-end mobile devices** (3G, old phones)

#### ❌ DON'T:

- Animate `width`, `height`, `top`, `left`, `margin`, `padding` (causes layout thrashing)
- Use more than **3 animations on screen at once** (overwhelming)
- Use `delay` > 1s (user thinks page is broken)
- Animate large images or complex SVGs (use `transform: scale()` instead)
- Use Framer Motion for simple hover effects (CSS is faster)
- Forget to test with `prefers-reduced-motion: reduce`

### Accessibility: Reduced Motion

**MUST** respect user's motion preferences:

```tsx
// ✅ GOOD — lib/use-reduced-motion.ts
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}
```

```tsx
// ✅ GOOD — Using reduced motion in components
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

### RTL Animation Considerations

**Test all animations in RTL!** Some animations need direction-awareness:

```tsx
// ✅ GOOD — Direction-aware slide animation
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function SlideIn({
  children,
  direction = "left",
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
}) {
  const reducedMotion = useReducedMotion();
  const isRTL = document.documentElement.dir === "rtl";

  // In RTL, "left" becomes "right" and vice versa
  const actualDirection = isRTL
    ? direction === "left"
      ? "right"
      : "left"
    : direction;

  const xOffset = actualDirection === "left" ? -50 : 50;

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, x: xOffset }}
      whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

### Animation Variants Library

**Create reusable variants** in `lib/animations.ts`:

```typescript
// lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};
```

**Usage:**

```tsx
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

<motion.div {...staggerContainer}>
  <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
    <h1>عنوان</h1>
  </motion.div>
  <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
    <p>توضیحات</p>
  </motion.div>
</motion.div>;
```

---

## 🌐 RTL & Persian Support

- Primary language is **Persian (fa)** — use `dir="rtl"` on `<html>`
- Font: **Vazirmatn** or **Estedad** for Persian, **Geist** for English/numbers
- All user-facing text should be in Persian (constants file)
- Ensure animations work correctly in RTL (test both directions)
- Use `rtl:` and `ltr:` Tailwind variants when needed

---

## 📱 Responsive Design Rules

- **Mobile-first** — write base styles for mobile, then enhance for larger screens
- Breakpoints (Tailwind defaults):
  - `sm`: 640px (large mobile)
  - `md`: 768px (tablet)
  - `lg`: 1024px (desktop)
  - `xl`: 1280px (large desktop)
- **Test all pages** on: 375px (iPhone SE), 768px (iPad), 1440px (desktop)
- Navigation: **hamburger menu** on mobile, **full nav** on desktop
- Images: Use `<picture>` or Astro `<Image>` for responsive images
- Touch targets: minimum **44x44px** for mobile

---

## ⚡ Performance Rules

- ✅ Use **Astro `<Image>`** component for automatic optimization
- ✅ Lazy load below-the-fold images (`loading="lazy"`)
- ✅ Use **`client:visible`** for animations (not `client:load`)
- ✅ Keep bundle size small — avoid heavy libraries
- ✅ Prefer **CSS animations** over JS when possible
- ✅ Optimize SVGs before adding to `assets/`
- ❌ Don't import entire icon libraries — import individually
- ❌ Don't use large images without optimization

---

## 🧪 Before Submitting Code

Checklist for AI agents:

- [ ] TypeScript strict mode — no errors
- [ ] All components are typed
- [ ] Responsive on mobile & desktop
- [ ] Animations are smooth and performant (60fps)
- [ ] Respects `prefers-reduced-motion`
- [ ] RTL layout works correctly (test both directions)
- [ ] Accessibility: `alt`, `aria-label`, semantic HTML
- [ ] No hardcoded strings (use constants)
- [ ] File structure follows conventions
- [ ] No unused imports or variables
- [ ] Animations use `transform` and `opacity` only
- [ ] Scroll animations use `viewport={{ once: true }}`
- [ ] Hover animations use CSS transitions (not Framer Motion)

---

## 🚀 Commands

```bash
npm run dev        # Start dev server (http://localhost:4321)
npm run build      # Production build
npm run preview    # Preview production build
npx shadcn add <component>  # Add shadcn component
```

---

## 📚 Documentation

- [Astro Docs](https://docs.astro.build)
- [React in Astro](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)

---

## 🤝 Working with AI Agents

When generating code:

1. **Always follow the structure** defined above
2. **Use existing components** from `components/ui/` before creating new ones
3. **Use animation variants** from `lib/animations.ts`
4. **Ask for clarification** if requirements are ambiguous
5. **Explain design decisions** in comments when non-obvious
6. **Test responsiveness** mentally — consider mobile, tablet, desktop
7. **Consider RTL** — test layout in both directions
8. **Performance first** — choose the lightest solution that works
9. **Accessibility always** — respect reduced motion, add aria labels
