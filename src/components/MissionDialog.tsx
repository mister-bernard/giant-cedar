import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MissionMap } from "./MissionMap";

interface MissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MissionDialog = ({ open, onOpenChange }: MissionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[85vh] bg-background border-border p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-5xl font-bold">PLAN A MISSION</DialogTitle>
          <p className="text-lg text-muted-foreground mt-2">
            Select your target area on the map or enter an address
          </p>
        </DialogHeader>
        <div className="flex-1 h-full">
          <MissionMap />
        </div>
      </DialogContent>
    </Dialog>
  );
};
