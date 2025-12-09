"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedBlogTitle({
   children,
}: {
   children: React.ReactNode;
}) {
   const titleRef = useRef(null);

   useEffect(() => {
      const ctx = gsap.context(() => {
         const tl = gsap.timeline();

         // Initial entrance animation
         tl.fromTo(
            ".title-line",
            { opacity: 0, x: -100 },
            {
               opacity: 1,
               x: 0,
               duration: 0.8,
               stagger: 0.15,
               ease: "power3.out",
            }
         );

         // Floating animation starts after entrance completes
         tl.to(
            ".title-line",
            {
               y: 8,
               duration: 3,
               repeat: -1,
               yoyo: true,
               ease: "sine.inOut",
               stagger: 0.1,
            },
            0 // Start at the beginning but will wait for previous animation
         );
      }, titleRef);

      return () => ctx.revert();
   }, []);
   return <div ref={titleRef}>{children}</div>;
}
