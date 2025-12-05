"use client";

import Image from "next/image";
import React from "react";

interface ScrollLinkProps {
    href: string;
    children: React.ReactNode;
    imageUrl: string;
}

const ScrollLink: React.FC<ScrollLinkProps> = ({
    href,
    children,
    imageUrl,
}) => {
    const handleClick = (
        e: React.MouseEvent<HTMLAnchorElement>
    ) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement =
            document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            window.history.pushState(null, "", href);
        }
    };
    return (
        <a
            href={href}
            onClick={handleClick}
            className="group flex items-center justify-start gap-3 px-4 py-2.5 rounded-lg transition-all duration-200  hover:bg-action  cursor-pointer"
        >
            <div className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                <Image
                    src={imageUrl}
                    alt={href}
                    width={40}
                    height={40}
                />
            </div>
            <span className="text-sm text-primary-text group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors font-bold">
                {children}
            </span>
        </a>
    );
};

export default ScrollLink;
