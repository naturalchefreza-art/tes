import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import RatingStars from "./RatingStars";
import { Heart, Bag, ArrowRight } from "./Icons";

const badgeStyles = {
  SALE: "bg-accent text-ink",
  HOT: "bg-red-500 text-white",
  NEW: "bg-ink text-white",
  DEAL: "bg-accent text-ink",
};

export default function ProductCard({ product }) {
  const { format, inWishlist, toggleWishlist, addToCart } = useStore();

  return (
    <article className="group flex h-full flex-col border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative overflow-hidden bg-light">
        <Link to={`/product/${product.id}`} aria-label={product.name}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {product.badge && (
          <span
            className={`absolute left-0 top-4 px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={inWishlist(product.id) ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={inWishlist(product.id)}
          className={`absolute right-3 top-3 cursor-pointer rounded-full bg-white/95 p-2 shadow-sm transition-all hover:scale-110 ${
            inWishlist(product.id) ? "text-red-500" : "text-ink"
          }`}
        >
          <Heart size={16} fill={inWishlist(product.id) ? "currentColor" : "none"} />
        </button>
        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={() => addToCart(product.id)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 bg-ink/90 py-3 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur transition-colors hover:bg-accent hover:text-ink"
          >
            <Bag size={15} /> Add to Bag
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] uppercase tracking-[0.14em] text-body">{product.category}</span>
        <Link
          to={`/product/${product.id}`}
          className="mt-1.5 line-clamp-2 font-semibold leading-snug text-ink transition-colors hover:text-accent"
        >
          {product.name}
        </Link>
        <div className="mt-2">
          <RatingStars rating={product.rating} reviews={product.reviews} />
        </div>
        <div className="mt-3 flex items-baseline gap-2.5">
          <span className="text-lg font-bold text-ink">{format(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-body line-through">{format(product.oldPrice)}</span>
          )}
        </div>
        <Link
          to={`/product/${product.id}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-accent"
        >
          View Details <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
