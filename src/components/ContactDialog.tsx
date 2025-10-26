import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Message sent! We'll be in touch soon.");
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
              className="bg-muted/50 border-border h-12 text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-lg">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Tell us about your project..." 
              required 
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
