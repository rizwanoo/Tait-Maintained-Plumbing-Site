import React, { useRef, useState, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 14,
  onClick,
  type = 'button',
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touchCheck = window.matchMedia('(hover: none), (pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouch(touchCheck);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouch || !buttonRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (clientX - centerX) / (width / 2);
    const distanceY = (clientY - centerY) / (height / 2);

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    setPosition({ x: 0, y: 0 });
  };

  // On touch/mobile screens, render a fast, native button to guarantee instant click response without animation gesture blocking
  if (isTouch) {
    const { animate, transition, whileTap, whileHover, ...cleanProps } = props as any;
    return (
      <button
        ref={buttonRef}
        type={type}
        onClick={onClick}
        className={`relative cursor-pointer select-none inline-flex items-center justify-center active:scale-[0.97] transition-transform duration-100 ${className}`}
        {...cleanProps}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 200, mass: 0.1 }}
      whileTap={{ scale: 0.96 }}
      className={`relative cursor-pointer select-none inline-flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
