import React from "react";
import data from "../app/db.json";
import Image from "next/image";
import Link from "next/link";

interface Item {
    id: string;
    title: string;
    url: string;
    icon: string;
}
export default function SidbarLinks() {
    const links = data.navigation;
    return (
        <>
            {links.map((item: Item) => {
                return (
                    <li key={item.id}>
                        <Link
                            href={item.url}
                            className="group flex items-center justify-start gap-3 px-4 py-2.5 rounded-lg transition-all duration-200  hover:bg-action  cursor-pointer"
                        >
                            <div className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity w-12">
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <span className="text-sm text-primary-text group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors font-bold">
                                {item.title}
                            </span>
                        </Link>
                    </li>
                );
            })}
        </>
    );
}
