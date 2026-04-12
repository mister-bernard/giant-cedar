import { X } from "lucide-react";

interface MobileAboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MobileAboutDialog = ({ open, onOpenChange }: MobileAboutDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-in-right">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">ABOUT</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-muted rounded-full transition-colors touch-manipulation"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-[calc(100vh-72px)] px-6 py-8">
        <div className="space-y-6 text-base leading-relaxed pb-8">
          <p className="text-foreground/90">
            At Giant Cedar, you don't just get content — you gain a new vantage. Our high-altitude aircraft and
            cinematic drones elevate your story above the ordinary, revealing patterns and perspectives invisible from
            the ground. Whether you're mapping an expedition, documenting a landmark, or crafting a film, we turn your
            vision into imagery that moves people and opens worlds.
          </p>

          <p className="text-foreground/90">
            From the summits of Montana to the coasts of California, our pilots and artists help you see further, tell
            deeper stories, and own the sky. Our licensed and insured fleet operates in the most remote environments —
            from cinematic productions and architectural showcases to wilderness documentation and aerial surveys.
          </p>

          <p className="text-foreground/90">
            Whatever your canvas — feature film, expedition, brand, or property — Giant Cedar delivers altitude,
            artistry, and absolute precision to every vision we lift into the air.
          </p>
        </div>
      </div>
    </div>
  );
};
