import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import Reveal from "../components/Reveal";
import { User, Clock, ArrowRight } from "../components/Icons";

export default function Blog() {
  return (
    <main className="bg-white">
      <div className="bg-charcoal py-12">
        <div className="container-x text-center">
          <h1 className="text-3xl font-bold uppercase text-white sm:text-4xl">From the Blog</h1>
          <p className="mt-3 text-sm text-white/60">Guides, workshop tips and tool know-how</p>
        </div>
      </div>

      <div className="container-x grid gap-8 py-14 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.id} delay={i * 100}>
            <article className="group flex h-full flex-col border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <Link to={`/blog/${post.id}`} className="block overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-4 text-xs text-body">
                  <span className="flex items-center gap-1.5"><User size={13} /> {post.author}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} /> {post.date}</span>
                </div>
                <h2 className="mt-3 text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-body">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.id}`}
                  className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-accent"
                >
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
