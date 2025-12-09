"use client";

import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import ScrollLink from "./ScrollLink";
import SidbarLinks from "./SidbarLinks";

export default function MobileNav() {
   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   const closeMenu = () => {
      setIsOpen(false);
   };

   return (
      <>
         {/* Hamburger Button */}
         <button
            onClick={toggleMenu}
            className="md:hidden fixed top-4 right-4 z-40 p-2 bg-secondary/90 backdrop-blur-sm rounded-lg border border-action/30 shadow-lg text-primary-text hover:bg-action transition-colors"
            aria-label="Toggle menu"
         >
            {isOpen ? (
               <HiX className="w-6 h-6" />
            ) : (
               <HiMenu className="w-6 h-6" />
            )}
         </button>

         {/* Overlay */}
         {isOpen && (
            <div
               className="md:hidden fixed inset-0 bg-black/50 z-30"
               onClick={closeMenu}
            />
         )}

         {/* Mobile Menu */}
         <nav
            className={`md:hidden fixed top-0 right-0 h-full w-64 bg-secondary border-l border-action z-30 transform transition-transform duration-300 ease-in-out  ${
               isOpen
                  ? "translate-x-0"
                  : "translate-x-full"
            }`}
         >
            <div className="flex flex-col h-full pt-16 px-4 bg-background">
               <ul className="flex flex-col gap-2">
                  <li>
                     <ScrollLink
                        href="#home"
                        iconType="home"
                        onClick={closeMenu}
                     >
                        Home
                     </ScrollLink>
                  </li>
                  <li>
                     <ScrollLink
                        href="#about"
                        iconType="about"
                        onClick={closeMenu}
                     >
                        About
                     </ScrollLink>
                  </li>
                  <li>
                     <ScrollLink
                        href="#projects"
                        iconType="contact"
                        onClick={closeMenu}
                     >
                        Projects
                     </ScrollLink>
                  </li>
                  <li onClick={closeMenu}>
                     <SidbarLinks />
                  </li>
               </ul>
            </div>
         </nav>
      </>
   );
}
