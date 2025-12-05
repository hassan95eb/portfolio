import Image from "next/image";
import React from "react";

export default function loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-action via-action/80 to-background">
            <Image
                src="/logo-Hassan-Amini-min.png"
                alt="لوگو"
                width={300}
                height={300}
                priority
                className="animate-custom_pluse"
            />
        </div>
    );
}
