"use client";

import React from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import {
   useRouter,
   usePathname,
} from "next/navigation";
import { FaUserTie } from "react-icons/fa";
import { BsHouseFill } from "react-icons/bs";

interface ScrollLinkProps {
   href: string;
   children: React.ReactNode;
   iconType: "home" | "about" | "contact";
   onClick?: () => void;
}

const iconMap = {
   home: BsHouseFill,
   about: FaUserTie,
   contact: MdOutlineAlternateEmail,
};

const ScrollLink: React.FC<ScrollLinkProps> = ({
   href,
   children,
   iconType,
   onClick,
}) => {
   const router = useRouter();
   const pathname = usePathname();
   const IconComponent =
      iconMap[iconType as keyof typeof iconMap] ||
      MdOutlineAlternateEmail;

   const handleClick = (
      e: React.MouseEvent<HTMLAnchorElement>
   ) => {
      e.preventDefault();
      const targetId = href.substring(1);

      // If on home page, scroll to section
      if (pathname === "/" || pathname === "") {
         const targetElement =
            document.getElementById(targetId);
         if (targetElement) {
            targetElement.scrollIntoView({
               behavior: "smooth",
               block: "start",
            });
            window.history.pushState(
               null,
               "",
               href
            );
         }
      } else {
         // If on a different page, navigate to home with hash
         router.push("/" + href);
      }

      if (onClick) {
         onClick();
      }
   };
   return (
      <a
         href={href}
         onClick={handleClick}
         className="group flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg transition-all duration-200  hover:bg-action  cursor-pointer w-full"
      >
         <div className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
            <IconComponent className="w-10 h-10 text-primary-text group-hover:text-[#d9c9be]" />
         </div>
         <span className="text-sm text-primary-text group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors font-bold">
            {children}
         </span>
      </a>
   );
};

export default ScrollLink;
