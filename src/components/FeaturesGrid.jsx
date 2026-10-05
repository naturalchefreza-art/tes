import { Truck, Return, Shield, Headset } from "./Icons";

const items = [
  { icon: Truck, title: "Free Worldwide Shipping", text: "On all orders over $150" },
  { icon: Return, title: "Easy & Fast 30 Days Returns", text: "30 days money back guarantee" },
  { icon: Shield, title: "100% Secure Payment", text: "All payment methods accepted" },
  { icon: Headset, title: "24/7 Customer Help", text: "Dedicated support team" },
];

export default function FeaturesGrid({ compact = false }) {
  return (
    <section
      id="features"
      className={`border-y border-gray-100 bg-white ${compact ? "py-10" : "py-14"}`}
      aria-label="Store benefits"
    >
      <div className="container-x grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="group flex items-center gap-4"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-light text-ink transition-colors duration-300 group-hover:bg-accent">
              <Icon size={24} />
            </span>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink transition-colors group-hover:text-accent">
                {title}
              </h3>
              <p className="mt-1 text-xs text-body">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
