CREATE TABLE "reset_token" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp with time zone DEFAULT '2025-05-18T17:40:09.411Z',
	"token" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "passwordHash" TO "password_hash";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "active" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password_reset" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "reset_token" ADD CONSTRAINT "reset_token_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;