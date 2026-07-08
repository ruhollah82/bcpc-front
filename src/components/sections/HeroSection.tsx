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
import { CalendarDays } from "lucide-react";

export function HeroSection() {
  const timeLeft = useCountdown(CONTEST_DATE);

  const timeUnits = [
    { label: "روز", value: timeLeft.days },
    { label: "ساعت", value: timeLeft.hours },
    { label: "دقیقه", value: timeLeft.minutes },
    { label: "ثانیه", value: timeLeft.seconds },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />

      <div className="container mx-auto max-w-5xl text-center">
        <StaggerContainer staggerDelay={0.15}>
          <StaggerItem>
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-sm mb-6">
              <CalendarDays className="size-4 text-primary" />
              <span>برگزاری در آبان ۱۴۰۵</span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              {HERO_TITLE}
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {HERO_SUBTITLE}
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="text-base px-8 h-12">
                {CTA_REGISTER}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 h-12"
              >
                {CTA_ABOUT}
              </Button>
            </div>
          </StaggerItem>

          <StaggerItem>
            <Card className="max-w-2xl mx-auto border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  زمان باقی‌مانده تا شروع مسابقه
                </p>
                <div className="flex items-center justify-center gap-3 md:gap-6">
                  {timeUnits.map((unit) => (
                    <div
                      key={unit.label}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        key={unit.value}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-3xl md:text-5xl font-bold text-primary tabular-nums"
                      >
                        {unit.value.toString().padStart(2, "0")}
                      </motion.div>
                      <div className="text-xs md:text-sm text-muted-foreground mt-1">
                        {unit.label}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
