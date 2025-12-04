import Image from "next/image";
import React from "react";

export default function loading() {
    return (
        <div className="h-screen w-full ">
            <Image
                src="/logo-Hassan-Amini-min.png"
                alt="لوگو"
                width={512}
                height={512}
                priority
                className="animate-custom_pluse"
            />
        </div>
    );
}
