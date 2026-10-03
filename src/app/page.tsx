import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
import { getProductsForHome } from "@/lib/products";

const collections = [
  {
    title: "Quiet forms",
    eyebrow: "The new collection",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1400&q=85",
    alt: "Neutral clothing arranged in a quiet studio",
  },
  {
    title: "Objects in balance",
    eyebrow: "Home and daily ritual",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=85",
    alt: "Sculptural chair and objects in a calm interior",
  },
  {
    title: "A softer light",
    eyebrow: "The journal",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85",
    alt: "Fashion portrait in soft natural light",
  },
];

function SearchIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path d="M5.5 8.5h13l1 12h-15l1-12Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default async function Home() {
  const products = await getProductsForHome();

  return (
    <main className="bg-canvas text-body">
      <div className="border-b border-border bg-accent px-4 py-2 text-center text-xs tracking-[0.16em] text-on-accent">
        Complimentary delivery on orders over $150
      </div>

      <header className="sticky top-0 z-30 border-b border-border bg-canvas/95">
        <div className="container-page flex min-h-20 items-center justify-between gap-6">
          <MobileMenu />

          <Link className="font-display text-xl font-medium tracking-[0.16em] text-ink" href="/">
            ATELIER
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-8 text-xs uppercase tracking-[0.14em] text-ink md:flex">
            <Link className="transition-colors hover:text-accent" href="#new-arrivals">New arrivals</Link>
            <Link className="transition-colors hover:text-accent" href="#collections">Collections</Link>
            <Link className="transition-colors hover:text-accent" href="#journal">Journal</Link>
          </nav>

          <div className="flex items-center gap-1 text-ink">
            <button aria-label="Search" className="button !min-h-11 !w-11 !p-0" type="button"><SearchIcon /></button>
            <Link aria-label="Shopping bag" className="button !min-h-11 !w-11 !p-0" href="#bag"><BagIcon /></Link>
          </div>
        </div>
      </header>

      <section className="container-page grid min-h-[calc(100svh-9rem)] items-stretch gap-8 py-6 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:py-10" aria-labelledby="hero-title">
        <div className="flex flex-col justify-center py-10 md:py-20">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted">Autumn / Winter 2026</p>
          <h1 className="max-w-xl font-display text-display font-medium leading-[0.92] tracking-[-0.055em] text-ink" id="hero-title">
            Made for the considered life.
          </h1>
          <p className="mt-8 max-w-md text-base leading-7 text-body">
            Essential forms, thoughtful materials, and everyday pieces designed to stay with you.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link className="button button-primary" href="#new-arrivals">Explore the collection</Link>
            <Link className="button button-secondary" href="#journal">Read our journal</Link>
          </div>
          <p className="mt-16 max-w-xs border-l border-border-strong pl-4 text-sm leading-6 text-muted">
            Designed in small, intentional editions. Made to be worn often.
          </p>
        </div>

        <div className="relative min-h-[30rem] overflow-hidden bg-surface-subtle md:min-h-0">
          <Image
            alt="Model wearing a minimal dark outfit in warm natural light"
            className="object-cover object-center"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1800&q=90"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/45 to-transparent p-6 pt-24 text-white md:p-8 md:pt-32">
            <span className="text-xs uppercase tracking-[0.16em]">Look 01</span>
            <span className="text-xs uppercase tracking-[0.16em]">View story ↗</span>
          </div>
        </div>
      </section>

      <section className="section-space" id="collections" aria-labelledby="collections-title">
        <div className="container-page">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">Explore</p>
              <h2 className="font-display text-3xl font-medium tracking-[-0.035em] text-ink md:text-4xl" id="collections-title">A point of view</h2>
            </div>
            <Link className="link-editorial hidden text-sm md:inline" href="#journal">View all stories</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-[1.12fr_0.88fr] md:grid-rows-2">
            {collections.map((collection, index) => (
              <Link className={`group ${index === 0 ? "md:row-span-2" : ""}`} href="#journal" key={collection.title}>
                <div className={`image-frame relative overflow-hidden ${index === 0 ? "aspect-[0.82] md:h-full" : "aspect-[1.4]"}`}>
                  <Image alt={collection.alt} className="object-cover" fill sizes="(max-width: 768px) 100vw, 55vw" src={collection.image} />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted">{collection.eyebrow}</p>
                <h3 className="mt-2 font-display text-2xl tracking-[-0.025em] text-ink">{collection.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16 md:py-24" id="new-arrivals" aria-labelledby="arrivals-title">
        <div className="container-page">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">Selected pieces</p>
              <h2 className="font-display text-3xl font-medium tracking-[-0.035em] text-ink md:text-4xl" id="arrivals-title">New arrivals</h2>
            </div>
            <Link className="link-editorial hidden text-sm md:inline" href="#shop-all">Shop all</Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-5">
            {products.map((product) => (
              <article key={product.name}>
                <Link className="group block" href={`/products/${product.slug}`}>
                  <div className="image-frame relative aspect-[0.78]">
                    <Image alt={product.alt} className="object-cover" fill sizes="(max-width: 768px) 50vw, 25vw" src={product.image} />
                    <span className="absolute left-3 top-3 bg-canvas px-2 py-1 text-[0.625rem] uppercase tracking-[0.14em] text-ink">New</span>
                    <span className="absolute inset-x-3 bottom-3 translate-y-2 bg-canvas/95 px-3 py-3 text-center text-[0.625rem] uppercase tracking-[0.16em] text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">View piece</span>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3 text-sm">
                    <div>
                      <h3 className="text-ink">{product.name}</h3>
                      <p className="mt-1 text-xs text-muted">{product.category}</p>
                    </div>
                    <p className="whitespace-nowrap text-ink">{product.price}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section-space" id="journal" aria-labelledby="journal-title">
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-20">
          <div className="relative aspect-[1.18] overflow-hidden bg-surface-subtle">
            <Image alt="Sunlit architectural shapes and shadows" className="object-cover" fill sizes="(max-width: 768px) 100vw, 60vw" src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85" />
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted">From the journal</p>
            <h2 className="font-display text-3xl font-medium leading-tight tracking-[-0.035em] text-ink md:text-5xl" id="journal-title">The beauty of less, considered fully.</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-body">A closer look at the spaces, materials, and rituals behind our latest collection.</p>
            <Link className="button button-secondary mt-8" href="#read-story">Read the story</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface" aria-label="Atelier services">
        <div className="container-page grid divide-y divide-border py-2 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="px-0 py-7 md:px-8 md:py-10 md:first:pl-0">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">01 / Delivery</p>
            <p className="mt-3 font-display text-xl text-ink">Complimentary delivery</p>
            <p className="mt-2 text-sm text-muted">On every order over $150.</p>
          </div>
          <div className="px-0 py-7 md:px-8 md:py-10">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">02 / Materials</p>
            <p className="mt-3 font-display text-xl text-ink">Made to last</p>
            <p className="mt-2 text-sm text-muted">Thoughtful materials, selected slowly.</p>
          </div>
          <div className="px-0 py-7 md:px-8 md:py-10 md:last:pr-0">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">03 / Support</p>
            <p className="mt-3 font-display text-xl text-ink">Here when needed</p>
            <p className="mt-2 text-sm text-muted">Personal guidance from our team.</p>
          </div>
        </div>
      </section>

      <section className="bg-accent py-16 text-on-accent md:py-24" aria-labelledby="newsletter-title">
        <div className="container-page grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-on-accent/70">Stay close</p>
            <h2 className="max-w-lg font-display text-3xl font-medium leading-tight tracking-[-0.035em] md:text-5xl" id="newsletter-title">Notes from the atelier.</h2>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" action="#subscribe" method="post">
            <label className="sr-only" htmlFor="email">Email address</label>
            <input className="min-h-12 flex-1 border border-on-accent/50 bg-transparent px-4 text-sm text-on-accent outline-none placeholder:text-on-accent/60 focus:border-on-accent" id="email" name="email" placeholder="Your email address" type="email" />
            <button className="button min-h-12 border-on-accent bg-on-accent text-accent hover:bg-canvas" type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border bg-canvas py-10">
        <div className="container-page flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Link className="font-display text-lg tracking-[0.16em] text-ink" href="/">ATELIER</Link>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.14em] text-muted">
            <Link className="hover:text-ink" href="#about">About</Link>
            <Link className="hover:text-ink" href="#contact">Contact</Link>
            <Link className="hover:text-ink" href="#shipping">Shipping and returns</Link>
            <Link className="hover:text-ink" href="#privacy">Privacy</Link>
          </nav>
          <p className="text-xs text-muted">© 2026 Atelier Store</p>
        </div>
      </footer>
    </main>
  );
}
