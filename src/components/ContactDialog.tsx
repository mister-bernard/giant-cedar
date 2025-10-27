import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const telegramMessage = `📬 New Contact Form Submission - Giant Cedar\n\n👤 Name: ${name}\n📧 Email: ${email}\n\n💬 Message:\n${message}`;
    
    try {
      const response = await fetch(`https://api.telegram.org/bot8328499499:AAHFx5uL6rpX8foimTO54-IuRpz0Yx8Ur3w/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '39172309',
          text: telegramMessage,
        }),
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-5xl font-bold mb-6">CONTACT</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg">Name</Label>
            <Input 
              id="name" 
              placeholder="Your name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-muted/50 border-border h-12 text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your@email.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-muted/50 border-border h-12 text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-lg">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Tell us about your project..." 
              required 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-muted/50 border-border min-h-32 text-lg resize-none"
            />
          </div>
          <Button type="submit" size="lg" className="w-full text-lg h-14">
            SEND MESSAGE
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
