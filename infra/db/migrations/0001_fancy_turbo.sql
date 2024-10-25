CREATE INDEX IF NOT EXISTS "name_search_idx" ON "products" USING gin (to_tsvector('english', "name"));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "price_idx" ON "products" USING btree ("price");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_idx" ON "products" USING btree ("category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rating_idx" ON "products" USING btree ("rating");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "numReviews_idx" ON "products" USING btree ("num_reviews");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "countInStock_idx" ON "products" USING btree ("count_in_stock");