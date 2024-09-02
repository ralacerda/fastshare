CREATE TABLE `link` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`code` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `link_code_unique` ON `link` (`code`);--> statement-breakpoint
CREATE INDEX `code_idx` ON `link` (`code`);