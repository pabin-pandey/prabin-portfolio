import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-gray-950 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">© 2026 Prabin Pandey · Finance × Data × AI</p>
        <nav className="flex items-center gap-4" aria-label="Footer navigation">
          {[
            { label: "About",    href: "/about" },
            { label: "Projects", href: "/projects" },
            { label: "Blog",     href: "/blog" },
            { label: "Contact",  href: "/contact" },
          ].map(({ label, href }) => (
            <Link key={href} href={href} className="text-xs text-gray-600 hover:text-gray-300 transition-colors">
              {label}
            </Link>
          ))}
          <a
            href="mailto:prabin.pandey@temple.edu"
            className="text-xs text-gray-600 hover:text-indigo-400 transition-colors"
          >
            prabin.pandey@temple.edu
          </a>
        </nav>
      </div>
    </footer>
  );
}
