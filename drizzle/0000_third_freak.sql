CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`sub` text NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_sub_unique` ON `users` (`sub`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);