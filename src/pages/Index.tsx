import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AboutDialog } from "@/components/AboutDialog";
import { ContactDialog } from "@/components/ContactDialog";
import { MissionDialog } from "@/components/MissionDialog";
import heroImage from "@/assets/hero-aerial.jpg";
import aerial1 from "@/assets/aerial-1.jpg";
import aerial2 from "@/assets/aerial-2.jpg";
import aerial3 from "@/assets/aerial-3.jpg";
import aerial4 from "@/assets/aerial-4.jpg";
const Index = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [missionOpen, setMissionOpen] = useState(false);
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Aerial mountain photography" className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </div>

        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-[6rem] md:text-[10rem] font-bold leading-none mb-6 tracking-tighter">
            GIANT CEDAR
          </h1>
          <p className="text-2xl md:text-3xl font-light tracking-wider text-white/90 mb-12">
            AERIAL PHOTOGRAPHY & MISSION PLANNING
          </p>
          <p className="text-lg md:text-xl font-light tracking-wide text-white/80 mb-12">Based in Idaho • Serving the Western 12 States</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="outline" onClick={() => setAboutOpen(true)} className="text-lg h-14 px-8 bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
              ABOUT
            </Button>
            <Button size="lg" onClick={() => setMissionOpen(true)} className="text-lg h-14 px-8 bg-white text-black hover:bg-white/90 transition-all duration-300">
              PLAN A MISSION
            </Button>
            <Button size="lg" variant="outline" onClick={() => setContactOpen(true)} className="text-lg h-14 px-8 bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
              CONTACT
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-6xl md:text-8xl font-bold mb-16 text-center tracking-tighter">
          PORTFOLIO
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
          <div className="relative overflow-hidden group animate-fade-in" style={{
          animationDelay: "0.1s"
        }}>
            <img src={aerial1} alt="Aerial photography 1" className="w-full h-[600px] object-cover grayscale transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          <div className="relative overflow-hidden group animate-fade-in" style={{
          animationDelay: "0.2s"
        }}>
            <img src={aerial2} alt="Aerial photography 2" className="w-full h-[600px] object-cover grayscale transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          <div className="relative overflow-hidden group animate-fade-in" style={{
          animationDelay: "0.3s"
        }}>
            <img src={aerial3} alt="Aerial photography 3" className="w-full h-[600px] object-cover grayscale transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          <div className="relative overflow-hidden group animate-fade-in" style={{
          animationDelay: "0.4s"
        }}>
            <img src={aerial4} alt="Aerial photography 4" className="w-full h-[600px] object-cover grayscale transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold tracking-wider mb-2">GIANT CEDAR</p>
          <p className="text-muted-foreground">Capturing perspective from above • Idaho & Western US</p>
        </div>
      </footer>

      {/* Dialogs */}
      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
      <MissionDialog open={missionOpen} onOpenChange={setMissionOpen} />
    </div>;
};
export default Index;