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

    let message = `🚁 New Mission Request - Giant Cedar

📋 Contact Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

📝 Description:
${formData.description}`;

    // Add map area details only if an area was selected
    if (selectedArea) {
      // Create Mapbox Static API URL with polygon overlay
      // Ensure polygon is closed and coordinates are semicolon-separated
      const closedCoords = (() => {
        const first = selectedArea[0];
        const last = selectedArea[selectedArea.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1]) {
          return [...selectedArea, first];
        }
        return selectedArea;
      })();
      
      const mapboxStaticUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/geojson(%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22stroke%22%3A%22%23ff0000%22%2C%22stroke-width%22%3A3%2C%22fill%22%3A%22%23ff0000%22%2C%22fill-opacity%22%3A0.3%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B${closedCoords.map(c => `%5B${c[0]}%2C${c[1]}%5D`).join('%2C')}%5D%5D%7D%7D)/auto/600x400@2x?access_token=pk.eyJ1IjoiYXNkZmZkc2E1NSIsImEiOiJjbWg4N2UxdzEweHZoMndvYTh5enlxNW83In0.hgsVonD6F9foyMQdXbeUFQ`;
      const interactiveUrl = `${window.location.origin}/share-mission?coords=${encodeURIComponent(closedCoords.map(coord => `${coord[0]},${coord[1]}`).join(';'))}`;

      // Format coordinates for easy copying into flight planning apps
      const waypointsList = selectedArea.map((coord, idx) => 
        `WP${idx + 1}: ${coord[1].toFixed(6)}, ${coord[0].toFixed(6)}`
      ).join('\n');
      
      const coordinatesPairs = selectedArea.map(coord => 
        `${coord[1].toFixed(6)},${coord[0].toFixed(6)}`
      ).join('\n');

      message += `

📍 Mission Area Waypoints (Lat, Lon):
${waypointsList}

📋 Copy-Paste Format (one per line):
${coordinatesPairs}

🗺️ Static Map (area highlighted):
${mapboxStaticUrl}

🔗 Interactive Map:
${interactiveUrl}`;
    } else {
      message += `

📍 Mission Area: Not specified`;
    }

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
            Optionally select your target area on the map and provide project details
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
                * All fields required. Map area selection is optional. We'll contact you within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
