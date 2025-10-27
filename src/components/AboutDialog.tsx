import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const AboutDialog = ({ open, onOpenChange }: AboutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-5xl font-bold mb-6">ABOUT</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-lg leading-relaxed">
          <p className="text-foreground/80">
            At Giant Cedar, you don't just get content — you gain a new vantage. Our high-altitude aircraft and
            cinematic drones elevate your story above the ordinary, revealing patterns and perspectives invisible from
            the ground. Whether you’re mapping an expedition, documenting a landmark, or crafting a film, we turn your
            vision into imagery that moves people and opens worlds.
          </p>

          <p className="text-foreground/80">
            From the summits of Montana to the coasts of California, our pilots and artists help you see further, tell
            deeper stories, and own the sky. Our licensed and insured fleet operates in the most remote environments —
            from cinematic productions and architectural showcases to wilderness documentation and aerial surveys.
          </p>

          <p className="text-foreground/80">
            Whatever your canvas — feature film, expedition, brand, or property — Giant Cedar delivers altitude,
            artistry, and absolute precision to every vision we lift into the air.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
