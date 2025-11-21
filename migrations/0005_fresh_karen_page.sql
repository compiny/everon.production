CREATE TABLE `product_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lead_id` int NOT NULL,
	`product_id` int NOT NULL,
	`quantity` int DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `product_leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `product_leads` ADD CONSTRAINT `product_leads_lead_id_leads_id_fk` FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_leads` ADD CONSTRAINT `product_leads_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;