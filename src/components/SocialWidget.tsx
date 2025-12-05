import React from "react";
import data from "../app/db.json";
import Image from "next/image";

export default function SocialWidget() {
    return (
        <div className="hidden md:flex items-center justify-center box-border w-full">
            <div className=" rounded-xl  p-4 w-full">
                <h3 className="text-lg font-semibold text-primary-dark mb-2 border-b border-action pb-2 text-center">
                    Connect with me
                </h3>
                <div className="flex space-y-2">
                    {data.social_links.map((link) => {
                        return (
                            <a
                                key={link.id}
                                href={link.url}
                                className="group flex items-center justify-start gap-3 px-4 py-2.5 rounded-lg transition-all duration-200  hover:bg-action  cursor-pointer"
                            >
                                <div className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity ">
                                    <Image
                                        src={link.icon}
                                        alt={link.id}
                                        width={30}
                                        height={30}
                                        loading="lazy"
                                    />
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
