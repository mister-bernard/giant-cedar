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
    const duration = 3000; // 3 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      if (progress < 1) {
        // Set text properties
        ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
        ctx.textBaseline = "top";

        // Create gradient that sweeps across
        const sweepPosition = progress * (canvas.width / window.devicePixelRatio + 200) - 100;
        const gradient = ctx.createLinearGradient(
          sweepPosition - 100,
          0,
          sweepPosition + 100,
          0
        );

        // Cedar green colors from the logo
        gradient.addColorStop(0, "rgba(122, 176, 105, 0)");
        gradient.addColorStop(0.3, "rgba(122, 176, 105, 0.3)");
        gradient.addColorStop(0.5, "rgba(106, 168, 79, 0.8)");
        gradient.addColorStop(0.7, "rgba(122, 176, 105, 0.3)");
        gradient.addColorStop(1, "rgba(122, 176, 105, 0)");

        ctx.fillStyle = gradient;
        ctx.fillText(text, 0, 0);

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
