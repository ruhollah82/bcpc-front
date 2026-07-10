import { FadeIn } from "@/components/animations/FadeIn";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { HIGHLIGHTS } from "@/lib/constants";
import { Users, Trophy, Network, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

const iconMap = { Users, Trophy, Network };

export function HighlightsSection() {
  return (
    <section className="relative py-24 px-4">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto max-w-6xl">
        <FadeIn direction="up" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 liquid-glass-pill mb-4 text-xs font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            چرا BCPC؟
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            چرا در BCPC شرکت کنیم؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            فرصتی بی‌نظیر برای رشد مهارت‌ها، شبکه‌سازی و تجربه یک رقابت
            هیجان‌انگیز
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <FadeIn key={item.title} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="h-full text-center hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-border/50 group relative overflow-hidden">
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-purple-500/5 transition-all duration-500" />

                    <CardHeader className="relative">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 border border-primary/20"
                      >
                        <Icon className="size-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardDescription className="px-6 pb-6 text-base leading-relaxed relative">
                      {item.description}
                    </CardDescription>
                  </Card>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        {/* CTA row */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mt-16 text-center">
            <a
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              اطلاعات بیشتر درباره مسابقه
              <ArrowLeft className="size-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
