import React from 'react';
import { motion } from 'framer-motion';

export const TextMaskReveal = ({ children, delay = 0, className = '' }) => {
  return (
    <div className={`overflow-hidden py-1 ${className}`}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{
          duration: 0.85,
          delay: delay,
          ease: [0.215, 0.61, 0.355, 1] // GSAP Agency Mask Reveal Easing
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TextMaskReveal;
