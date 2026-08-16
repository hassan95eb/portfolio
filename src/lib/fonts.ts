import { Space_Grotesk, Manrope, Vazirmatn } from "next/font/google";

/**
 * Self-hosted through next/font instead of the @import the Figma export used.
 * The @import version blocks first paint on a third-party request; next/font
 * inlines the @font-face at build time and preloads the files from our origin.
 */

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

/** Persian face. theme.css swaps to it automatically under [dir="rtl"]. */
export const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const fontVariables = [
  spaceGrotesk.variable,
  manrope.variable,
  vazirmatn.variable,
].join(" ");
