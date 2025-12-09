import type { Metadata } from "next";
import {
   Geist,
   Geist_Mono,
} from "next/font/google";
import SideBar from "@/components/SideBar";
import MobileNav from "@/components/MobileNav";
import MouseParticles from "@/components/MouseParticles";
import data from "./db.json";
import "./globals.css";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: data.metadata.title,
   description: data.metadata.description,
   keywords: data.metadata.keywords.split(", "),
   authors: [{ name: data.metadata.author }],
   openGraph: {
      title: data.metadata.title,
      description: data.metadata.description,
      type: "website",
      locale: data.metadata.lang,
   },
   twitter: {
      card: "summary_large_image",
      title: data.metadata.title,
      description: data.metadata.description,
   },
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang={data.metadata.lang}>
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex relative overflow-x-hidden`}
         >
            <MouseParticles />
            <div className="h-screen fixed top-0 left-0 bottom-0 w-64 hidden md:block z-20">
               <SideBar />
            </div>
            <MobileNav />
            <div className="w-full ml-0 md:ml-64 overflow-x-hidden">
               {children}
            </div>
         </body>
      </html>
   );
}
