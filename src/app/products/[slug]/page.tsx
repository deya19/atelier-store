import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MobileMenu } from "@/components/mobile-menu";
import { getProductBySlug, getProductSlugs } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProductSlugs();
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return {
    title: product ? `${product.name} | Atelier Store` : "Product | Atelier Store",
    description: product?.description,
  };
}

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

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-canvas text-body">
      <div className="border-b border-border bg-accent px-4 py-2 text-center text-xs tracking-[0.16em] text-on-accent">
        Complimentary delivery on orders over $150
      </div>

      <header className="sticky top-0 z-30 border-b border-border bg-canvas/95">
        <div className="container-page flex min-h-20 items-center justify-between gap-6">
          <MobileMenu />
          <Link className="font-display text-xl font-medium tracking-[0.16em] text-ink" href="/">ATELIER</Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 text-xs uppercase tracking-[0.14em] text-ink md:flex">
            <Link className="transition-colors hover:text-accent" href="/#new-arrivals">New arrivals</Link>
            <Link className="transition-colors hover:text-accent" href="/#collections">Collections</Link>
            <Link className="transition-colors hover:text-accent" href="/#journal">Journal</Link>
          </nav>
          <div className="flex items-center gap-1 text-ink">
            <button aria-label="Search" className="button !min-h-11 !w-11 !p-0" type="button"><SearchIcon /></button>
            <Link aria-label="Shopping bag" className="button !min-h-11 !w-11 !p-0" href="#bag"><BagIcon /></Link>
          </div>
        </div>
      </header>

      <div className="container-page pb-20 pt-6 md:pb-32 md:pt-10">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted">
          <Link className="hover:text-ink" href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link className="hover:text-ink" href="/#new-arrivals">New arrivals</Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] md:gap-16 lg:gap-24">
          <section aria-label={`${product.name} images`} className="grid grid-cols-2 gap-3">
            {product.images.map((image, index) => (
              <div className={`image-frame relative ${index === 0 ? "col-span-2 aspect-[1.08]" : "aspect-[0.82]"}`} key={image.src}>
                <Image alt={image.alt} className="object-cover" fill priority={index === 0} sizes={index === 0 ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 50vw, 29vw"} src={image.src} />
              </div>
            ))}
          </section>

          <section aria-labelledby="product-title" className="md:sticky md:top-32 md:self-start">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted">{product.category}</p>
            <h1 className="font-display text-4xl leading-[0.98] tracking-[-0.035em] text-ink md:text-6xl" id="product-title">{product.name}</h1>
            <p className="mt-6 text-lg text-ink">{product.price}</p>
            <div className="my-8 border-y border-border py-6">
              <p className="max-w-lg text-base leading-7 text-body">{product.description}</p>
              <p className="mt-4 text-sm text-muted">{product.materials}</p>
            </div>

            <div className="border-b border-border pb-7">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.16em] text-ink">Availability</p>
                <p className={`text-sm ${product.stock === "Low stock" ? "text-error" : "text-success"}`}>
                  <span aria-hidden="true" className="mr-2">●</span>{product.stock}
                </p>
              </div>
              <p className="mt-2 text-sm text-muted">{product.stockNote}</p>
            </div>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-xs uppercase tracking-[0.16em] text-ink" htmlFor="color">Color</label>
                <span className="text-sm text-muted">Natural</span>
              </div>
              <div className="flex items-center gap-3">
                <button aria-label="Natural color selected" className="h-8 w-8 rounded-full border-2 border-ink bg-[#c6a47b] p-1 ring-2 ring-canvas ring-offset-1 ring-offset-ink" id="color" type="button" />
                <button aria-label="Black color" className="h-8 w-8 rounded-full border border-border bg-[#1b1b19] p-1" type="button" />
              </div>
            </div>

            <button className="button button-primary mt-8 min-h-14 w-full" type="button">Add to bag <span aria-hidden="true">↗</span></button>
            <p className="mt-4 text-center text-xs text-muted">Complimentary delivery and returns on every order.</p>

            <div className="mt-10 divide-y divide-border border-y border-border">
              <details className="group py-5" open>
                <summary className="flex cursor-pointer list-none items-center justify-between text-xs uppercase tracking-[0.16em] text-ink">
                  Details <span className="text-lg font-light transition-transform group-open:rotate-45">+</span>
                </summary>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
                  {product.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </details>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-xs uppercase tracking-[0.16em] text-ink">
                  Shipping and returns <span className="text-lg font-light transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-5 text-sm leading-6 text-muted">Free delivery arrives in two to five business days. Returns are complimentary within 30 days.</p>
              </details>
            </div>
          </section>
        </div>
      </div>

      <section className="border-y border-border bg-surface py-14 md:py-20" aria-labelledby="product-note-title">
        <div className="container-page grid gap-5 md:grid-cols-[0.75fr_1.25fr] md:items-start">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">The Atelier approach</p>
          <h2 className="max-w-3xl font-display text-3xl leading-tight tracking-[-0.03em] text-ink md:text-5xl" id="product-note-title">A useful object, made with intention.</h2>
        </div>
      </section>

      <footer className="border-t border-border bg-canvas py-10">
        <div className="container-page flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Link className="font-display text-lg tracking-[0.16em] text-ink" href="/">ATELIER</Link>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.14em] text-muted">
            <Link className="hover:text-ink" href="/#about">About</Link>
            <Link className="hover:text-ink" href="/#contact">Contact</Link>
            <Link className="hover:text-ink" href="/#shipping">Shipping and returns</Link>
            <Link className="hover:text-ink" href="/#privacy">Privacy</Link>
          </nav>
          <p className="text-xs text-muted">© 2026 Atelier Store</p>
        </div>
      </footer>
    </main>
  );
}
