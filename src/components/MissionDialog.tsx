import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MissionMap } from "./MissionMap";

interface MissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MissionDialog = ({ open, onOpenChange }: MissionDialogProps) => {
  const [selectedArea, setSelectedArea] = useState<number[][] | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedArea) {
      toast.error("Please select an area on the map");
      return;
    }

    // Here you would typically send this to a backend
    console.log("Mission Request:", {
      ...formData,
      selectedArea,
    });

    toast.success("Mission request submitted! We'll contact you soon.");
    
    // Reset form
    setFormData({ name: "", email: "", phone: "", description: "" });
    setSelectedArea(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl h-[90vh] bg-background border-border p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="text-4xl font-bold">PLAN A MISSION</DialogTitle>
          <p className="text-lg text-muted-foreground mt-2">
            Select your target area on the map and provide project details
          </p>
        </DialogHeader>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Map Section */}
          <div className="flex-1 relative">
            <MissionMap onAreaSelect={setSelectedArea} />
          </div>

          {/* Form Section */}
          <div className="w-96 p-6 border-l border-border overflow-y-auto bg-background/50 backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mission-name" className="text-base">Name *</Label>
                <Input
                  id="mission-name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-muted/50 border-border h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mission-email" className="text-base">Email *</Label>
                <Input
                  id="mission-email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-muted/50 border-border h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mission-phone" className="text-base">Phone *</Label>
                <Input
                  id="mission-phone"
                  type="tel"
                  placeholder="(208) 555-0123"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-muted/50 border-border h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mission-description" className="text-base">Project Description *</Label>
                <Textarea
                  id="mission-description"
                  placeholder="Describe your project, timeline, and any specific requirements..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="bg-muted/50 border-border min-h-32 resize-none"
                />
              </div>

              {selectedArea && (
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium text-primary">
                    ✓ Area selected on map
                  </p>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full text-base h-12"
              >
                SUBMIT MISSION REQUEST
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                * All fields required. We'll contact you within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
