import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { Phone, X } from "lucide-react";

interface MobileContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MobileContactDialog = ({ open, onOpenChange }: MobileContactDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const telegramMessage = `📬 New Contact Form Submission - Giant Cedar\n\n👤 Name: ${name}\n📧 Email: ${email}\n\n💬 Message:\n${message}`;
    
    try {
      const response = await fetch('https://api.mrb.sh/api/giant-cedar/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: telegramMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Telegram API error:', errorData);
        throw new Error(errorData.description || 'Failed to send message');
      }

      toast.success("Message sent! We'll be in touch soon.");
      setName("");
      setEmail("");
      setMessage("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-in-right">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-3xl font-bold">CONTACT</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-muted rounded-full transition-colors touch-manipulation"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <a 
          href="tel:+12084004111" 
          className="flex items-center gap-2 text-base text-foreground hover:text-primary transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="font-medium">+1 208 400 4111</span>
        </a>
        <p className="text-sm text-muted-foreground mt-1">Call or text anytime</p>
      </div>

      {/* Form */}
      <div className="overflow-y-auto h-[calc(100vh-140px)] px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-5 pb-8">
          <div className="space-y-2">
            <Label htmlFor="mobile-contact-name" className="text-base font-medium">Name</Label>
            <Input 
              id="mobile-contact-name" 
              placeholder="Your name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-muted/50 border-border h-14 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile-contact-email" className="text-base font-medium">Email</Label>
            <Input 
              id="mobile-contact-email" 
              type="email" 
              placeholder="your@email.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-muted/50 border-border h-14 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile-contact-message" className="text-base font-medium">Message</Label>
            <Textarea 
              id="mobile-contact-message" 
              placeholder="Tell us about your project..." 
              required 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-muted/50 border-border min-h-40 text-base resize-none"
            />
          </div>

          <Button type="submit" size="lg" className="w-full text-base h-14 font-semibold">
            SEND MESSAGE
          </Button>
        </form>
      </div>
    </div>
  );
};
