import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { productById } from "../data/products";
import { Plus, Minus, Trash, Bag, ArrowRight } from "../components/Icons";

export default function CartPage() {
  const { cart, dispatch, format } = useStore();
  const lines = cart.map((l) => ({ ...l, product: productById(l.id) })).filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12;

  if (lines.length === 0) {
    return (
      <main className="container-x flex flex-col items-center py-24 text-center">
        <Bag size={48} className="text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-ink">Your bag is empty</h1>
        <p className="mt-2 text-sm text-body">Add some tools to get started.</p>
        <Link to="/shop" className="btn-yellow mt-6">
          Browse Products <ArrowRight size={15} />
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-light">
      <div className="bg-charcoal py-12">
        <div className="container-x text-center">
          <h1 className="text-3xl font-bold uppercase text-white sm:text-4xl">Shopping Bag</h1>
          <p className="mt-3 text-sm text-white/60">{lines.length} item{lines.length === 1 ? "" : "s"}</p>
        </div>
      </div>

      <div className="container-x grid gap-8 py-12 lg:grid-cols-[1fr_360px]">
        <div className="border border-gray-100 bg-white">
          <ul className="divide-y divide-gray-100">
            {lines.map((l) => (
              <li key={l.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <Link to={`/product/${l.product.id}`} className="shrink-0">
                  <img src={l.product.image} alt={l.product.name} className="h-24 w-24 object-cover" />
                </Link>
                <div className="flex-1">
                  <Link to={`/product/${l.product.id}`} className="font-semibold text-ink transition-colors hover:text-accent">
                    {l.product.name}
                  </Link>
                  <p className="mt-1 text-xs text-body">{l.product.category}</p>
                  <p className="mt-1 text-sm text-body">{format(l.product.price)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200">
                    <button
                      onClick={() => dispatch({ type: "setQty", id: l.id, qty: l.qty - 1 })}
                      aria-label="Decrease quantity"
                      className="cursor-pointer p-2 transition-colors hover:bg-light"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-sm text-ink">{l.qty}</span>
                    <button
                      onClick={() => dispatch({ type: "setQty", id: l.id, qty: l.qty + 1 })}
                      aria-label="Increase quantity"
                      className="cursor-pointer p-2 transition-colors hover:bg-light"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="w-20 text-right font-semibold text-ink">
                    {format(l.product.price * l.qty)}
                  </span>
                  <button
                    onClick={() => dispatch({ type: "remove", id: l.id })}
                    aria-label={`Remove ${l.product.name}`}
                    className="cursor-pointer p-2 text-body transition-colors hover:text-red-500"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-gray-100 p-5">
            <Link to="/shop" className="text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-accent">
              ← Continue Shopping
            </Link>
            <button
              onClick={() => dispatch({ type: "clear" })}
              className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-body transition-colors hover:text-red-500"
            >
              Clear Bag
            </button>
          </div>
        </div>

        <aside className="h-fit border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-body">Subtotal</dt>
              <dd className="font-medium text-ink">{format(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-body">Shipping</dt>
              <dd className="font-medium text-ink">{shipping === 0 ? "Free" : format(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-3 text-base">
              <dt className="font-semibold text-ink">Total</dt>
              <dd className="font-bold text-ink">{format(subtotal + shipping)}</dd>
            </div>
          </dl>
          {shipping > 0 && (
            <p className="mt-3 text-xs text-body">
              Add {format(150 - subtotal)} more for free shipping.
            </p>
          )}
          <Link to="/checkout" className="btn-yellow mt-6 w-full">
            Proceed to Checkout <ArrowRight size={15} />
          </Link>
        </aside>
      </div>
    </main>
  );
}
