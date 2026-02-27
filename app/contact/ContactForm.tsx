"use client";
import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.name || !state.email || !state.message) return;
    setLoading(true);
    // Open mailto with pre-filled content as fallback — works without backend
    const subject = encodeURIComponent(`Portfolio message from ${state.name}`);
    const body = encodeURIComponent(`Name: ${state.name}\nEmail: ${state.email}\n\n${state.message}`);
    window.location.href = `mailto:prabin.pandey@temple.edu?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 800);
  };

  if (sent) {
    return (
      <div className="bg-gray-900 border border-emerald-500/20 rounded-2xl p-8 text-center">
        <div className="text-3xl mb-3">✓</div>
        <h3 className="text-base font-bold text-white mb-2">Message ready</h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          Your email client should have opened with the message pre-filled. If not, email directly at{" "}
          <a href="mailto:prabin.pandey@temple.edu" className="text-indigo-400 hover:text-indigo-300 underline">
            prabin.pandey@temple.edu
          </a>
        </p>
        <button
          onClick={() => { setSent(false); setState({ name: "", email: "", message: "" }); }}
          className="mt-5 text-xs text-gray-500 hover:text-gray-300 transition-colors underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="cf-name" className="form-label">Name</label>
        <input
          id="cf-name"
          type="text"
          placeholder="Your name"
          required
          value={state.name}
          onChange={(e) => setState(s => ({ ...s, name: e.target.value }))}
          className="form-input"
        />
      </div>
      <div>
        <label htmlFor="cf-email" className="form-label">Email</label>
        <input
          id="cf-email"
          type="email"
          placeholder="you@example.com"
          required
          value={state.email}
          onChange={(e) => setState(s => ({ ...s, email: e.target.value }))}
          className="form-input"
        />
      </div>
      <div>
        <label htmlFor="cf-message" className="form-label">Message</label>
        <textarea
          id="cf-message"
          rows={5}
          placeholder="Your message..."
          required
          value={state.message}
          onChange={(e) => setState(s => ({ ...s, message: e.target.value }))}
          className="form-input resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 rounded-xl text-white text-[13px] font-bold transition-all duration-200 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 btn-primary"
        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
      >
        {loading ? "Opening email client…" : "Send Message →"}
      </button>
      <p className="text-xs text-center" style={{ color: "var(--text-faint)" }}>
        Opens your email client with the message pre-filled.
      </p>
    </form>
  );
}
