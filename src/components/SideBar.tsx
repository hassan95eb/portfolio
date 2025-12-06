import Image from "next/image";
import React from "react";
import SidbarLinks from "./SidbarLinks";
import ScrollLink from "./ScrollLink";
import SocialWidget from "./SocialWidget";

export default function SideBar() {
  return (
    <aside className="px-4 py-7 bg-secondary border-r border-action h-full ">
      <div className=" flex flex-col justify-between items-center h-full">
        <div className="mx-auto text-center w-1/2">
          <Image
            src="/profile.jpg"
            alt="profile image"
            loading="lazy"
            width={128}
            height={128}
            className="rounded-[50%]"
          />
        </div>
        <ul className="flex flex-col justify-start items-center">
          <ScrollLink href="#home" iconType="home">
            Home
          </ScrollLink>
          <ScrollLink href="#about" iconType="about">
            About
          </ScrollLink>
          <ScrollLink href="#projects" iconType="projects">
            Projects
          </ScrollLink>
          <SidbarLinks />
        </ul>
        <SocialWidget />
      </div>
    </aside>
  );
}
