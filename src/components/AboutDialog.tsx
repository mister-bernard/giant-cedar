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
          <DialogTitle className="text-5xl font-bold mb-6">OUR WORK</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-lg leading-relaxed">
          <p className="text-foreground/80">
            We are Giant Cedar — a premier aerial photography and drone operation pushing the boundaries of perspective.
            We employ a fleet of light airplanes and cinematic drones as well as FPV drones, enabling missions just
            about anywhere.
          </p>
          <p className="text-foreground/80">
            Our work combines technical precision with artistic vision, creating images that reveal the hidden geometry
            and raw beauty of natural landscapes. Each flight reveals an untold story. It's all about the people!
          </p>
          <p className="text-foreground/80">
            Based in Idaho, we specialize in high-altitude aerial photography, expedition documentation, and custom
            drone cinematography serving clients across the Western 12 states: Idaho, Montana, Wyoming, Washington,
            Oregon, California, Nevada, Utah, Colorado, Arizona, New Mexico, and Alaska.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
