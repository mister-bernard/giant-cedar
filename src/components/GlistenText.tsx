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
    const duration = 4000; // 4 seconds for smoother effect

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      if (progress < 1) {
        // Set text properties
        ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
        ctx.textBaseline = "top";

        // Smooth easing function for more fluid animation
        const easeProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        // Create multiple overlapping gradients for richer effect
        const canvasWidth = canvas.width / window.devicePixelRatio;
        const sweepPosition = easeProgress * (canvasWidth + 400) - 200;
        
        // Main glisten gradient
        const gradient1 = ctx.createLinearGradient(
          sweepPosition - 200,
          0,
          sweepPosition + 200,
          0
        );
        
        gradient1.addColorStop(0, "rgba(106, 168, 79, 0)");
        gradient1.addColorStop(0.25, "rgba(122, 176, 105, 0.2)");
        gradient1.addColorStop(0.4, "rgba(139, 195, 74, 0.6)");
        gradient1.addColorStop(0.5, "rgba(156, 204, 101, 0.9)");
        gradient1.addColorStop(0.6, "rgba(139, 195, 74, 0.6)");
        gradient1.addColorStop(0.75, "rgba(122, 176, 105, 0.2)");
        gradient1.addColorStop(1, "rgba(106, 168, 79, 0)");

        ctx.fillStyle = gradient1;
        ctx.fillText(text, 0, 0);

        // Secondary shimmer layer
        const gradient2 = ctx.createLinearGradient(
          sweepPosition - 100,
          0,
          sweepPosition + 100,
          0
        );
        
        gradient2.addColorStop(0, "rgba(200, 230, 201, 0)");
        gradient2.addColorStop(0.4, "rgba(200, 230, 201, 0.3)");
        gradient2.addColorStop(0.5, "rgba(220, 237, 200, 0.5)");
        gradient2.addColorStop(0.6, "rgba(200, 230, 201, 0.3)");
        gradient2.addColorStop(1, "rgba(200, 230, 201, 0)");

        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = gradient2;
        ctx.fillText(text, 0, 0);
        ctx.globalCompositeOperation = "source-over";

        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Start animation after a brief delay
    const timeout = setTimeout(() => {
      animate();
    }, 100);

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
