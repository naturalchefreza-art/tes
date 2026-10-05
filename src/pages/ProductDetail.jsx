import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products, productById } from "../data/products";
import { useStore } from "../store/StoreContext";
import ProductCard from "../components/ProductCard";
import RatingStars from "../components/RatingStars";
import { Bag, Heart, Check, Truck, Shield, ChevronRight } from "../components/Icons";

export default function ProductDetail() {
  const { id } = useParams();
  const product = productById(id);
  const { format, addToCart, inWishlist, toggleWishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState("description");

  if (!product) {
    return (
      <main className="container-x py-24 text-center">
        <h1 className="text-2xl font-bold text-ink">Product not found</h1>
        <Link to="/shop" className="btn-yellow mt-6">Back to Shop</Link>
      </main>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const tabs = {
    description: (
      <div className="space-y-4 text-sm leading-relaxed text-body">
        <p>{product.description}</p>
        {product.oldPrice && (
          <p className="font-semibold text-ink">
            Save {format(product.oldPrice - product.price)} ({Math.round((1 - product.price / product.oldPrice) * 100)}%) — limited offer.
          </p>
        )}
      </div>
    ),
    features: (
      <ul className="space-y-2.5">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-body">
            <Check size={16} className="mt-0.5 shrink-0 text-accent" /> {f}
          </li>
        ))}
      </ul>
    ),
    specs: (
      <table className="w-full max-w-md text-sm">
        <tbody>
          {Object.entries(product.specs).map(([k, v]) => (
            <tr key={k} className="border-b border-gray-100">
              <td className="py-2.5 pr-6 font-medium text-ink">{k}</td>
              <td className="py-2.5 text-body">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  };

  return (
    <main className="bg-white">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-gray-100 bg-light">
        <div className="container-x flex items-center gap-2 py-4 text-xs text-body">
          <Link to="/" className="hover:text-accent">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-accent">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?cat=${encodeURIComponent(product.category)}`} className="hover:text-accent">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="font-medium text-ink">{product.name}</span>
        </div>
      </nav>

      <div className="container-x grid gap-10 py-12 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden bg-light">
            <img
              key={active}
              src={product.gallery[active]}
              alt={product.name}
              className="aspect-[4/3] w-full object-cover"
            />
            {product.badge && (
              <span className="absolute left-0 top-5 bg-accent px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-ink">
                {product.badge}
              </span>
            )}
          </div>
          <div className="mt-4 flex gap-3" role="tablist" aria-label="Product images">
            {product.gallery.map((g, i) => (
              <button
                key={g}
                role="tab"
                aria-selected={active === i}
                aria-label={`Image ${i + 1}`}
                onClick={() => setActive(i)}
                className={`overflow-hidden border-2 transition-colors ${
                  active === i ? "border-accent" : "border-transparent hover:border-gray-300"
                }`}
              >
                <img src={g} alt="" className="h-20 w-20 object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-body">{product.category}</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-ink">{product.name}</h1>
          <div className="mt-3">
            <RatingStars rating={product.rating} reviews={product.reviews} size={15} />
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-ink">{format(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xl text-body line-through">{format(product.oldPrice)}</span>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-body">{product.short}</p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-gray-200">
              <button
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                aria-label="Decrease quantity"
                className="cursor-pointer px-4 py-3.5 text-ink transition-colors hover:bg-light"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold text-ink" aria-live="polite">{qty}</span>
              <button
                onClick={() => setQty((n) => Math.min(99, n + 1))}
                aria-label="Increase quantity"
                className="cursor-pointer px-4 py-3.5 text-ink transition-colors hover:bg-light"
              >
                +
              </button>
            </div>
            <button onClick={() => addToCart(product.id, qty)} className="btn-yellow flex-1 sm:flex-none">
              <Bag size={16} /> Add to Bag
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={inWishlist(product.id)}
              aria-label={inWishlist(product.id) ? "Remove from wishlist" : "Save to wishlist"}
              className={`cursor-pointer border border-gray-200 p-3.5 transition-all hover:border-accent ${
                inWishlist(product.id) ? "text-red-500" : "text-ink"
              }`}
            >
              <Heart size={18} fill={inWishlist(product.id) ? "currentColor" : "none"} />
            </button>
          </div>

          <ul className="mt-8 space-y-2.5 border-t border-gray-100 pt-6 text-xs text-body">
            <li className="flex items-center gap-2.5">
              <Truck size={15} className="text-accent" /> Free worldwide shipping on orders over $150
            </li>
            <li className="flex items-center gap-2.5">
              <Shield size={15} className="text-accent" /> 2-year warranty & 30-day returns
            </li>
            <li className="flex items-center gap-2.5">
              <Check size={15} className="text-accent" /> In stock — ships within 24 hours
            </li>
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="container-x pb-12">
        <div className="border-b border-gray-200" role="tablist" aria-label="Product information">
          {Object.keys(tabs).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`-mb-px cursor-pointer border-b-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                tab === t ? "border-accent text-ink" : "border-transparent text-body hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="pt-6">{tabs[tab]}</div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="border-t border-gray-100 bg-light py-14">
          <div className="container-x">
            <h2 className="h-section mb-8 text-center">You May Also Like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
