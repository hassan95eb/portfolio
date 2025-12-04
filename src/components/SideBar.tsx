import Image from "next/image";
import React from "react";

export default function SideBar() {
    return (
        <aside className="px-4 py-7 w-full">
            <div className="w-full flex flex-col justify-center items-center">
                <div className="mx-auto text-center h-[50%] w-1/2">
                    <Image
                        src="/profile.jpg"
                        alt="profile image"
                        loading="lazy"
                        width={128}
                        height={128}
                        className="rounded-[50%]"
                    />
                </div>
                <ul className="flex flex-col justify-center items-center">
                    <li className="mx-auto">Links</li>
                </ul>
                <div className="">social Media</div>
            </div>
        </aside>
    );
}
