import { useEffect, useRef } from "react";

interface GlistenTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const GlistenText = ({ text, className = "", style }: GlistenTextProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const textElement = textRef.current;
    if (!canvas || !textElement) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Set canvas size to match text element
    const updateCanvasSize = () => {
      const rect = textElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateCanvasSize();

    const style = window.getComputedStyle(textElement);
    const fontSize = style.fontSize;
    const fontFamily = style.fontFamily;
    const fontWeight = style.fontWeight;

    let animationFrame: number;
    let startTime = Date.now();
    const duration = 1200; // Fast animation - 1.2 seconds total

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      if (progress < 1) {
        // Set text properties
        ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
        ctx.textBaseline = "top";

        // Natural easing - quick in, quick out like a flash of light through leaves
        const easeProgress = progress < 0.5 
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const canvasWidth = canvas.width / window.devicePixelRatio;
        const sweepPosition = easeProgress * (canvasWidth + 300) - 150;
        
        // Main green glisten - natural forest green
        const gradient1 = ctx.createLinearGradient(
          sweepPosition - 150,
          0,
          sweepPosition + 150,
          0
        );
        
        // Giant Cedar brand green colors
        gradient1.addColorStop(0, "rgba(106, 168, 79, 0)");
        gradient1.addColorStop(0.2, "rgba(139, 195, 74, 0.3)");
        gradient1.addColorStop(0.4, "rgba(156, 204, 101, 0.7)");
        gradient1.addColorStop(0.5, "rgba(174, 213, 129, 1)");
        gradient1.addColorStop(0.6, "rgba(156, 204, 101, 0.7)");
        gradient1.addColorStop(0.8, "rgba(139, 195, 74, 0.3)");
        gradient1.addColorStop(1, "rgba(106, 168, 79, 0)");

        ctx.fillStyle = gradient1;
        ctx.fillText(text, 0, 0);

        // Bright highlight layer - like sunlight through trees
        const gradient2 = ctx.createLinearGradient(
          sweepPosition - 80,
          0,
          sweepPosition + 80,
          0
        );
        
        gradient2.addColorStop(0, "rgba(200, 230, 201, 0)");
        gradient2.addColorStop(0.35, "rgba(220, 237, 200, 0.4)");
        gradient2.addColorStop(0.5, "rgba(240, 245, 220, 0.6)");
        gradient2.addColorStop(0.65, "rgba(220, 237, 200, 0.4)");
        gradient2.addColorStop(1, "rgba(200, 230, 201, 0)");

        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = gradient2;
        ctx.fillText(text, 0, 0);
        ctx.globalCompositeOperation = "source-over";

        animationFrame = requestAnimationFrame(animate);
      } else {
        // Animation complete - stop
        ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      }
    };

    // Start animation after a brief delay
    const timeout = setTimeout(() => {
      animate();
    }, 300);

    // Cleanup
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, [text]);

  return (
    <div className="relative inline-block">
      <h1 ref={textRef} className={className} style={style}>
        {text}
      </h1>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
};
