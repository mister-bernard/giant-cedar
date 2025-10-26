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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedArea) {
      toast.error("Please select an area on the map");
      return;
    }

    // Create Mapbox Static API URL with polygon overlay
    // selectedArea is an array of [lng, lat] pairs
    const coordinates = selectedArea.map(coord => `${coord[0]},${coord[1]}`).join(',');
    const center = selectedArea[0]; // Use first coordinate as center
    // path format: strokeWidth+strokeColor-strokeOpacity+fillColor-fillOpacity
    const mapboxStaticUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/path-3+ff0000-1+ff0000-0.4(${coordinates})/${center[0]},${center[1]},13,0/600x400@2x?access_token=pk.eyJ1IjoiYXNkZmZkc2E1NSIsImEiOiJjbWg4N2UxdzEweHZoMndvYTh5enlxNW83In0.hgsVonD6F9foyMQdXbeUFQ`;

    const message = `🚁 New Mission Request - Giant Cedar

📋 Contact Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

📝 Description:
${formData.description}

📍 Mission Area Coordinates:
${JSON.stringify(selectedArea, null, 2)}

🗺️ View on Map:
${mapboxStaticUrl}`;

    try {
      // Send to Telegram
      const response = await fetch(`https://api.telegram.org/bot8328499499:AAHFx5uL6rpX8foimTO54-IuRpz0Yx8Ur3w/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '39172309',
          text: message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Telegram API error:', errorData);
        throw new Error(errorData.description || 'Failed to send message');
      }

      toast.success("Mission request submitted! We'll contact you soon.");
      
      // Reset form
      setFormData({ name: "", email: "", phone: "", description: "" });
      setSelectedArea(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Error sending mission request:', error);
      toast.error("Failed to submit request. Please try again.");
    }
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
