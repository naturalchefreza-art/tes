import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import TopBar from "./TopBar";
import MobileMenu from "./MobileMenu";
import { Search, Heart, Bag, Menu, ChevronDown } from "./Icons";

const nav = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Features", to: "/#features" },
];

const pageLinks = [
  { label: "About Us", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const { cartCount, wishlist, setCartOpen, setSearchOpen, setMobileNavOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileNavOpen(false), [location.pathname, setMobileNavOpen]);

  const navClass = ({ isActive }) =>
    `relative py-6 text-[13px] font-medium uppercase tracking-[0.06em] transition-colors hover:text-accent ${
      isActive ? "text-accent" : "text-ink"
    } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full ${
      isActive ? "after:w-full" : ""
    }`;

  const handleHash = (e, to) => {
    if (to.includes("#")) {
      e.preventDefault();
      const id = to.split("#")[1];
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <TopBar />
      <div className="container-x flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 py-4" aria-label="Armania home">
          <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="6" fill="#FFC107" />
            <path d="M9 24V9l10 7.5L9 24" fill="none" stroke="#333" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M22 9v15" stroke="#333" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <span className="text-[26px] font-bold uppercase leading-none tracking-tight text-ink">
            Armania
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.label} to={n.to} end={n.to === "/"} className={navClass} onClick={(e) => handleHash(e, n.to)}>
              {n.label}
            </NavLink>
          ))}
          <div className="relative group">
            <button
              className="flex cursor-pointer items-center gap-1 py-6 text-[13px] font-medium uppercase tracking-[0.06em] text-ink transition-colors hover:text-accent"
              aria-haspopup="menu"
            >
              Pages <ChevronDown size={13} />
            </button>
            <ul className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 border border-gray-200 bg-white py-2 opacity-0 shadow-card transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {pageLinks.map((p) => (
                <li key={p.label}>
                  <NavLink
                    to={p.to}
                    className="block whitespace-nowrap px-6 py-2 text-[12px] uppercase tracking-wide text-body transition-colors hover:bg-light hover:text-accent"
                  >
                    {p.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <NavLink to="/shop" className={navClass}>Purchase</NavLink>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search products"
            className="cursor-pointer rounded-full p-2.5 text-ink transition-colors hover:bg-light hover:text-accent"
          >
            <Search />
          </button>
          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${wishlist.length} items`}
            className="relative rounded-full p-2.5 text-ink transition-colors hover:bg-light hover:text-accent"
          >
            <Heart />
            {wishlist.length > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-ink">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            aria-label={`Shopping bag, ${cartCount} items`}
            className="relative cursor-pointer rounded-full p-2.5 text-ink transition-colors hover:bg-light hover:text-accent"
          >
            <Bag />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-ink">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
            className="cursor-pointer rounded-full p-2.5 text-ink transition-colors hover:bg-light hover:text-accent lg:hidden"
          >
            <Menu />
          </button>
        </div>
      </div>
      <MobileMenu />
    </header>
  );
}
