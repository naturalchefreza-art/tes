import { useState } from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import Reveal from "./Reveal";
import { ArrowRight, User, Clock } from "./Icons";

export default function BlogSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="blog-heading">
      <div className="container-x">
        <Reveal className="mb-10 text-center">
          <p className="section-label justify-center">Our Blog</p>
          <h2 id="blog-heading" className="h-section">Latest Blog Posts</h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 100}>
              <article
                className="group h-full border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                onMouseLeave={() => setExpanded(null)}
              >
                <Link to={`/blog/${post.id}`} className="block overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-body">
                    <span className="flex items-center gap-1.5">
                      <User size={13} /> {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} /> {post.date}
                    </span>
                  </div>
                  <h3
                    className="mt-3 text-base font-semibold leading-snug text-ink transition-colors group-hover:text-accent cursor-pointer"
                    onClick={() => setExpanded(expanded === post.id ? null : post.id)}
                  >
                    {post.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed text-body transition-all ${
                      expanded === post.id ? "hidden" : "line-clamp-2"
                    }`}
                  >
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-accent"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
