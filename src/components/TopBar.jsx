import { useStore } from "../store/StoreContext";
import { Phone, Mail, ChevronDown, User } from "./Icons";

export default function TopBar() {
  const { currency, setCurrency, currencies, user, signOut, setAuthOpen } = useStore();

  return (
    <div className="hidden bg-charcoal text-[12px] text-white/80 md:block">
      <div className="container-x flex h-9 items-center justify-between">
        <div className="flex items-center gap-5">
          <a href="tel:+15552467890" className="flex items-center gap-1.5 transition-colors hover:text-accent">
            <Phone size={13} /> <span className="sr-only">Call us</span>(555) 246-7890
          </a>
          <a href="mailto:support@armania-tools.com" className="flex items-center gap-1.5 transition-colors hover:text-accent">
            <Mail size={13} /> support@armania-tools.com
          </a>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative group">
            <button
              className="flex cursor-pointer items-center gap-1 py-2 transition-colors hover:text-accent"
              aria-haspopup="listbox"
              aria-label="Select currency"
            >
              {currency} <ChevronDown size={12} />
            </button>
            <ul
              role="listbox"
              className="absolute right-0 top-full invisible z-50 w-24 border border-gray-200 bg-white py-1 text-ink opacity-0 shadow-card transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
            >
              {currencies.map((c) => (
                <li key={c}>
                  <button
                    role="option"
                    aria-selected={c === currency}
                    onClick={() => setCurrency(c)}
                    className={`block w-full cursor-pointer px-4 py-1.5 text-left text-[12px] hover:bg-light ${
                      c === currency ? "text-accent" : ""
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-accent">
                <User size={13} /> Hi, {user.name.split(" ")[0]}
              </span>
              <button onClick={signOut} className="cursor-pointer transition-colors hover:text-accent">
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-accent"
            >
              <User size={13} /> Register or Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
