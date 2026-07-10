import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCountdown } from "@/hooks/use-countdown";
import {
  HERO_TITLE,
  HERO_SUBTITLE,
  CTA_REGISTER,
  CTA_ABOUT,
  CONTEST_DATE,
} from "@/lib/constants";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { CalendarDays, ArrowLeft, Sparkles, Users } from "lucide-react";
import { HeroCarousel } from "./HeroCarousel";

export function HeroSection() {
  const timeLeft = useCountdown(CONTEST_DATE);
  const timeUnits = [
    { label: "روز", value: timeLeft.days },
    { label: "ساعت", value: timeLeft.hours },
    { label: "دقیقه", value: timeLeft.minutes },
    { label: "ثانیه", value: timeLeft.seconds },
  ];

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden px-4 pt-28 pb-20">
      <HeroCarousel />

      <div className="container mx-auto max-w-6xl relative z-10">
        <StaggerContainer staggerDelay={0.12}>
          {/* Badge */}
          <StaggerItem>
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="liquid-glass-pill inline-flex items-center gap-2 text-sm text-foreground/90"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                <CalendarDays className="size-4 text-primary" />
                <span>برگزاری در آبان ۱۴۰۵</span>
              </motion.div>
            </div>
          </StaggerItem>

          {/* Title */}
          <StaggerItem>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground text-center mb-6 leading-[1.05]">
              <span className="block">
                {HERO_TITLE.split(" ").slice(0, -2).join(" ")}
              </span>
              <span className="block bg-gradient-to-l from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {HERO_TITLE.split(" ").slice(-2).join(" ")}
              </span>
            </h1>
          </StaggerItem>

          {/* Subtitle */}
          <StaggerItem>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-center">
              {HERO_SUBTITLE}
            </p>
          </StaggerItem>

          {/* CTAs */}
          <StaggerItem>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
              <Button
                size="lg"
                className="group text-base px-8 h-12 rounded-full shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all"
              >
                <Sparkles className="size-4 ml-2 group-hover:rotate-12 transition-transform" />
                {CTA_REGISTER}
                <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="liquid-glass text-base px-8 h-12 rounded-full border-0"
              >
                <Users className="size-4 ml-2" />
                {CTA_ABOUT}
              </Button>
            </div>
          </StaggerItem>

          {/* Countdown */}
          <StaggerItem>
            <div className="flex justify-center">
              <div className="liquid-glass-strong max-w-2xl w-full p-6 md:p-8">
                <p className="text-sm text-muted-foreground mb-5 text-center font-medium">
                  زمان باقی‌مانده تا شروع مسابقه
                </p>
                <div className="grid grid-cols-4 gap-2 md:gap-4">
                  {timeUnits.map((unit, i) => (
                    <motion.div
                      key={unit.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="relative flex flex-col items-center p-3 md:p-4 rounded-2xl bg-foreground/5 border border-foreground/10"
                    >
                      <motion.div
                        key={unit.value}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent tabular-nums"
                      >
                        {unit.value.toString().padStart(2, "0")}
                      </motion.div>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-1 font-medium">
                        {unit.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="size-6 rounded-full border-2 border-foreground/30 flex items-start justify-center p-1"
        >
          <div className="size-1 rounded-full bg-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
