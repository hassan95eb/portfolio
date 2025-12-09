"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedBlogTitle({
   children,
}: {
   children: React.ReactNode;
}) {
   const titleRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const ctx = gsap.context(() => {
         gsap.set(".title-line", {
            opacity: 0,
            x: -80,
            transformOrigin: "left center",
            willChange: "transform, opacity",
         });

         const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
         });

         tl.to(".title-line", {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.12,
         });

         tl.to(
            ".title-line",
            {
               y: 30,
               duration: 2.4,
               repeat: -1,
               yoyo: true,
               ease: "sine.inOut",
               stagger: {
                  each: 0.12,
                  from: "start",
               },
               force3D: true,
            },
            "-=0.6"
         );
      }, titleRef);

      return () => ctx.revert();
   }, []);

   return (
      <div ref={titleRef} className="">
         {children}
      </div>
   );
}
