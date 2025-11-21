CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`price` int NOT NULL,
	`main_image` varchar(500),
	`gallery` varchar(2000),
	`seo_title` varchar(255),
	`seo_description` text,
	`description` text,
	`category_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_product_groups_id_fk` FOREIGN KEY (`category_id`) REFERENCES `product_groups`(`id`) ON DELETE no action ON UPDATE no action;