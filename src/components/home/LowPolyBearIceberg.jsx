import React from 'react';
import { motion } from 'framer-motion';

export const LowPolyBearIceberg = ({ rotateX, rotateY, hero3DX, hero3DY }) => {
  return (
    <motion.div
      style={{
        x: hero3DX,
        y: hero3DY,
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full h-full max-h-[520px] flex items-center justify-center pointer-events-none perspective-1000 select-none"
    >
      {/* 1. Sonar Target Ring (Pulsing Radar Accent) */}
      <div className="absolute top-[20%] right-[2%] z-20 flex items-center justify-center">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#0284C7]/30 animate-ping opacity-60"></div>
          <div className="absolute inset-2 rounded-full border border-[#38BDF8]/60 animate-pulse"></div>
          <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-[#0284C7]/40 flex items-center justify-center shadow-lg">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0284C7] animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* 2. Floating Crystal Asteroids */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[8%] left-[8%] z-15 w-12 h-12"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(2,132,199,0.25)]">
          <defs>
            <linearGradient id="lightAsteroid1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
          <polygon points="50,10 85,35 70,85 30,85 15,35" fill="url(#lightAsteroid1)" stroke="#38BDF8" strokeWidth="1" opacity="0.95" />
          <polygon points="50,10 85,35 50,50" fill="#7DD3FC" opacity="0.5" />
        </svg>
      </motion.div>

      <motion.div
        animate={{
          y: [10, -12, 10],
          rotate: [0, -14, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-[20%] right-[4%] z-15 w-10 h-10"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_6px_14px_rgba(2,132,199,0.2)]">
          <defs>
            <linearGradient id="lightAsteroid2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          <polygon points="40,5 90,30 80,80 25,95 5,45" fill="url(#lightAsteroid2)" stroke="#0284C7" strokeWidth="0.8" opacity="0.9" />
        </svg>
      </motion.div>

      {/* 3. Main 3D Low-Poly Bear & Iceberg Illustration */}
      <div className="relative w-full max-w-[480px] h-[420px] flex items-center justify-center">

        {/* Ambient Light Backglow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-[#38BDF8]/30 via-[#0284C7]/20 to-[#F97316]/15 blur-3xl rounded-full pointer-events-none"></div>

        <svg
          viewBox="0 0 600 500"
          className="w-full h-full overflow-visible filter drop-shadow-[0_20px_40px_rgba(2,132,199,0.2)]"
        >
          <defs>
            {/* Bright Light Theme Gradients */}
            <linearGradient id="lightIceTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#BAE6FD" />
            </linearGradient>

            <linearGradient id="lightIceFacet1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>

            <linearGradient id="lightIceFacet2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            <linearGradient id="lightBearLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F0F9FF" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>

            <linearGradient id="lightBearMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#7DD3FC" />
            </linearGradient>

            <linearGradient id="lightAsteroid1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>

            <linearGradient id="lightAsteroid2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* ICEBERG FACETED BASE */}
          <g className="iceberg-base">
            <polygon points="120,330 260,300 440,310 520,345 420,375 220,380" fill="url(#lightIceTop)" />
            <polygon points="120,330 220,380 180,440 80,400" fill="url(#lightIceFacet1)" />
            <polygon points="220,380 420,375 380,465 180,440" fill="url(#lightIceFacet2)" />
            <polygon points="420,375 520,345 540,410 380,465" fill="#0284C7" />
            <polygon points="180,440 380,465 300,495" fill="#0369A1" />

            <polyline points="120,330 220,380 420,375 520,345" stroke="#FFFFFF" strokeWidth="2" fill="none" />
            <polyline points="220,380 180,440 380,465 420,375" stroke="#E0F2FE" strokeWidth="1.5" fill="none" />
          </g>

          {/* LOW-POLY POLAR BEAR */}
          <g className="polar-bear" transform="translate(40, -10)">
            <polygon points="210,310 240,310 250,335 200,335" fill="#0284C7" opacity="0.8" />
            <polygon points="340,310 375,310 385,340 330,340" fill="#0284C7" opacity="0.8" />

            {/* Body */}
            <polygon points="210,230 270,200 300,250 220,290" fill="url(#lightBearLight)" />
            <polygon points="220,290 300,250 330,315 230,315" fill="url(#lightBearMid)" />
            <polygon points="270,200 360,185 390,240 300,250" fill="url(#lightBearLight)" />
            <polygon points="300,250 390,240 400,310 330,315" fill="url(#lightBearMid)" />
            <polygon points="360,185 430,200 440,250 390,240" fill="url(#lightBearLight)" />
            <polygon points="390,240 440,250 430,315 400,310" fill="url(#lightBearMid)" />

            {/* Front Legs */}
            <polygon points="390,280 435,280 445,345 400,345" fill="url(#lightBearMid)" />
            <polygon points="420,270 460,265 475,348 430,348" fill="url(#lightBearLight)" />

            {/* Head */}
            <polygon points="430,200 465,185 480,210 440,225" fill="url(#lightBearLight)" />
            <polygon points="465,185 500,205 485,225 480,210" fill="url(#lightBearLight)" />
            <polygon points="500,205 512,215 495,228 485,225" fill="#E0F2FE" />
            <polygon points="508,212 514,217 505,222 500,218" fill="#0F172A" />

            <polygon points="440,225 480,210 485,225 465,250" fill="url(#lightBearMid)" />
            <polygon points="465,250 485,225 495,228 470,260" fill="#38BDF8" />
            <polygon points="472,204 478,206 474,210" fill="#0284C7" />

            <polyline points="270,200 360,185 430,200 465,185 500,205 512,215" stroke="#FFFFFF" strokeWidth="2" fill="none" />
            <polyline points="210,230 270,200 300,250 390,240 440,250 480,210" stroke="#BAE6FD" strokeWidth="1.5" fill="none" />
          </g>

          {/* Water Surface Ripple Base */}
          <ellipse cx="330" cy="450" rx="240" ry="35" fill="url(#lightIceFacet1)" opacity="0.3" />
          <ellipse cx="330" cy="450" rx="180" ry="22" fill="none" stroke="#0284C7" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      {/* Reflective Glow */}
      <div className="absolute -bottom-6 w-full h-20 bg-gradient-to-t from-[#38BDF8]/20 via-[#0284C7]/10 to-transparent blur-2xl rounded-full"></div>
    </motion.div>
  );
};

export default LowPolyBearIceberg;
