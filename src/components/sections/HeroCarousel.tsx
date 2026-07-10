import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Slide {
  id: number;
  gradient: string;
  accent: string;
}

const slides: Slide[] = [
  {
    id: 1,
    gradient: "from-primary/40 via-purple-500/30 to-pink-500/20",
    accent: "bg-primary",
  },
  {
    id: 2,
    gradient: "from-blue-500/40 via-cyan-500/30 to-teal-500/20",
    accent: "bg-blue-500",
  },
  {
    id: 3,
    gradient: "from-orange-500/40 via-rose-500/30 to-fuchsia-500/20",
    accent: "bg-orange-500",
  },
  {
    id: 4,
    gradient: "from-emerald-500/40 via-sky-500/30 to-indigo-500/20",
    accent: "bg-emerald-500",
  },
];

const SLIDE_DURATION = 5000;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated gradient slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[current].gradient}`}
        />
      </AnimatePresence>

      {/* Floating orbs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 size-72 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/4 size-96 rounded-full bg-purple-500/20 blur-3xl"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(i)}
            aria-label={`اسلاید ${i + 1}`}
            className="relative h-1.5 overflow-hidden rounded-full bg-foreground/10 transition-all"
            style={{ width: current === i ? "32px" : "8px" }}
          >
            {current === i && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                className={`absolute inset-0 ${slide.accent}`}
                key={current}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
