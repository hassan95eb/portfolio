"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGithub,
} from "react-icons/si";
import { MdDevices, MdApi } from "react-icons/md";

interface SkillsData {
  title: string;
  list: string[];
}

interface AboutSectionSocialProps {
  skills: SkillsData;
}

// Map skill names to their corresponding icons
const getSkillIcon = (skill: string) => {
  const skillLower = skill.toLowerCase();

  // Handle combined skills first
  if (skillLower.includes("html") && skillLower.includes("css")) {
    return (
      <>
        <SiHtml5 className="w-5 h-5" />
        <SiCss3 className="w-5 h-5" />
      </>
    );
  }
  if (skillLower.includes("react") && skillLower.includes("next")) {
    return (
      <>
        <SiReact className="w-5 h-5" />
        <SiNextdotjs className="w-5 h-5" />
      </>
    );
  }
  if (skillLower.includes("git") && skillLower.includes("github")) {
    return (
      <>
        <SiGithub className="w-5 h-5" />
      </>
    );
  }

  // Handle individual skills
  if (skillLower.includes("html")) return <SiHtml5 className="w-5 h-5" />;
  if (skillLower.includes("css")) return <SiCss3 className="w-5 h-5" />;
  if (skillLower.includes("javascript"))
    return <SiJavascript className="w-5 h-5" />;
  if (skillLower.includes("typescript"))
    return <SiTypescript className="w-5 h-5" />;
  if (skillLower.includes("react")) return <SiReact className="w-5 h-5" />;
  if (skillLower.includes("next")) return <SiNextdotjs className="w-5 h-5" />;
  if (skillLower.includes("tailwind"))
    return <SiTailwindcss className="w-5 h-5" />;
  if (skillLower.includes("github")) return <SiGithub className="w-5 h-5" />;
  if (skillLower.includes("responsive") || skillLower.includes("design"))
    return <MdDevices className="w-5 h-5" />;
  if (skillLower.includes("api") || skillLower.includes("rest"))
    return <MdApi className="w-5 h-5" />;

  return null;
};

export default function AboutSectionSocial({
  skills,
}: AboutSectionSocialProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="mt-8 md:mt-12">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary-text text-center px-2">
        {skills.title}
      </h3>
      <motion.div
        className="flex flex-wrap gap-2 sm:gap-3 justify-center px-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skills.list.map((skill, index) => {
          const icon = getSkillIcon(skill);
          return (
            <motion.span
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary text-primary-text rounded-full text-xs sm:text-sm md:text-base font-medium flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-colors hover:bg-action group"
            >
              <span className="group-hover:[&_svg]:text-[#d9c9be]">{icon}</span>
              <span className="whitespace-nowrap">{skill}</span>
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}
