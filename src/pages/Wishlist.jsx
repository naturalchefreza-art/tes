import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { productById } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Heart, ArrowRight } from "../components/Icons";

export default function Wishlist() {
  const { wishlist } = useStore();
  const items = wishlist.map(productById).filter(Boolean);

  return (
    <main className="bg-light">
      <div className="bg-charcoal py-12">
        <div className="container-x text-center">
          <h1 className="text-3xl font-bold uppercase text-white sm:text-4xl">My Wishlist</h1>
          <p className="mt-3 text-sm text-white/60">{items.length} saved item{items.length === 1 ? "" : "s"}</p>
        </div>
      </div>

      <div className="container-x py-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center border border-gray-100 bg-white py-20 text-center">
            <Heart size={44} className="text-gray-300" />
            <p className="mt-4 text-sm text-body">Nothing saved yet. Tap the heart on any product to keep it here.</p>
            <Link to="/shop" className="btn-yellow mt-6">
              Browse Products <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
