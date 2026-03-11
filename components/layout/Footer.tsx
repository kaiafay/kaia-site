import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 shadow-[0_-1px_0_0_rgba(255,255,255,0.04)]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2026 Kaia. All rights reserved.</p>
          <p>
            Built with love{" "}
            <Heart
              size={12}
              fill="currentColor"
              className="inline-block shrink-0 -translate-y-px align-middle text-muted-foreground"
              aria-hidden
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
