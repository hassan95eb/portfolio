"use client";

import { motion } from "framer-motion";

const AnimatedFramerBackground = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const backgroundVariants = {
    initial: { x: "0%", y: "0%" },
    animate: { x: "-50%", y: "-50%" },
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <motion.div
        className="animated-grid-layer"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        transition={{
          x: { repeat: Infinity, duration: 60, ease: "linear" },
          y: { repeat: Infinity, duration: 60, ease: "linear" },
        }}
      />

      <div className="relative z-10 w-full h-full p-4 md:p-8 text-white overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AnimatedFramerBackground;
