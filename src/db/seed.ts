import "dotenv/config";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { categories, productDetails, productImages, products } from "@/db/schema";

const catalog = [
  {
    slug: "arc-leather-tote",
    name: "Arc leather tote",
    category: { name: "Bags", slug: "bags" },
    priceCents: 42000,
    description: "A considered everyday carryall with a softly structured profile and room for the things that matter.",
    materials: "Vegetable tanned leather",
    stockQuantity: 10,
    stockNote: "Ready to ship from our studio",
    images: [
      ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85", "Structured tan leather tote bag"],
      ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85", "Leather bag resting against a neutral wall"],
      ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85", "Close view of a leather handbag handle"],
    ],
    details: ["Unlined leather interior", "Interior slip pocket", "Magnetic closure", "Made in small editions"],
  },
  {
    slug: "column-wool-coat",
    name: "Column wool coat",
    category: { name: "Outerwear", slug: "outerwear" },
    priceCents: 68000,
    description: "A long, precise coat with a generous line, made for the first cold morning and every one after.",
    materials: "Wool and recycled cashmere",
    stockQuantity: 2,
    stockNote: "Only a few pieces remain",
    images: [
      ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1200&q=85", "Long tailored wool coat in a neutral shade"],
      ["https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85", "Tailored coat detail in soft natural light"],
      ["https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85", "Model wearing a neutral tailored coat"],
    ],
    details: ["Relaxed tailored fit", "Horn button closure", "Two front pockets", "Fully lined"],
  },
  {
    slug: "contour-frame",
    name: "Contour frame",
    category: { name: "Accessories", slug: "accessories" },
    priceCents: 19000,
    description: "A quiet, architectural frame with a balanced shape that works from morning light to late afternoon.",
    materials: "Acetate and mineral glass",
    stockQuantity: 10,
    stockNote: "Ready to ship from our studio",
    images: [
      ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85", "Minimal dark sunglasses on a neutral surface"],
      ["https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85", "Black sunglasses viewed from the side"],
      ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85", "Sunglasses styled with a soft neutral outfit"],
    ],
    details: ["Hand polished acetate", "UV protective lenses", "Protective case included", "Unisex fit"],
  },
  {
    slug: "lumen-knit",
    name: "Lumen knit",
    category: { name: "Knitwear", slug: "knitwear" },
    priceCents: 26000,
    description: "A soft, weightless layer with a generous shape and a texture meant to be lived in.",
    materials: "Merino wool and organic cotton",
    stockQuantity: 10,
    stockNote: "Ready to ship from our studio",
    images: [
      ["https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85", "Soft cream knitwear styled on a model"],
      ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85", "Cream knit sweater on a neutral background"],
      ["https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1200&q=85", "Close view of a soft knit texture"],
    ],
    details: ["Soft brushed finish", "Relaxed silhouette", "Ribbed cuffs and hem", "Gentle machine wash"],
  },
] as const;

async function seed() {
  const tx = db;
  const categoryIds = new Map<string, string>();

  for (const item of catalog) {
    const [category] = await tx
        .insert(categories)
        .values(item.category)
        .onConflictDoUpdate({
          target: categories.slug,
          set: { name: item.category.name, updatedAt: new Date() },
        })
        .returning({ id: categories.id, slug: categories.slug });

    categoryIds.set(category.slug, category.id);
  }

  for (const item of catalog) {
    const categoryId = categoryIds.get(item.category.slug);
    if (!categoryId) throw new Error(`Missing category ${item.category.slug}`);

    const [product] = await tx
        .insert(products)
        .values({
          categoryId,
          slug: item.slug,
          name: item.name,
          priceCents: item.priceCents,
          description: item.description,
          materials: item.materials,
          stockQuantity: item.stockQuantity,
          stockNote: item.stockNote,
        })
        .onConflictDoUpdate({
          target: products.slug,
          set: {
            categoryId,
            name: item.name,
            priceCents: item.priceCents,
            description: item.description,
            materials: item.materials,
            stockQuantity: item.stockQuantity,
            stockNote: item.stockNote,
            updatedAt: new Date(),
          },
        })
        .returning({ id: products.id });

    await tx.delete(productImages).where(eq(productImages.productId, product.id));
    await tx.delete(productDetails).where(eq(productDetails.productId, product.id));

    await tx.insert(productImages).values(
        item.images.map(([src, alt], sortOrder) => ({ productId: product.id, src, alt, sortOrder })),
      );
    await tx.insert(productDetails).values(
      item.details.map((text, sortOrder) => ({ productId: product.id, text, sortOrder })),
    );
  }
}

seed().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
