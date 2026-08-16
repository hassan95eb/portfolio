import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-32 text-center">
      <p className="mb-3 text-sm uppercase tracking-widest text-accent">404</p>
      <h1 className="mb-4 font-heading text-3xl text-text-main">
        Page not found
      </h1>
      <p className="mb-8 font-body text-text-muted">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="rounded-md border border-border px-4 py-2 font-body text-sm text-text-main transition-colors hover:border-accent hover:text-accent"
      >
        Back home
      </Link>
    </div>
  );
}
