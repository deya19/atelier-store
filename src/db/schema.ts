import { relations, sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    slug: varchar("slug", { length: 160 }).notNull().unique(),
    name: varchar("name", { length: 200 }).notNull(),
    priceCents: integer("price_cents").notNull(),
    description: text("description").notNull(),
    materials: text("materials").notNull(),
    stockQuantity: integer("stock_quantity").notNull(),
    stockNote: text("stock_note").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("products_category_id_idx").on(table.categoryId),
    check("products_price_cents_nonnegative", sql`${table.priceCents} >= 0`),
    check("products_stock_quantity_nonnegative", sql`${table.stockQuantity} >= 0`),
  ],
);

export const productImages = pgTable(
  "product_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    src: text("src").notNull(),
    alt: text("alt").notNull(),
    sortOrder: integer("sort_order").notNull(),
  },
  (table) => [
    unique("product_images_product_order_unique").on(table.productId, table.sortOrder),
    check("product_images_sort_order_nonnegative", sql`${table.sortOrder} >= 0`),
  ],
);

export const productDetails = pgTable(
  "product_details",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    text: text("text").notNull(),
    sortOrder: integer("sort_order").notNull(),
  },
  (table) => [
    unique("product_details_product_order_unique").on(table.productId, table.sortOrder),
    check("product_details_sort_order_nonnegative", sql`${table.sortOrder} >= 0`),
  ],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
  details: many(productDetails),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const productDetailsRelations = relations(productDetails, ({ one }) => ({
  product: one(products, {
    fields: [productDetails.productId],
    references: [products.id],
  }),
}));
