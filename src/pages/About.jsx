import { Shield, Truck, Headset } from "../components/Icons";
import Reveal from "../components/Reveal";

const stats = [
  { v: "12k+", l: "Orders shipped" },
  { v: "40+", l: "Pro brands" },
  { v: "24h", l: "Dispatch time" },
  { v: "4.8★", l: "Average rating" },
];

const values = [
  {
    icon: Shield,
    title: "Only Real Pro Gear",
    text: "Every product we stock is field-tested by working tradespeople before it earns a place on our shelves.",
  },
  {
    icon: Truck,
    title: "Fast, Careful Delivery",
    text: "Free worldwide shipping over $150, expertly packed, with 24-hour dispatch on in-stock items.",
  },
  {
    icon: Headset,
    title: "Advice That Builds",
    text: "Our team is made of builders and makers. Call us and a human who uses the tools will answer.",
  },
];

export default function About() {
  return (
    <main className="bg-white">
      <div className="bg-charcoal py-12">
        <div className="container-x text-center">
          <h1 className="text-3xl font-bold uppercase text-white sm:text-4xl">About Us</h1>
          <p className="mt-3 text-sm text-white/60">The crew behind the tools</p>
        </div>
      </div>

      <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-2">
        <Reveal>
          <p className="section-label">Our Story</p>
          <h2 className="h-section">Built By Tradespeople, For Tradespeople</h2>
          <p className="mt-5 text-sm leading-relaxed text-body">
            Armania started in 2014 in a two-bay garage in Chicago, repairing and reselling
            jobsite equipment that tradespeople actually relied on. Ten years later we ship
            pro-grade tools worldwide — but the rule hasn't changed: if we wouldn't use it
            on our own sites, we don't sell it.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-body">
            We stock carefully selected brands, service what we sell, and answer the phone
            when you need advice on the right blade, the right battery, or the right ladder
            for the job.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l}>
                <dt className="sr-only">{s.l}</dt>
                <dd className="text-2xl font-extrabold text-ink">{s.v}</dd>
                <dd className="mt-1 text-xs uppercase tracking-wide text-body">{s.l}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={150} className="grid grid-cols-2 gap-4">
          <img src="/images/worker2.jpg" alt="Builder on site" className="aspect-[3/4] w-full rounded-lg object-cover" loading="lazy" />
          <img src="/images/toolbelt1.jpg" alt="Tool belt close-up" className="mt-8 aspect-[3/4] w-full rounded-lg object-cover" loading="lazy" />
        </Reveal>
      </div>

      <section className="bg-light py-16" aria-label="Our values">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="border border-gray-100 bg-white p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-ink">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
