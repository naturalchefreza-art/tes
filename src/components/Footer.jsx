import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Pin, Check, ArrowRight } from "./Icons";

const socials = ["Facebook", "Twitter", "Instagram", "YouTube", "Pinterest"];

const infoLinks = [
  { label: "About Us", to: "/about" },
  { label: "Delivery Information", to: "/contact" },
  { label: "Privacy Policy", to: "/contact" },
  { label: "Terms & Conditions", to: "/contact" },
  { label: "Manufacturers", to: "/shop" },
];

const accountLinks = [
  { label: "Search", to: "/shop" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "Shopping Bag", to: "/cart" },
];

const payments = ["VISA", "Mastercard", "PayPal", "Amex", "Discover", "Apple Pay"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (email.includes("@")) setSubscribed(true);
  };

  return (
    <footer className="bg-charcoal text-white/75">
      {/* Brand badges strip */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-6 text-lg font-bold uppercase tracking-[0.2em] text-white/30">
          <span>DeWalt</span>
          <span>Bosch</span>
          <span>Makita</span>
          <span>Stanley</span>
          <span>Milwaukee</span>
        </div>
      </div>

      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Newsletter */}
        <div>
          <Link to="/" className="flex items-center gap-2.5" aria-label="Armania home">
            <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" rx="6" fill="#FFC107" />
              <path d="M9 24V9l10 7.5L9 24" fill="none" stroke="#333" strokeWidth="2.4" strokeLinejoin="round" />
              <path d="M22 9v15" stroke="#333" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <span className="text-xl font-bold uppercase tracking-tight text-white">Armania</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed">
            Premium building tools and equipment for professionals and serious DIYers.
          </p>

          {subscribed ? (
            <p className="mt-5 flex items-center gap-2 border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
              <Check size={16} /> Thanks! You're on the list.
            </p>
          ) : (
            <form onSubmit={subscribe} className="mt-5 flex">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-body/60"
              />
              <button type="submit" className="shrink-0 cursor-pointer bg-accent px-5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-white">
                Subscribe
              </button>
            </form>
          )}

          <div className="mt-6 flex gap-2">
            {socials.map((s) => (
              <a
                key={s}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label={s}
                className="flex h-9 w-9 items-center justify-center border border-white/15 text-xs font-semibold text-white/60 transition-colors hover:border-accent hover:text-accent"
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Information */}
        <nav aria-label="Information">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white">Information</h3>
          <ul className="space-y-3 text-sm">
            {infoLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* My Account */}
        <nav aria-label="My account">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white">My Account</h3>
          <ul className="space-y-3 text-sm">
            {accountLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact info */}
        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-white">Contact Info</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <Pin size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>28 Industrial Avenue, Suite 400<br />Chicago, IL 60607, USA</span>
            </li>
            <li>
              <a href="tel:+15552467890" className="flex items-center gap-3 transition-colors hover:text-accent">
                <Phone size={16} className="shrink-0 text-accent" /> (555) 246-7890
              </a>
            </li>
            <li>
              <a href="mailto:support@armania-tools.com" className="flex items-center gap-3 transition-colors hover:text-accent">
                <Mail size={16} className="shrink-0 text-accent" /> support@armania-tools.com
              </a>
            </li>
            <li className="text-xs leading-relaxed text-white/50">
              Opening hours:<br />Mon – Fri: 8:00 – 19:00<br />Saturday: 9:00 – 17:00
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Armania Tools. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {payments.map((p) => (
              <span key={p} className="border border-white/15 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white/60">
                {p}
              </span>
            ))}
          </div>
          <Link to="/contact" className="flex items-center gap-1 transition-colors hover:text-accent">
            Get help <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
