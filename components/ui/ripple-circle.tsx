import { motion } from "framer-motion";

interface RippleCircleProps {
  rippleCircles: number[];
  className?: string;
}

export function RippleCircle({ rippleCircles, className }: RippleCircleProps) {
  return (
    <svg
      viewBox="0 0 1500 1500"
      width={320}
      height={320}
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Animated Gradient */}
        <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#266699">
            <animate
              attributeName="stop-color"
              values="#266699; #A799B7; #57CC99; #266699"
              dur="12s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#57CC99">
            <animate
              attributeName="stop-color"
              values="#57CC99; #266699; #A799B7; #57CC99"
              dur="12s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>

      {rippleCircles.map((r, i) => (
        <motion.circle
          key={r}
          cx="750"
          cy="750"
          r={r}
          fill="none"
          stroke="url(#animatedGradient)" // animated gradient
          strokeWidth="6"
          initial={{ opacity: 0.6, scale: 0.7 }}
          animate={{ opacity: [0.6, 0], scale: [0.7, 1.2] }}
          transition={{
            delay: i * 0.2,
            duration: 3.5,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </svg>
  );
}
