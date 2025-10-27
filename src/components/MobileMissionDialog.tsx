import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { X } from "lucide-react";

interface MobileMissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MobileMissionDialog = ({ open, onOpenChange }: MobileMissionDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const message = `🚁 New Mission Request - Giant Cedar

📋 Contact Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

📝 Description:
${formData.description}

📍 Project Location:
${formData.address}`;

    try {
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
      setFormData({ name: "", email: "", phone: "", description: "", address: "" });
      onOpenChange(false);
    } catch (error) {
      console.error('Error sending mission request:', error);
      toast.error("Failed to submit request. Please try again.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-in-right">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">PLAN A MISSION</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-muted rounded-full transition-colors touch-manipulation"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Tell us about your project
        </p>
      </div>

      {/* Form */}
      <div className="overflow-y-auto h-[calc(100vh-80px)] px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-5 pb-8">
          <div className="space-y-2">
            <Label htmlFor="mobile-mission-name" className="text-base font-medium">Name *</Label>
            <Input
              id="mobile-mission-name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-muted/50 border-border h-14 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile-mission-email" className="text-base font-medium">Email *</Label>
            <Input
              id="mobile-mission-email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-muted/50 border-border h-14 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile-mission-phone" className="text-base font-medium">Phone *</Label>
            <Input
              id="mobile-mission-phone"
              type="tel"
              placeholder="(208) 555-0123"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="bg-muted/50 border-border h-14 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile-mission-address" className="text-base font-medium">Project Location *</Label>
            <Input
              id="mobile-mission-address"
              placeholder="e.g., Boise, ID or specific address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              className="bg-muted/50 border-border h-14 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile-mission-description" className="text-base font-medium">Project Description *</Label>
            <Textarea
              id="mobile-mission-description"
              placeholder="Describe your project, timeline, and any specific requirements..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="bg-muted/50 border-border min-h-40 text-base resize-none"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full text-base h-14 font-semibold"
          >
            SUBMIT MISSION REQUEST
          </Button>

          <p className="text-xs text-muted-foreground text-center pt-2">
            * All fields required. We'll contact you within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
};
