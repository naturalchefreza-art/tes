import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import { Filter } from "../components/Icons";

const sorts = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Top Rated",
  name: "Name A–Z",
};

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat") || "All";
  const q = params.get("q") || "";
  const saleOnly = params.get("sale") === "1";

  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(650);
  const [search, setSearch] = useState(q);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const setCat = (c) => updateParam("cat", c === "All" ? "" : c);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (cat !== "All") list = list.filter((p) => p.category === cat);
    if (saleOnly) list = list.filter((p) => p.oldPrice);
    const s = search.trim().toLowerCase();
    if (s) list = list.filter((p) => p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [cat, saleOnly, search, sort, maxPrice, params]);

  return (
    <main className="bg-light">
      <div className="bg-charcoal py-12">
        <div className="container-x text-center text-white">
          <h1 className="text-3xl font-bold uppercase sm:text-4xl">
            {saleOnly ? "Hot Deals" : "Shop"}
            {cat !== "All" && <span className="text-accent"> · {cat}</span>}
          </h1>
          <p className="mt-3 text-sm text-white/60">
            {filtered.length} product{filtered.length === 1 ? "" : "s"} — professional equipment in stock
          </p>
        </div>
      </div>

      <div className="container-x grid gap-8 py-12 lg:grid-cols-[260px_1fr]">
        {/* Filters sidebar */}
        <aside className="space-y-8" aria-label="Product filters">
          <div className="border border-gray-100 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink">
              <Filter size={15} /> Filters
            </h2>

            <label htmlFor="shop-search" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink">
              Search
            </label>
            <input
              id="shop-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="input mb-5"
            />

            <h3 className="mb-2.5 text-xs font-medium uppercase tracking-wide text-ink">Category</h3>
            <ul className="mb-5 space-y-1.5">
              {["All", ...categories].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setCat(c)}
                    aria-pressed={cat === c}
                    className={`w-full cursor-pointer rounded px-3 py-1.5 text-left text-sm transition-colors ${
                      cat === c ? "bg-accent/15 font-semibold text-ink" : "text-body hover:bg-light hover:text-ink"
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-ink">
              Max price: <span className="text-accent">${maxPrice}</span>
            </h3>
            <input
              type="range"
              min={10}
              max={650}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#FFC107]"
              aria-label="Maximum price"
            />

            <label className="mt-5 flex cursor-pointer items-center gap-2.5 text-sm text-body">
              <input
                type="checkbox"
                checked={saleOnly}
                onChange={(e) => updateParam("sale", e.target.checked ? "1" : "")}
                className="h-4 w-4 accent-[#FFC107]"
              />
              On sale only
            </label>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-body">
              Showing <span className="font-semibold text-ink">{filtered.length}</span> products
            </p>
            <label className="flex items-center gap-2 text-sm text-body">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="cursor-pointer border border-gray-200 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-accent"
                aria-label="Sort products"
              >
                {Object.entries(sorts).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="border border-gray-100 bg-white py-20 text-center">
              <p className="text-sm text-body">No products match your filters.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setMaxPrice(650);
                  setParams(new URLSearchParams(), { replace: true });
                }}
                className="btn-yellow mt-5"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 3) * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
