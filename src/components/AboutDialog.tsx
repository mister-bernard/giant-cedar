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
            We are APEX — a collective of aerial photographers and drone pilots pushing the boundaries 
            of perspective. From the highest peaks to the deepest valleys, we capture the world from 
            angles previously impossible.
          </p>
          <p className="text-foreground/80">
            Our work combines technical precision with artistic vision, creating images that reveal 
            the hidden geometry and raw beauty of natural landscapes. Every flight is a mission to 
            discover something new.
          </p>
          <p className="text-foreground/80">
            Based in the heart of the Alps, we specialize in high-altitude aerial photography, 
            expedition documentation, and custom drone cinematography for brands that demand excellence.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
