import { FadeIn } from "@/components/animations/FadeIn";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { HIGHLIGHTS } from "@/lib/constants";
import { Users, Trophy, Network } from "lucide-react";

const iconMap = { Users, Trophy, Network };

export function HighlightsSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <FadeIn direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
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
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300 border-border/50">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardDescription className="px-6 pb-6 text-base leading-relaxed">
                    {item.description}
                  </CardDescription>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
