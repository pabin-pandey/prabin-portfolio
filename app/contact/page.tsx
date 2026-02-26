import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Prabin Pandey — Reach Out for Finance & AI Opportunities",
  description:
    "Contact Prabin Pandey — MS Financial Analysis candidate at Temple University. Open to Summer 2026 finance, investment analytics, and AI-augmented research roles.",
  alternates: { canonical: "https://www.prabinpandey.com/contact" },
  openGraph: {
    title: "Contact Prabin Pandey",
    description: "Open to Summer 2026 opportunities in finance, investment analytics, and AI-augmented research.",
    url: "https://www.prabinpandey.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteNav active="contact" />

      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-3">Contact</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
            I&apos;d love to hear from you. Whether you have a question, opportunity, or just want to connect — drop me a message.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Direct contact */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white">Direct Contact</h2>

            <a
              href="mailto:prabin.pandey@temple.edu"
              className="flex items-center gap-3 p-4 bg-gray-900 border border-white/[0.06] rounded-xl hover:border-indigo-500/30 transition-colors group"
            >
              <span className="text-indigo-400 text-xl">✉</span>
              <div>
                <p className="text-xs text-gray-500 font-medium">Email</p>
                <p className="text-sm font-semibold text-gray-200 group-hover:text-indigo-300 transition-colors">prabin.pandey@temple.edu</p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/prabin-pandey-1482362b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-900 border border-white/[0.06] rounded-xl hover:border-indigo-500/30 transition-colors group"
            >
              <span className="text-indigo-400 text-xl">in</span>
              <div>
                <p className="text-xs text-gray-500 font-medium">LinkedIn</p>
                <p className="text-sm font-semibold text-gray-200 group-hover:text-indigo-300 transition-colors">prabin-pandey-1482362b7</p>
              </div>
            </a>

            <a
              href="https://github.com/pabin-pandey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-900 border border-white/[0.06] rounded-xl hover:border-indigo-500/30 transition-colors group"
            >
              <span className="text-indigo-400 text-xl">⌥</span>
              <div>
                <p className="text-xs text-gray-500 font-medium">GitHub</p>
                <p className="text-sm font-semibold text-gray-200 group-hover:text-indigo-300 transition-colors">pabin-pandey</p>
              </div>
            </a>

            <div className="flex items-center gap-3 p-4 bg-gray-900 border border-white/[0.06] rounded-xl">
              <span className="text-indigo-400 text-xl">📍</span>
              <div>
                <p className="text-xs text-gray-500 font-medium">Location</p>
                <p className="text-sm font-semibold text-gray-200">Philadelphia, PA</p>
              </div>
            </div>

            {/* Availability badge */}
            <div className="p-4 bg-gradient-to-br from-indigo-950/50 to-violet-950/30 border border-indigo-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-emerald-400">Available</span>
              </div>
              <p className="text-sm text-gray-400">Seeking Summer 2026 roles in investment analytics, financial data engineering, and AI-augmented research. Available May 2026.</p>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-base font-bold text-white mb-4">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
