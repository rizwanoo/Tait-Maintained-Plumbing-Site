import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2.5px] bg-[#DCE6ED]/50 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-[#2A9FE4] via-[#6FC5ED] to-[#2A9FE4] origin-left shadow-xs"
        style={{ scaleX }}
      />
    </div>
  );
};
