<div align="center">

# 🏆 BCPC Frontend

### Birjand Competitive Programming Contest

**Branch of [ICPC](https://icpc.global/) at the University of Birjand**

[![Astro](https://img.shields.io/badge/Astro-7.0-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-base--nova-000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com)
[![Node](https://img.shields.io/badge/Node-%3E%3D22.12-339933?logo=node.js&logoColor=white)](https://nodejs.org)

[🌐 Live Demo](#) · [📖 Documentation](./AGENTS.md) · [🐛 Report Bug](#) · [✨ Request Feature](#)

</div>

---

## 📖 About The Project

**BCPC** (Birjand Competitive Programming Contest) is the official website for the University of Birjand's branch of the International Collegiate Programming Contest (ICPC). This project serves as the frontend platform for contestants, organizers, and the programming community.

### 🎯 Features

- 🏠 **Landing Page** — Engaging hero section with smooth animations and contest highlights
- 📝 **Registration** — Multi-step registration form for participants
- 🖼️ **Gallery** — Photo archive from previous years' contests
- 💻 **Online Contest Portal** — Secure login and entry for live contests
- 📞 **Contact Page** — Communication channels with organizers
- 🌙 **Dark/Light Mode** — Theme switching with persistent preference
- 📱 **Fully Responsive** — Mobile-first design optimized for all devices
- 🇮🇷 **RTL Support** — Native Persian language support with proper RTL layout
- ⚡ **Blazing Fast** — Static-first with Astro, interactive where needed with React

---

## 🛠️ Tech Stack

| Category              | Technology                                           | Version                |
| --------------------- | ---------------------------------------------------- | ---------------------- |
| **Framework**         | [Astro](https://astro.build)                         | `^7.0.0`               |
| **UI Library**        | [React](https://react.dev)                           | `^19.2.7`              |
| **Styling**           | [Tailwind CSS](https://tailwindcss.com)              | `^4.3.2` (Vite plugin) |
| **Component Library** | [shadcn/ui](https://ui.shadcn.com)                   | `^4.13.0` (base-nova)  |
| **Animations**        | [Motion](https://motion.dev)                         | `^12.42.2`             |
| **Icons**             | [Lucide React](https://lucide.dev)                   | `^1.23.0`              |
| **Fonts**             | [Geist](https://vercel.com/font)                     | `^5.2.9`               |
| **Language**          | [TypeScript](https://www.typescriptlang.org)         | Strict mode            |
| **Utilities**         | `clsx`, `tailwind-merge`, `class-variance-authority` | —                      |

> [!NOTE]
> This project uses **shadcn/ui with base-ui** (not Radix) and **Tailwind CSS v4** with the new Vite plugin.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** `>= 22.12.0` — [Download](https://nodejs.org)
- **npm** `>= 10` (comes with Node.js)
- **Git** — [Download](https://git-scm.com)

Verify your installation:

```bash
node --version   # Should be v22.12.0 or higher
npm --version
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bcpc-frontend.git
cd bcpc-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The site will be available at **http://localhost:4321**

> 💡 **Tip:** For background mode (useful when working with AI agents):
>
> ```bash
> npm run dev -- --background
> ```
>
> Manage with: `astro dev stop`, `astro dev status`, `astro dev logs`

---

## 📦 Available Scripts

| Command                      | Description                                |
| ---------------------------- | ------------------------------------------ |
| `npm run dev`                | Start local dev server at `localhost:4321` |
| `npm run build`              | Build for production to `./dist/`          |
| `npm run preview`            | Preview production build locally           |
| `npm run astro check`        | Type-check Astro files                     |
| `npx shadcn add <component>` | Add a shadcn/ui component                  |

---

## 📁 Project Structure

```
bcpc-frontend/
├── public/                  # Static assets (served as-is)
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── assets/              # Images, SVGs, fonts
│   │   ├── images/          # Photos (gallery, hero, sponsors)
│   │   └── icons/           # Custom SVG icons
│   ├── components/
│   │   ├── ui/              # shadcn/ui primitives (DO NOT edit manually)
│   │   ├── sections/        # Landing page sections (Hero, About, etc.)
│   │   ├── layout/          # Header, Footer, Navbar
│   │   ├── animations/      # Reusable animation components
│   │   └── shared/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── layouts/             # Astro layouts (BaseLayout, AuthLayout)
│   ├── lib/                 # Utilities & helpers
│   │   ├── utils.ts         # cn() helper
│   │   ├── constants.ts     # Site-wide constants
│   │   └── animations.ts    # Animation variants
│   ├── pages/               # File-based routing
│   │   ├── index.astro      # Landing page
│   │   ├── about.astro      # About the contest
│   │   ├── gallery.astro    # Photo gallery
│   │   ├── register.astro   # Registration
│   │   ├── contact.astro    # Contact us
│   │   └── login.astro      # Contest entry
│   └── styles/
│       ├── global.css       # Tailwind + theme variables
│       └── animations.css   # Custom keyframes
├── AGENTS.md                # AI agent guidelines
├── astro.config.mjs         # Astro configuration
├── components.json          # shadcn/ui configuration
├── package.json
└── tsconfig.json
```

> 📌 **Important:** Never edit files in `components/ui/` directly. Use `npx shadcn add <component>` instead.

---

## 🎨 Code Conventions

This project follows strict conventions defined in [`AGENTS.md`](./AGENTS.md). Key points:

### Component Structure

```tsx
// ✅ Named exports, typed props, semantic HTML
interface HeroSectionProps {
  title: string;
  subtitle?: string;
}

export function HeroSection({ title, subtitle }: HeroSectionProps) {
  return <section>...</section>;
}
```

### Styling

- Always use **Tailwind utility classes** (no inline styles)
- Use `cn()` helper for conditional classes: `cn("base", condition && "active")`
- Use **CSS variables** for theming (defined in `global.css`)

### Animations

- Use **Framer Motion** for React components
- Use **CSS transitions** for simple hover effects
- Respect `prefers-reduced-motion` for accessibility
- Use `client:visible` for scroll-triggered animations (performance)

### File Naming

- Components: `PascalCase.tsx` (e.g., `HeroSection.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `use-countdown.ts`)
- Pages: `kebab-case.astro` (e.g., `about.astro`)

---

## 🌐 Internationalization (i18n)

The primary language is **Persian (fa)** with RTL layout:

```html
<html lang="fa" dir="rtl"></html>
```

- All user-facing text should be in Persian
- Use `lib/constants.ts` for translatable strings
- Test layouts in both RTL and LTR directions
- Use `rtl:` and `ltr:` Tailwind variants when needed

---

## 📱 Responsive Design

Mobile-first approach with these breakpoints:

| Breakpoint | Width  | Device        |
| ---------- | ------ | ------------- |
| `sm`       | 640px  | Large mobile  |
| `md`       | 768px  | Tablet        |
| `lg`       | 1024px | Desktop       |
| `xl`       | 1280px | Large desktop |

**Test on:** 375px (iPhone SE), 768px (iPad), 1440px (Desktop)

---

## 🧪 Before Committing

Use this checklist:

- [ ] TypeScript strict mode — no errors
- [ ] All components are typed
- [ ] Responsive on mobile & desktop
- [ ] Animations are smooth (60fps)
- [ ] Respects `prefers-reduced-motion`
- [ ] RTL layout works correctly
- [ ] Accessibility: `alt`, `aria-label`, semantic HTML
- [ ] No hardcoded strings (use constants)
- [ ] No unused imports or variables

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Vercel will auto-detect Astro and deploy

### Deploy to Netlify

1. Create a `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

2. Connect your repository in [Netlify](https://netlify.com)

### Deploy to GitHub Pages

Add to `astro.config.mjs`:

```js
export default defineConfig({
  site: "https://your-username.github.io",
  base: "/bcpc-frontend",
  output: "static",
});
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please read [`AGENTS.md`](./AGENTS.md) for coding standards before contributing.

### Reporting Issues

Found a bug? Please open an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser and device information

---

## 👥 Team

**BCPC Development Team** — University of Birjand

- 💻 **Frontend Development** — [Your Name](#)
- 🎨 **UI/UX Design** — [Designer Name](#)
- 📋 **Project Management** — [Manager Name](#)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- [ICPC](https://icpc.global/) — International Collegiate Programming Contest
- [University of Birjand](https://birjand.ac.ir/) — Host institution
- [Astro](https://astro.build) — Amazing static site generator
- [shadcn/ui](https://ui.shadcn.com) — Beautiful component library
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS framework
- [Vazirmatn Font](https://github.com/rastikerdar/vazirmatn) — Persian font

---

## 📞 Contact

**BCPC Organizing Committee**  
University of Birjand, Iran

- 💬 Telegram: `t.me/SSOSC`

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star!**

Made with ❤️ by the BCPC Team

</div>
