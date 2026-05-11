import Link from "next/link";

const navItems = [
  { href: "/guides", label: "Guides" },
  { href: "/questions", label: "Questions" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="max-w-content mx-auto px-6 py-6 flex items-center justify-between gap-6">
        <Link href="/" className="font-serif text-xl tracking-tight text-ink">
          Derb
        </Link>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-meta uppercase tracking-wide">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-secondary hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
