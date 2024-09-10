CREATE TABLE `link` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`code` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`image` text,
	`title` text,
	`description` text,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`sub` text NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `link_code_unique` ON `link` (`code`);--> statement-breakpoint
CREATE INDEX `code_idx` ON `link` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_sub_unique` ON `users` (`sub`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `sub_idx` ON `users` (`sub`);