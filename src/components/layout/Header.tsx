import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-foreground"
        >
          <span className="text-primary">BCPC</span>
          <span className="hidden sm:inline">دانشگاه بیرجند</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            خانه
          </a>
          <a
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            درباره مسابقه
          </a>
          <a
            href="/gallery"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            گالری
          </a>
          <a
            href="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            تماس با ما
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button size="sm" className="hidden sm:inline-flex">
            ورود / ثبت‌نام
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="منو"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
