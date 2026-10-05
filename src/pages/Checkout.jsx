import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { productById } from "../data/products";
import { Check } from "../components/Icons";

const initial = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
  country: "",
  payment: "card",
  card: "",
  expiry: "",
  cvc: "",
};

export default function Checkout() {
  const { cart, dispatch, format } = useStore();
  const [form, setForm] = useState(initial);
  const [orderNo, setOrderNo] = useState(null);

  const lines = cart.map((l) => ({ ...l, product: productById(l.id) })).filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal >= 150 ? 0 : 12;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setOrderNo(`ARM-${Math.floor(100000 + Math.random() * 900000)}`);
    dispatch({ type: "clear" });
    window.scrollTo(0, 0);
  };

  if (orderNo) {
    return (
      <main className="container-x flex flex-col items-center py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-ink">
          <Check size={28} />
        </span>
        <h1 className="mt-6 text-3xl font-bold text-ink">Order Confirmed</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-body">
          Thank you! Your order <span className="font-semibold text-ink">{orderNo}</span> has been
          placed. A confirmation email is on its way, and your tools will ship within 24 hours.
        </p>
        <Link to="/shop" className="btn-yellow mt-8">Continue Shopping</Link>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className="container-x py-24 text-center">
        <h1 className="text-2xl font-bold text-ink">Nothing to check out</h1>
        <p className="mt-2 text-sm text-body">Your bag is empty.</p>
        <Link to="/shop" className="btn-yellow mt-6">Browse Products</Link>
      </main>
    );
  }

  return (
    <main className="bg-light">
      <div className="bg-charcoal py-12">
        <div className="container-x text-center">
          <h1 className="text-3xl font-bold uppercase text-white sm:text-4xl">Checkout</h1>
        </div>
      </div>

      <div className="container-x grid gap-8 py-12 lg:grid-cols-[1fr_380px]">
        <form onSubmit={submit} className="border border-gray-100 bg-white p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">Contact & Shipping</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="co-name" className="mb-1.5 block text-xs font-medium uppercase text-ink">Full name</label>
              <input id="co-name" required value={form.name} onChange={set("name")} className="input" />
            </div>
            <div>
              <label htmlFor="co-email" className="mb-1.5 block text-xs font-medium uppercase text-ink">Email</label>
              <input id="co-email" type="email" required value={form.email} onChange={set("email")} className="input" />
            </div>
            <div>
              <label htmlFor="co-phone" className="mb-1.5 block text-xs font-medium uppercase text-ink">Phone</label>
              <input id="co-phone" type="tel" required value={form.phone} onChange={set("phone")} className="input" />
            </div>
            <div>
              <label htmlFor="co-city" className="mb-1.5 block text-xs font-medium uppercase text-ink">City</label>
              <input id="co-city" required value={form.city} onChange={set("city")} className="input" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="co-address" className="mb-1.5 block text-xs font-medium uppercase text-ink">Street address</label>
              <input id="co-address" required value={form.address} onChange={set("address")} className="input" />
            </div>
            <div>
              <label htmlFor="co-zip" className="mb-1.5 block text-xs font-medium uppercase text-ink">ZIP / Postal code</label>
              <input id="co-zip" required value={form.zip} onChange={set("zip")} className="input" />
            </div>
            <div>
              <label htmlFor="co-country" className="mb-1.5 block text-xs font-medium uppercase text-ink">Country</label>
              <input id="co-country" required value={form.country} onChange={set("country")} className="input" />
            </div>
          </div>

          <h2 className="mt-8 text-sm font-semibold uppercase tracking-wider text-ink">Payment</h2>
          <div className="mt-4 space-y-3">
            {[
              { v: "card", label: "Credit / Debit Card" },
              { v: "paypal", label: "PayPal" },
              { v: "cod", label: "Cash on Delivery" },
            ].map((p) => (
              <label key={p.v} className="flex cursor-pointer items-center gap-3 border border-gray-200 px-4 py-3 text-sm text-ink transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5">
                <input
                  type="radio"
                  name="payment"
                  value={p.v}
                  checked={form.payment === p.v}
                  onChange={set("payment")}
                  className="h-4 w-4 accent-[#FFC107]"
                />
                {p.label}
              </label>
            ))}
          </div>

          {form.payment === "card" && (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-3">
                <label htmlFor="co-card" className="mb-1.5 block text-xs font-medium uppercase text-ink">Card number</label>
                <input id="co-card" required inputMode="numeric" placeholder="4242 4242 4242 4242" value={form.card} onChange={set("card")} className="input" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="co-expiry" className="mb-1.5 block text-xs font-medium uppercase text-ink">Expiry</label>
                <input id="co-expiry" required placeholder="MM / YY" value={form.expiry} onChange={set("expiry")} className="input" />
              </div>
              <div>
                <label htmlFor="co-cvc" className="mb-1.5 block text-xs font-medium uppercase text-ink">CVC</label>
                <input id="co-cvc" required inputMode="numeric" placeholder="123" value={form.cvc} onChange={set("cvc")} className="input" />
              </div>
            </div>
          )}

          <button type="submit" className="btn-yellow mt-8 w-full">
            Place Order — {format(subtotal + shipping)}
          </button>
          <p className="mt-3 text-center text-xs text-body">
            Demo checkout — no real payment is processed.
          </p>
        </form>

        <aside className="h-fit border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">Your Order</h2>
          <ul className="mt-5 divide-y divide-gray-100">
            {lines.map((l) => (
              <li key={l.id} className="flex items-center gap-3 py-3">
                <img src={l.product.image} alt="" className="h-12 w-12 object-cover" />
                <span className="flex-1 text-sm text-ink">
                  {l.product.name} <span className="text-body">× {l.qty}</span>
                </span>
                <span className="text-sm font-semibold text-ink">{format(l.product.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-body">Subtotal</dt>
              <dd className="text-ink">{format(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-body">Shipping</dt>
              <dd className="text-ink">{shipping === 0 ? "Free" : format(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-ink">
              <dt>Total</dt>
              <dd>{format(subtotal + shipping)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </main>
  );
}
