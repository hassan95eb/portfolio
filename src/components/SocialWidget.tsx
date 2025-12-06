import React from "react";
import data from "../app/db.json";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "linkedin": FaLinkedin,
  "github": FaGithub,
  "email": FaEnvelope,
  "gmail": FaEnvelope,
};

export default function SocialWidget() {
    const getIcon = (linkId: string) => {
        const idLower = linkId.toLowerCase();
        if (idLower.includes("linkedin")) return iconMap.linkedin;
        if (idLower.includes("github")) return iconMap.github;
        if (idLower.includes("email") || idLower.includes("gmail")) return iconMap.email;
        return null;
    };

    return (
        <div className="hidden md:flex items-center justify-center box-border w-full">
            <div className=" rounded-xl  p-4 w-full">
                <h3 className="text-lg font-semibold text-primary-dark mb-2 border-b border-action pb-2 text-center">
                    Connect with me
                </h3>
                <div className="flex space-y-2">
                    {data.social_links.map((link) => {
                        const IconComponent = getIcon(link.id);
                        if (!IconComponent) return null;
                        
                        return (
                            <a
                                key={link.id}
                                href={link.url}
                                className="group flex items-center justify-start gap-3 px-4 py-2.5 rounded-lg transition-all duration-200  hover:bg-action  cursor-pointer"
                            >
                                <div className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity ">
                                    <IconComponent className="w-[30px] h-[30px] text-primary-text group-hover:text-[#d9c9be]" />
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
