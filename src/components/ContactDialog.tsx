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
    
    // Send via email (mailto)
    const emailSubject = `Contact from ${name}`;
    const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    window.open(`mailto:contact@giantcedar.com?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`, '_blank');
    
    // Send via Telegram
    const telegramBotToken = "7869780637:AAHbTWMvAE_P3mLQlxk1-KqtvIlgP4i_GNM";
    const telegramChatId = "7435932804";
    const telegramMessage = `🔔 New Contact Form Submission\n\n👤 Name: ${name}\n📧 Email: ${email}\n\n💬 Message:\n${message}`;
    
    try {
      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: telegramMessage,
        }),
      });
      toast.success("Message sent via email and Telegram!");
    } catch (error) {
      console.error("Telegram send error:", error);
      toast.success("Message sent via email!");
    }
    
    setName("");
    setEmail("");
    setMessage("");
    onOpenChange(false);
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
