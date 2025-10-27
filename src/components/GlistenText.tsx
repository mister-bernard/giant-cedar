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
    let time = 0;

    const animate = () => {
      time += 0.008; // Slower, gentler animation speed
      
      // Clear canvas with soft fade
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      // Set text properties
      ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
      ctx.textBaseline = "top";

      const canvasWidth = canvas.width / window.devicePixelRatio;
      const canvasHeight = canvas.height / window.devicePixelRatio;

      // Create a soft, breathing wave effect
      const wave1 = Math.sin(time) * 0.5 + 0.5;
      const wave2 = Math.sin(time * 0.7 + 1) * 0.5 + 0.5;
      const wave3 = Math.sin(time * 0.5 + 2) * 0.5 + 0.5;

      // Soft pastel glow - main layer
      const gradient1 = ctx.createLinearGradient(
        -canvasWidth * 0.2 + wave1 * canvasWidth * 1.4,
        0,
        canvasWidth * 0.2 + wave1 * canvasWidth * 1.4,
        canvasHeight
      );
      
      gradient1.addColorStop(0, `rgba(255, 255, 255, ${0.15 * wave1})`);
      gradient1.addColorStop(0.3, `rgba(220, 230, 255, ${0.25 * wave1})`);
      gradient1.addColorStop(0.5, `rgba(200, 220, 255, ${0.35 * wave1})`);
      gradient1.addColorStop(0.7, `rgba(220, 230, 255, ${0.25 * wave1})`);
      gradient1.addColorStop(1, `rgba(255, 255, 255, ${0.15 * wave1})`);

      ctx.fillStyle = gradient1;
      ctx.fillText(text, 0, 0);

      // Soft pearl shimmer - second layer
      const gradient2 = ctx.createRadialGradient(
        canvasWidth * (0.3 + wave2 * 0.4),
        canvasHeight * 0.5,
        0,
        canvasWidth * (0.3 + wave2 * 0.4),
        canvasHeight * 0.5,
        canvasWidth * 0.6
      );
      
      gradient2.addColorStop(0, `rgba(255, 250, 245, ${0.3 * wave2})`);
      gradient2.addColorStop(0.4, `rgba(255, 240, 245, ${0.2 * wave2})`);
      gradient2.addColorStop(0.7, `rgba(245, 245, 255, ${0.1 * wave2})`);
      gradient2.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = gradient2;
      ctx.fillText(text, 0, 0);

      // Ethereal glow - third layer
      const gradient3 = ctx.createLinearGradient(
        wave3 * canvasWidth * 0.5,
        0,
        canvasWidth * 0.5 + wave3 * canvasWidth * 0.5,
        canvasHeight
      );
      
      gradient3.addColorStop(0, "rgba(255, 255, 255, 0)");
      gradient3.addColorStop(0.4, `rgba(240, 245, 255, ${0.15 * wave3})`);
      gradient3.addColorStop(0.6, `rgba(255, 250, 250, ${0.2 * wave3})`);
      gradient3.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = gradient3;
      ctx.fillText(text, 0, 0);

      ctx.globalCompositeOperation = "source-over";

      animationFrame = requestAnimationFrame(animate);
    };

    // Start animation
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
