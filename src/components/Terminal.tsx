// components/Terminal.js
"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";

interface TerminalProps {
  children: ReactNode;
  typingSpeed?: number;
}

const Terminal: React.FC<TerminalProps> = ({ children, typingSpeed = 50 }) => {
  // Convert children to string for typing animation
  // The children prop ensures content is in HTML for SEO
  const text = typeof children === "string" ? children : String(children);

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    }
  }, [index, text, typingSpeed]);

  const cursorVariants = {
    blinking: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 0,
        ease: "linear",
        times: [0, 0.5, 0.5, 1],
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto font-mono text-sm">
      <div className="bg-gray-800 rounded-t-lg flex items-center px-4 py-2 space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="bg-gray-900 text-green-400 p-4 rounded-b-lg shadow-2xl min-h-[150px] overflow-hidden">
        <pre className="whitespace-pre-wrap break-words overflow-hidden w-full">
          <code className="block w-full">
            {displayedText}

            <motion.span
              variants={cursorVariants}
              animate="blinking"
              className="inline-block w-2 h-4 bg-green-400 ml-1 align-middle"
            />
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Terminal;
