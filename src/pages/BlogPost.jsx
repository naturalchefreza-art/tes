import { Link, useParams } from "react-router-dom";
import { posts } from "../data/posts";
import { User, Clock, ChevronRight, ArrowRight } from "../components/Icons";

export default function BlogPost() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <main className="container-x py-24 text-center">
        <h1 className="text-2xl font-bold text-ink">Post not found</h1>
        <Link to="/blog" className="btn-yellow mt-6">Back to Blog</Link>
      </main>
    );
  }

  const others = posts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <main className="bg-white">
      <nav aria-label="Breadcrumb" className="border-b border-gray-100 bg-light">
        <div className="container-x flex items-center gap-2 py-4 text-xs text-body">
          <Link to="/" className="hover:text-accent">Home</Link>
          <ChevronRight size={12} />
          <Link to="/blog" className="hover:text-accent">Blog</Link>
          <ChevronRight size={12} />
          <span className="font-medium text-ink">{post.title}</span>
        </div>
      </nav>

      <article className="container-x max-w-3xl py-12">
        <h1 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">{post.title}</h1>
        <div className="mt-4 flex items-center gap-5 text-xs text-body">
          <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {post.date}</span>
        </div>
        <img
          src={post.image}
          alt={post.title}
          className="mt-8 aspect-[16/9] w-full object-cover"
        />
        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-body">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      <div className="border-t border-gray-100 bg-light py-14">
        <div className="container-x">
          <h2 className="h-section mb-8 text-center">More From the Blog</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:max-w-3xl lg:mx-auto">
            {others.map((p) => (
              <article key={p.id} className="group border border-gray-100 bg-white">
                <Link to={`/blog/${p.id}`} className="block overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="p-5">
                  <h3 className="font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
                    <Link to={`/blog/${p.id}`}>{p.title}</Link>
                  </h3>
                  <Link
                    to={`/blog/${p.id}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink hover:text-accent"
                  >
                    Read <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
