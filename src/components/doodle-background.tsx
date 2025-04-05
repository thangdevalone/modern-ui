"use client";

import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2, bounce: 0 },
      opacity: { duration: 0.5 },
    },
  },
};

const DoodleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute w-full h-full stroke-primary/[0.1] dark:stroke-primary/[0.15] fill-none"
        viewBox="0 0 1000 1000"
      >
        <motion.g initial="hidden" animate="visible" strokeWidth={2}>
          <motion.path
            d="M100,200 Q150,100 200,200 Q250,300 300,200 Q350,100 400,200"
            variants={draw}
          />
          <motion.path
            d="M700,800 Q750,700 800,800 Q850,900 900,800 Q950,700 1000,800"
            variants={draw}
          />

          <motion.circle cx="150" cy="150" r="20" variants={draw} />
          <motion.circle cx="850" cy="850" r="30" variants={draw} />

          <motion.path
            d="M500,100 L520,140 L560,150 L520,160 L500,200 L480,160 L440,150 L480,140 Z"
            variants={draw}
            animate={{
              rotate: [0, 360],
              transition: {
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            }}
          />
        </motion.g>
      </svg>

      <svg
        className="absolute w-full h-full stroke-primary/[0.05] dark:stroke-primary/[0.1] fill-none"
        viewBox="0 0 1000 1000"
      >
        <motion.g initial="hidden" animate="visible" strokeWidth={1.5}>
          <motion.path
            d="M300,400 Q350,350 400,400 Q450,450 500,400 Q550,350 600,400"
            variants={draw}
          />

          <motion.path
            d="M100,600 Q200,550 300,600 Q400,650 500,600 Q600,550 700,600"
            variants={draw}
          />

          <motion.path
            d="M700,200 C750,150 800,150 850,200 S950,250 1000,200"
            variants={draw}
          />
          <motion.path
            d="M200,800 C250,750 300,750 350,800 S450,850 500,800"
            variants={draw}
          />
        </motion.g>
      </svg>

      <svg
        className="absolute w-full h-full stroke-primary/[0.03] dark:stroke-primary/[0.08] fill-none"
        viewBox="0 0 1000 1000"
      >
        <motion.g initial="hidden" animate="visible" strokeWidth={1}>
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M${Math.random() * 1000},${
                Math.random() * 1000
              } l10,10 m-10,0 l10,-10`}
              variants={draw}
            />
          ))}

          {Array.from({ length: 15 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 1000}
              cy={Math.random() * 1000}
              r="2"
              variants={draw}
            />
          ))}

          {Array.from({ length: 5 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M${Math.random() * 900},${
                Math.random() * 900
              } l20,20 l20,-20 l20,20`}
              variants={draw}
            />
          ))}
        </motion.g>
      </svg>

      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-4 border border-primary/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DoodleBackground;
