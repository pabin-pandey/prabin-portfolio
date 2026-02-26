import Link from "next/link";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
];

export default function SiteNav({ active }: { active?: string }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-[15px] font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
          style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          Prabin
        </Link>
        <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = active === label.toLowerCase();
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3.5 py-2 text-[13px] font-medium capitalize transition-all duration-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
                  ${isActive ? "text-white" : "text-gray-500 hover:text-gray-200"}`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
                )}
              </Link>
            );
          })}
        </nav>
        {/* Mobile — simple text links */}
        <nav className="md:hidden flex items-center gap-3" aria-label="Mobile navigation">
          {NAV_LINKS.filter(l => l.label !== "Home").map(({ label, href }) => (
            <Link key={href} href={href} className="text-xs text-gray-500 hover:text-gray-200 transition-colors">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
