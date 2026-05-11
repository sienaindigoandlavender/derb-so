import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-6 py-24 text-center">
      <p className="font-mono text-meta uppercase tracking-wide text-accent mb-6">
        404
      </p>
      <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
        Lost in the derb
      </h1>
      <p className="font-serif italic text-tertiary mb-10 max-w-prose mx-auto">
        This page doesn&apos;t exist, or it moved without telling anyone.
      </p>
      <Link
        href="/"
        className="font-mono text-meta uppercase tracking-wide text-accent hover:opacity-70 transition-opacity"
      >
        ← Back to Derb
      </Link>
    </div>
  );
}
