import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { X, Phone, Mail, User, Heart, Bag } from "./Icons";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Features", to: "/#features" },
  { label: "About Us", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "Contact", to: "/contact" },
];

export default function MobileMenu() {
  const { mobileNavOpen, setMobileNavOpen, cartCount, wishlist, setCartOpen } = useStore();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden ${
          mobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileNavOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-[85%] max-w-sm flex-col bg-charcoal text-white transition-transform duration-300 lg:hidden ${
          mobileNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile menu"
        aria-hidden={!mobileNavOpen}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <span className="text-xl font-bold uppercase tracking-tight">Armania</span>
          <button
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close menu"
            className="cursor-pointer rounded-full p-2 transition-colors hover:bg-white/10"
          >
            <X />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-4" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="block border-b border-white/10 py-3.5 text-sm font-medium uppercase tracking-[0.08em] transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-3 px-6 py-6 text-sm text-white/70">
          <a href="tel:+15552467890" className="flex items-center gap-2 hover:text-accent"><Phone size={15} /> (555) 246-7890</a>
          <a href="mailto:support@armania-tools.com" className="flex items-center gap-2 hover:text-accent"><Mail size={15} /> support@armania-tools.com</a>
          <div className="flex gap-4 pt-2 text-white">
            <button onClick={() => { setMobileNavOpen(false); setCartOpen(true); }} className="flex cursor-pointer items-center gap-2 hover:text-accent">
              <Bag size={16} /> Bag ({cartCount})
            </button>
            <Link to="/wishlist" className="flex items-center gap-2 hover:text-accent"><Heart size={16} /> Wishlist ({wishlist.length})</Link>
          </div>
          <p className="flex items-center gap-2 pt-1"><User size={15} /> Register or Sign In</p>
        </div>
      </aside>
    </>
  );
}
