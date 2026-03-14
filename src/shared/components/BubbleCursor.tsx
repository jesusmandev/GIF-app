import { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
  hue: number;
}

export const BubbleCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const mouseRef = useRef({ x: -100, y: -100, isMoving: false, lastSpawnTime: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let resizeTimer: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const now = performance.now();
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      mouseRef.current.isMoving = true;

      // Spawn bubbles based on movement speed
      if (now - mouseRef.current.lastSpawnTime > 30) {
        spawnBubble(x, y);
        mouseRef.current.lastSpawnTime = now;
      }
    };

    const spawnBubble = (x: number, y: number) => {
      // Use pure neo-blue (215) and cyan (195) to match tactical lighting
      const hues = [215, 195, 210];
      const hue = hues[Math.floor(Math.random() * hues.length)];

      bubblesRef.current.push({
        x: x + (Math.random() - 0.5) * 20, // Slight random offset
        y: y + (Math.random() - 0.5) * 20,
        size: Math.random() * 4 + 2, // 2px to 6px
        life: 0,
        maxLife: Math.random() * 60 + 60, // 60-120 frames (1-2 seconds)
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5, // Slight upward drift
        hue,
      });

      // Keep array size manageable for performance
      if (bubblesRef.current.length > 50) {
        bubblesRef.current.shift();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < bubblesRef.current.length; i++) {
        const b = bubblesRef.current[i];
        
        // Physics
        b.x += b.vx;
        b.y += b.vy;
        b.size += 0.05; // Bubbles grow slowly
        b.life++;

        // Render
        const progress = b.life / b.maxLife;
        // Fade in quickly, then fade out slowly
        const opacity = progress < 0.2 ? progress / 0.2 : 1 - ((progress - 0.2) / 0.8);
        
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        
        // Creating a glass-like bubble with radial gradient
        const gradient = ctx.createRadialGradient(
          b.x - b.size * 0.3, b.y - b.size * 0.3, 0,
          b.x, b.y, b.size
        );
        gradient.addColorStop(0, `hsla(${b.hue}, 80%, 80%, ${opacity * 0.8})`);
        gradient.addColorStop(0.5, `hsla(${b.hue}, 70%, 50%, ${opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${b.hue}, 40%, 20%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Optional subtle stroke for more pop
        ctx.strokeStyle = `hsla(${b.hue}, 100%, 70%, ${opacity * 0.2})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Remove dead bubbles
      bubblesRef.current = bubblesRef.current.filter((b) => b.life < b.maxLife);

      animFrame = requestAnimationFrame(render);
    };

    // Initialize
    resize();
    render();

    // Event listeners
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 100);
    });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
