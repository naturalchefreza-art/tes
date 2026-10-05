import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { products } from "../data/products";
import { Search, X, ArrowRight } from "./Icons";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, format } = useStore();
  const [q, setQ] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
    setQ("");
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return products
      .filter((p) => p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s))
      .slice(0, 6);
  }, [q]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label="Product search">
      <div className="absolute inset-0 bg-black/60" onClick={() => setSearchOpen(false)} />
      <div className="relative mx-auto w-full max-w-2xl bg-white p-6 shadow-card sm:mt-24 sm:rounded-md">
        <div className="flex items-center gap-3 border-b-2 border-accent pb-3">
          <Search size={20} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for drills, saws, safety gear…"
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-body/60"
            aria-label="Search products"
          />
          <button onClick={() => setSearchOpen(false)} aria-label="Close search" className="cursor-pointer p-1 text-body hover:text-ink">
            <X />
          </button>
        </div>

        {q && (
          <div className="mt-4 max-h-[50vh] overflow-y-auto">
            {results.length === 0 ? (
              <p className="py-6 text-center text-sm text-body">No products found for “{q}”.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/product/${p.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="group flex items-center gap-4 py-3 transition-colors hover:bg-light"
                    >
                      <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        className="h-14 w-14 rounded object-cover"
                      />
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-ink group-hover:text-accent">{p.name}</span>
                        <span className="text-xs text-body">{p.category}</span>
                      </span>
                      <span className="text-sm font-semibold text-ink">{format(p.price)}</span>
                      <ArrowRight size={16} className="text-body group-hover:text-accent" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
