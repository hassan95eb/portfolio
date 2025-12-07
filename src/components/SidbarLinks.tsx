import React from "react";
import data from "../app/db.json";
import Link from "next/link";
import { HiBookOpen } from "react-icons/hi";

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
          <Link
            key={item.id}
            href={item.url}
            className="group flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg transition-all duration-200  hover:bg-action  cursor-pointer w-full"
          >
            <div className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity w-12">
              <HiBookOpen className="w-10 h-10 text-primary-text group-hover:text-[#d9c9be]" />
            </div>
            <span className="text-sm text-primary-text group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors font-bold">
              {item.title}
            </span>
          </Link>
        );
      })}
    </>
  );
}
