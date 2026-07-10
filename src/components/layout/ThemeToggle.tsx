import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "تغییر به حالت روشن" : "تغییر به حالت تاریک"}
      className={cn(
        "relative size-10 rounded-full",
        "liquid-glass flex items-center justify-center",
        "hover:scale-105 active:scale-95 transition-transform",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      {/* Background glow */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full blur-md opacity-50 -z-10",
          isDark ? "bg-indigo-500/40" : "bg-amber-400/40",
        )}
        animate={{ scale: isDark ? 1.1 : 1 }}
        transition={{ duration: 0.4 }}
      />

      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-foreground"
          >
            <Moon className="size-[18px]" strokeWidth={2.25} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-foreground"
          >
            <Sun className="size-[18px]" strokeWidth={2.25} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
