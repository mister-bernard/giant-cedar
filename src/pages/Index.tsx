import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { AboutDialog } from "@/components/AboutDialog";
import { ContactDialog } from "@/components/ContactDialog";
import { MissionDialog } from "@/components/MissionDialog";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { GlistenText } from "@/components/GlistenText";
import { Instagram, Send } from "lucide-react";
import heroImage from "@/assets/hero-aerial.jpg";
import logoImage from "@/assets/giant-cedar-logo.png";
import aerial1 from "@/assets/aerial-1.jpg";
import aerial2 from "@/assets/aerial-2.jpg";
import aerial3 from "@/assets/aerial-3.jpg";
import aerial4 from "@/assets/aerial-4.mp4";
import aerial5 from "@/assets/aerial-5.mov";
import aerial6 from "@/assets/aerial-6.jpg";
import aerial7 from "@/assets/aerial-7.jpg";
import youtubeThumbnail from "@/assets/youtube-thumb.png";
const Index = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [missionOpen, setMissionOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const toggleVideoMute = () => {
    if (videoRef.current) {
      const newMutedState = !isVideoMuted;
      videoRef.current.muted = newMutedState;
      setIsVideoMuted(newMutedState);
    }
  };
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Aerial mountain photography" className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </div>

        <div className="relative z-10 text-center px-4 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            
          </div>
          <GlistenText 
            text="GIANT CEDAR"
            className="text-[6rem] md:text-[10rem] font-bold leading-none mb-6 tracking-tighter"
            style={{
              fontFamily: 'Georgia, serif'
            }}
          />
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
        <h2 className="text-6xl md:text-8xl font-bold mb-16 text-center tracking-tighter" style={{
        fontFamily: 'Georgia, serif'
      }}>
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

          <div 
            className="relative overflow-hidden group animate-fade-in" 
            style={{ animationDelay: "0.4s" }}
          >
            <video 
              ref={videoRef}
              src={aerial4} 
              autoPlay 
              loop 
              muted 
              playsInline
              controls
              className="w-full h-[600px] object-cover grayscale"
              aria-label="Aerial photography video"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
            <button
              onClick={toggleVideoMute}
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full p-3 hover:bg-white/30 z-10"
              aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
            >
              {isVideoMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              )}
            </button>
          </div>

          <div className="relative overflow-hidden group animate-fade-in md:col-span-2" style={{
          animationDelay: "0.5s"
        }}>
            <video 
              src={aerial5} 
              autoPlay 
              loop 
              muted 
              playsInline
              controls
              className="w-full h-[600px] object-cover grayscale transition-transform duration-700 group-hover:scale-110"
              aria-label="Aerial photography video 2"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
          </div>

          <div className="relative overflow-hidden group animate-fade-in" style={{
          animationDelay: "0.6s"
        }}>
            <img src={aerial6} alt="Aerial photography from cockpit" className="w-full h-[600px] object-cover grayscale transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          <div className="relative overflow-hidden group animate-fade-in" style={{
          animationDelay: "0.7s"
        }}>
            <img src={aerial7} alt="Red rock formations" className="w-full h-[600px] object-cover grayscale transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          <div className="md:col-span-2 animate-fade-in" style={{
          animationDelay: "0.8s"
        }}>
            <YouTubeEmbed videoId="_xzdPfMlzcc" thumbnail={youtubeThumbnail} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
            {/* Logo and Name */}
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Giant Cedar" className="h-12 w-12 object-contain" />
              <p className="text-2xl font-bold tracking-wider" style={{
                fontFamily: 'Georgia, serif'
              }}>GIANT CEDAR</p>
            </div>

            {/* Tagline */}
            <p className="text-muted-foreground text-center">
              Capturing perspective from above • Idaho & Western US
            </p>
            
            {/* Subscribe Button */}
            <Button 
              size="lg" 
              variant="outline" 
              asChild
              className="bg-white/10 backdrop-blur border-white/20 text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              <a 
                href="mailto:giantcedar@cognitive.ch?subject=Subscribe%20to%20Giant%20Cedar%20Updates&body=Hello%20Giant%20Cedar%20team%2C%0A%0AI%20would%20like%20to%20subscribe%20to%20your%20mailing%20list%20to%20receive%20updates%20about%20aerial%20photography%20services%20and%20news.%0A%0APlease%20add%20my%20email%20address%20to%20your%20subscriber%20list.%20Simply%20reply%20to%20confirm%20my%20subscription.%0A%0AThank%20you!"
              >
                SUBSCRIBE TO UPDATES
              </a>
            </Button>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a 
                href="https://instagram.com/giantcedar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={24} className="text-foreground" />
              </a>
              <a 
                href="https://t.me/giantcedar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                aria-label="Join us on Telegram"
              >
                <Send size={24} className="text-foreground" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Dialogs */}
      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
      <MissionDialog open={missionOpen} onOpenChange={setMissionOpen} />
    </div>;
};
export default Index;