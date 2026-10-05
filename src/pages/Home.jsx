import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { products, categories, dealOfWeek } from "../data/products";
import ProductCard from "../components/ProductCard";
import ProductCarousel from "../components/ProductCarousel";
import CountdownTimer from "../components/CountdownTimer";
import FeaturesGrid from "../components/FeaturesGrid";
import BlogSection from "../components/BlogSection";
import Reveal from "../components/Reveal";
import { Wifi, Battery, Sparkle, ArrowRight, ChevronRight } from "../components/Icons";

function PromoCard({ icon: Icon, title, text, image, alt }) {
  return (
    <Reveal className="group flex items-center gap-4 border border-gray-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="flex-1">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-light text-ink transition-colors group-hover:bg-accent">
          <Icon size={20} />
        </span>
        <h3 className="mt-3 text-sm font-bold uppercase tracking-wide text-ink">{title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-body">{text}</p>
      </div>
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="h-24 w-24 shrink-0 rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </Reveal>
  );
}

function CategoryCard({ title, links, image }) {
  return (
    <div className="relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden bg-charcoal p-7">
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20" />
      <div className="relative">
        <h3 className="text-xl font-bold uppercase tracking-wide text-white">{title}</h3>
        <ul className="mt-4 space-y-2">
          {links.map((l) => (
            <li key={l}>
              <Link
                to={`/shop?cat=${encodeURIComponent(title)}&q=${encodeURIComponent(l)}`}
                className="flex items-center gap-1.5 text-sm text-white/75 transition-colors hover:text-accent"
              >
                <ChevronRight size={13} className="text-accent" /> {l}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to={`/shop?cat=${encodeURIComponent(title)}`}
          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent hover:gap-3.5 transition-all"
        >
          Shop {title} <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const { format } = useStore();
  const saleItems = products.filter((p) => p.oldPrice).slice(0, 7);
  const bestSelling = products.filter((p) => p.rating >= 4.7).slice(0, 3);
  const topRated = products.filter((p) => p.reviews >= 95).slice(0, 3);

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-light" aria-label="Featured promotion">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-x grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="relative z-10 text-center lg:text-left">
            <Reveal>
              <p className="section-label justify-center lg:justify-start">New season · Pro equipment</p>
              <h1 className="text-4xl font-extrabold uppercase leading-[1.08] text-ink sm:text-5xl xl:text-[3.6rem]">
                Mega Discount On{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Handyman</span>
                  <span className="absolute inset-x-0 bottom-1 z-0 h-3 bg-accent" aria-hidden="true" />
                </span>{" "}
                Equipments
              </h1>
              <p className="mx-auto mt-5 max-w-md text-base font-medium text-body lg:mx-0 lg:text-lg">
                Combo Pack in <span className="text-accent">70% Off</span>
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-body lg:mx-0">
                Professional-grade power tools, hand tools and safety gear — built for the
                jobsite, priced for everyone.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link to="/shop" className="btn-yellow">
                  Purchase Now <ArrowRight size={15} />
                </Link>
                <Link to="/shop?sale=1" className="btn-dark">
                  View Deals
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} className="relative">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/images/worker1.jpg"
                alt="Professional builders with their tools on site"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -left-3 top-6 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-accent text-ink shadow-card sm:h-28 sm:w-28">
              <span className="text-2xl font-extrabold leading-none">70%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Off</span>
            </div>
            <div className="absolute bottom-5 right-5 hidden items-center gap-2 bg-white/95 px-4 py-2.5 text-xs font-semibold text-ink shadow-card backdrop-blur sm:flex">
              <Sparkle size={14} className="text-accent" /> 12,000+ happy pros
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PROMO CARDS ============ */}
      <section className="bg-white py-14" aria-label="Product highlights">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PromoCard
            icon={Wifi}
            title="Built-in Connectivity"
            text="Tool Link telemetry keeps charge, runtime and service data on your phone."
            image="/images/drill2.jpg"
            alt="Connected brushless drill"
          />
          <PromoCard
            icon={Battery}
            title="60V Power Compatibility"
            text="One 60V battery system across every tool in the ProFlex range."
            image="/images/generator1.jpg"
            alt="High capacity battery system"
          />
          <PromoCard
            icon={Sparkle}
            title="Dust Kits Management"
            text="Integrated extraction adapters keep the air and your lungs clear."
            image="/images/grinder1.jpg"
            alt="Angle grinder with dust management"
          />
        </div>
      </section>

      {/* ============ HANDPICKED COLLECTION ============ */}
      <section className="bg-light py-16" aria-labelledby="handpicked-heading">
        <div className="container-x">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-label">Handpicked</p>
              <h2 id="handpicked-heading" className="h-section">Handpicked Collection</h2>
            </div>
            <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-accent">
              View All Products <ArrowRight size={14} />
            </Link>
          </Reveal>
          <Reveal>
            <ProductCarousel ariaLabel="Handpicked collection">
              {saleItems.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ProductCarousel>
          </Reveal>
        </div>
      </section>

      {/* ============ DEAL OF THE WEEK ============ */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="deal-heading">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="section-label">Limited time</p>
            <h2 id="deal-heading" className="h-section">
              Deal Of The <span className="text-accent">Week</span>
            </h2>
            <p className="mt-4 text-base font-semibold text-ink">{dealOfWeek.name}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-body">
              {dealOfWeek.short} Now{" "}
              <span className="font-semibold text-ink">
                {Math.round((1 - dealOfWeek.price / dealOfWeek.oldPrice) * 100)}% off
              </span>{" "}
              this week only — while stock lasts.
            </p>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-ink">{format(dealOfWeek.price)}</span>
              <span className="text-lg text-body line-through">{format(dealOfWeek.oldPrice)}</span>
            </div>
            <div className="mt-6 max-w-md">
              <CountdownTimer />
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={`/product/${dealOfWeek.id}`} className="btn-yellow">
                Buy This Deal <ArrowRight size={15} />
              </Link>
              <Link to="/shop?sale=1" className="btn-dark">
                View All Deals
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative">
            <div className="overflow-hidden bg-light">
              <img
                src={dealOfWeek.image}
                alt={dealOfWeek.name}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <span className="absolute left-0 top-6 bg-accent px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink">
              Sale
            </span>
          </Reveal>
        </div>
      </section>

      {/* ============ PERFORMANCE & PROTECT ============ */}
      <section className="bg-charcoal py-16 text-white lg:py-24" aria-labelledby="perf-heading">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden">
              <img
                src="/images/saw1.jpg"
                alt="Circular saw close-up"
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
            {/* Callouts */}
            <div className="absolute right-6 top-8 hidden flex-col gap-10 sm:flex">
              {[
                { label: "Ergonomic Handles", pos: "top-6 right-8" },
                { label: "Connectivity", pos: "top-1/2 right-14" },
                { label: "Saw Blades", pos: "bottom-8 right-6" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-ink ring-4 ring-accent/30">
                    ✓
                  </span>
                  <span className="whitespace-nowrap bg-black/50 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <p className="section-label">Performance & Protect</p>
            <h2 id="perf-heading" className="text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
              Engineered To Be Trusted On Every Cut
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              Every Armania Pro tool is designed around three principles: control in your hands,
              intelligence in the electronics, and durability in every blade and bearing.
            </p>
            <ul className="mt-8 space-y-5">
              {[
                {
                  title: "Ergonomic Handles",
                  text: "Anti-vibration grips with overmold zones keep long sessions precise and fatigue-free.",
                },
                {
                  title: "Connectivity",
                  text: "Tool Link telemetry reports charge, temperature and maintenance straight to your phone.",
                },
                {
                  title: "Saw Blades",
                  text: "Precision-tensioned carbide blades, balanced to 0.02mm for splinter-free finishes.",
                },
              ].map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
                    <Sparkle size={14} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============ BLACK FRIDAY BANNER ============ */}
      <section className="relative overflow-hidden" aria-label="Black Friday promotion">
        <img
          src="/images/toolbelt2.jpg"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/80" aria-hidden="true" />
        <div className="container-x relative flex flex-col items-center py-20 text-center text-white sm:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Black Friday</p>
            <h2 className="mt-4 text-3xl font-extrabold uppercase leading-tight sm:text-5xl">
              Handyman Tools <span className="text-accent">70% OFF</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-white/70 sm:text-base">
              The biggest weekend of the year. Pro-grade equipment at prices that won't come back.
            </p>
            <Link to="/shop?sale=1" className="btn-yellow mt-8">
              Shop the Sale <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ FEATURES GRID ============ */}
      <FeaturesGrid />

      {/* ============ BEST SELLING ============ */}
      <section className="bg-light py-16" aria-labelledby="best-heading">
        <div className="container-x">
          <Reveal className="mb-10 text-center">
            <p className="section-label justify-center">Top Rated</p>
            <h2 id="best-heading" className="h-section">Best Selling</h2>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-4">
            <CategoryCard
              title="Power Tools"
              links={["Drills", "Grinders", "Saws", "Generators"]}
              image="/images/drill2.jpg"
            />
            {bestSelling.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MOST SELLING ============ */}
      <section className="bg-light pb-16" aria-labelledby="most-heading">
        <div className="container-x">
          <Reveal className="mb-10 text-center">
            <p className="section-label justify-center">Customer Favorites</p>
            <h2 id="most-heading" className="h-section">Most Selling</h2>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-4">
            <CategoryCard
              title="Hand Tools"
              links={["Hammers", "Wrenches", "Screwdrivers", "Tool Sets"]}
              image="/images/toolbox1.jpg"
            />
            {topRated.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BLOG ============ */}
      <BlogSection />

      {/* ============ CATEGORIES QUICK NAV ============ */}
      <section className="bg-white pb-16" aria-label="Shop by category">
        <div className="container-x flex flex-wrap items-center justify-center gap-3">
          {categories.map((c) => (
            <Link
              key={c}
              to={`/shop?cat=${encodeURIComponent(c)}`}
              className="border border-gray-200 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-body transition-all hover:border-accent hover:bg-accent hover:text-ink"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
