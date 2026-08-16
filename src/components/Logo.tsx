/* eslint-disable @next/next/no-img-element */

/**
 * Hassan Amini brand lockup — single source of truth for every placement.
 *
 * The Figma export shipped this as a 410-line inline SVG component. It is a
 * static file here for two reasons: it keeps ~34kB of path data out of the JS
 * bundle, and the markup carries 62 hardcoded element ids (`filter0_di_6_67`,
 * `paint0_linear_6_67`, …). Inlined twice on one page — header and footer —
 * those ids collide and every `url(#…)` reference resolves to the first copy.
 * Inside a file each document is its own id scope, so the problem disappears.
 *
 * Not next/image: the asset is already vector, so there is nothing to optimise
 * and the loader would only add a request hop.
 */

const ASPECT = 300 / 151;

export function Logo({
  className = "",
  height = 40,
}: {
  className?: string;
  height?: number;
}) {
  const width = Math.round(height * ASPECT);

  return (
    <img
      src="/logo.svg"
      alt="Hassan Amini"
      width={width}
      height={height}
      // Both dimensions are pinned, and shrink-0 stops a flex parent from
      // squeezing it. `width: auto` is not enough: inside the footer's
      // flex-col the default align-items: stretch blows the width out to the
      // whole column and the lockup renders distorted.
      className={`shrink-0 ${className}`}
      style={{ height, width }}
    />
  );
}
