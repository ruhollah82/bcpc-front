import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Menu, X, CalendarDays, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "درباره مسابقه" },
  { href: "/gallery", label: "گالری" },
  { href: "/contact", label: "تماس با ما" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePath, setActivePath] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (y / docHeight) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-[60] origin-right bg-gradient-to-l from-primary via-purple-500 to-pink-500"
        style={{ scaleX: scrollProgress / 100 }}
        aria-hidden="true"
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "py-3" : "py-5",
        )}
      >
        <div
          className={cn(
            "container mx-auto px-4 transition-all duration-500",
            isScrolled ? "max-w-5xl" : "max-w-7xl",
          )}
        >
          <div
            className={cn(
              "liquid-glass-strong flex items-center justify-between transition-all duration-500",
              isScrolled ? "px-4 py-2" : "px-6 py-3",
            )}
          >
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group relative">
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-500 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Logo box */}
                <div className="relative size-10 rounded-xl bg-gradient-to-br from-primary via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-primary/50 transition-shadow">
                  <span className="text-lg font-black text-white">B</span>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-black text-base text-foreground leading-tight tracking-tight">
                  BCPC
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight font-medium">
                  دانشگاه بیرجند
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center">
              <div className=" flex items-center gap-1 px-2 py-1.5">
                {navLinks.map((link) => {
                  const isActive = activePath === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300",
                        isActive
                          ? "text-primary-foreground"
                          : "text-foreground/70 hover:text-foreground",
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-pill"
                          className="absolute inset-0 bg-gradient-to-l from-primary to-primary/80 rounded-full shadow-lg shadow-primary/30"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              <Button
                size="sm"
                className="hidden sm:inline-flex rounded-full px-5 bg-gradient-to-l from-primary to-primary/80 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles className="size-4 ml-1.5" />
                ثبت‌نام
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full liquid-glass-subtle"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="منو"
                aria-expanded={isMobileOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="size-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="size-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.35,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="fixed inset-x-4 top-24 z-40 liquid-glass-strong p-5 md:hidden"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = activePath === link.href;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground",
                      )}
                    >
                      {isActive && (
                        <span className="size-1.5 rounded-full bg-primary" />
                      )}
                      <span>{link.label}</span>
                    </motion.a>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="pt-3 mt-2 border-t border-border/50"
                >
                  <Button className="w-full rounded-full bg-gradient-to-l from-primary to-primary/80 shadow-lg shadow-primary/30">
                    <CalendarDays className="size-4 ml-2" />
                    ثبت‌نام در مسابقه
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
