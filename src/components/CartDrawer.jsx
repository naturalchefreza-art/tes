import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { productById } from "../data/products";
import { X, Plus, Minus, Trash, Bag, ArrowRight } from "./Icons";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, dispatch, format } = useStore();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [cartOpen]);

  const lines = cart.map((l) => ({ ...l, product: productById(l.id) })).filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-[90%] max-w-md flex-col bg-white shadow-card transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping bag"
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2 className="flex items-center gap-2 text-base font-semibold uppercase tracking-wide text-ink">
            <Bag size={18} /> Shopping Bag
          </h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close bag" className="cursor-pointer rounded-full p-2 transition-colors hover:bg-light">
            <X />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <Bag size={44} className="text-gray-300" />
            <p className="text-sm text-body">Your bag is empty.</p>
            <Link to="/shop" onClick={() => setCartOpen(false)} className="btn-yellow">
              Start Shopping <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-gray-100 overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.id} className="flex gap-4 py-5">
                  <Link to={`/product/${l.product.id}`} onClick={() => setCartOpen(false)}>
                    <img src={l.product.image} alt={l.product.name} className="h-20 w-20 rounded object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${l.product.id}`}
                        onClick={() => setCartOpen(false)}
                        className="text-sm font-medium text-ink transition-colors hover:text-accent"
                      >
                        {l.product.name}
                      </Link>
                      <button
                        onClick={() => dispatch({ type: "remove", id: l.id })}
                        aria-label={`Remove ${l.product.name}`}
                        className="cursor-pointer p-1 text-body transition-colors hover:text-red-500"
                      >
                        <Trash size={15} />
                      </button>
                    </div>
                    <span className="mt-0.5 text-xs text-body">{format(l.product.price)}</span>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => dispatch({ type: "setQty", id: l.id, qty: l.qty - 1 })}
                          aria-label="Decrease quantity"
                          className="cursor-pointer p-1.5 transition-colors hover:bg-light"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-sm text-ink">{l.qty}</span>
                        <button
                          onClick={() => dispatch({ type: "setQty", id: l.id, qty: l.qty + 1 })}
                          aria-label="Increase quantity"
                          className="cursor-pointer p-1.5 transition-colors hover:bg-light"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-ink">
                        {format(l.product.price * l.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-200 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-body">Subtotal</span>
                <span className="text-lg font-bold text-ink">{format(subtotal)}</span>
              </div>
              <p className="mb-4 text-xs text-body">Shipping and taxes calculated at checkout.</p>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/cart" onClick={() => setCartOpen(false)} className="btn-dark">
                  View Bag
                </Link>
                <Link to="/checkout" onClick={() => setCartOpen(false)} className="btn-yellow">
                  Checkout <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
