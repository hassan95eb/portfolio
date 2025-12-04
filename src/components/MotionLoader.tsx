// components/MotionLoader.tsx

"use client";

import Image from "next/image";

export default function MotionLoader() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-luxury-black">
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
