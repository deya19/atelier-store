import { asc, eq, inArray } from "drizzle-orm";

import { db } from "@/lib/db";
import { categories, productDetails, productImages, products } from "@/db/schema";

const LOW_STOCK_THRESHOLD = 3;

export type StockStatus = "In stock" | "Low stock" | "Out of stock";

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: string;
  image: string;
  alt: string;
  description: string;
  materials: string;
  stock: StockStatus;
  stockNote: string;
  details: string[];
  images: { src: string; alt: string }[];
};

type ProductWithCategory = {
  product: typeof products.$inferSelect;
  category: { name: string };
};

function formatPrice(priceCents: number) {
  const dollars = priceCents / 100;
  return dollars % 1 === 0 ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

function getStockStatus(quantity: number): StockStatus {
  if (quantity === 0) return "Out of stock";
  return quantity <= LOW_STOCK_THRESHOLD ? "Low stock" : "In stock";
}

async function getRelatedContent(productIds: string[]) {
  if (productIds.length === 0) {
    return { images: [], details: [] };
  }

  const [images, details] = await Promise.all([
    db
      .select()
      .from(productImages)
      .where(inArray(productImages.productId, productIds))
      .orderBy(asc(productImages.sortOrder)),
    db
      .select()
      .from(productDetails)
      .where(inArray(productDetails.productId, productIds))
      .orderBy(asc(productDetails.sortOrder)),
  ]);

  return { images, details };
}

function toProduct(
  row: ProductWithCategory,
  related: Awaited<ReturnType<typeof getRelatedContent>>,
): Product {
  const images = related.images
    .filter((image) => image.productId === row.product.id)
    .map(({ src, alt }) => ({ src, alt }));
  const details = related.details
    .filter((detail) => detail.productId === row.product.id)
    .map((detail) => detail.text);

  return {
    slug: row.product.slug,
    name: row.product.name,
    category: row.category.name,
    price: formatPrice(row.product.priceCents),
    image: images[0]?.src ?? "",
    alt: images[0]?.alt ?? row.product.name,
    description: row.product.description,
    materials: row.product.materials,
    stock: getStockStatus(row.product.stockQuantity),
    stockNote: row.product.stockNote,
    details,
    images,
  };
}

async function getProductRows() {
  return db
    .select({ product: products, category: { name: categories.name } })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .orderBy(asc(products.createdAt));
}

export async function getProductsForHome() {
  const rows = (await getProductRows()) as ProductWithCategory[];
  const related = await getRelatedContent(rows.map(({ product }) => product.id));
  return rows.map((row) => toProduct(row, related));
}

export async function getProductBySlug(slug: string) {
  const rows = (await db
    .select({ product: products, category: { name: categories.name } })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.slug, slug))
    .limit(1)) as ProductWithCategory[];

  const row = rows[0];
  if (!row) return undefined;

  const related = await getRelatedContent([row.product.id]);
  return toProduct(row, related);
}

export async function getProductSlugs() {
  const rows = await db.select({ slug: products.slug }).from(products).orderBy(asc(products.createdAt));
  return rows.map(({ slug }) => ({ slug }));
}
