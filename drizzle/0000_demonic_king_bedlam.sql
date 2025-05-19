CREATE TYPE "public"."job_timestamp_type_enum" AS ENUM('break_end', 'break_start', 'job_end', 'job_pause', 'job_resume', 'job_start', 'lunch_end', 'lunch_start', 'repair_end', 'repair_start');--> statement-breakpoint
CREATE TYPE "public"."permission_name_enum" AS ENUM('remanufacturing', 'service', 'toner');--> statement-breakpoint
CREATE TYPE "public"."toner_color_enum" AS ENUM('black', 'cyan', 'magenta', 'yellow');--> statement-breakpoint
CREATE TYPE "public"."toner_yield_enum" AS ENUM('high', 'normal');--> statement-breakpoint
CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'customer', 'employee', 'technician');--> statement-breakpoint
CREATE TYPE "public"."secure_token_type_enum" AS ENUM('email_confirmation', 'password_reset');--> statement-breakpoint
CREATE TABLE "consumable_job" (
	"job_id" integer NOT NULL,
	"consumable_id" integer NOT NULL,
	CONSTRAINT "consumable_job_consumable_id_job_id_pk" PRIMARY KEY("consumable_id","job_id")
);
--> statement-breakpoint
CREATE TABLE "consumable_part" (
	"consumable_id" integer NOT NULL,
	"part_id" integer NOT NULL,
	"quantity" integer DEFAULT 1,
	CONSTRAINT "consumable_part_consumable_id_part_id_pk" PRIMARY KEY("consumable_id","part_id")
);
--> statement-breakpoint
CREATE TABLE "consumable" (
	"id" serial PRIMARY KEY NOT NULL,
	"manufacturer_id" integer NOT NULL,
	"model" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drum" (
	"id" serial PRIMARY KEY NOT NULL,
	"consumable_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_timestamp" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"comment" text,
	"timestamp" timestamp DEFAULT now(),
	"type" "job_timestamp_type_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_user" (
	"job_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"active" boolean DEFAULT true,
	CONSTRAINT "job_user_job_id_user_id_pk" PRIMARY KEY("job_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "job" (
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "manufacturer" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "part" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text,
	"model" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" "permission_name_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "secure_token" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"token" text NOT NULL,
	"type" "secure_token_type_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "toner" (
	"id" serial PRIMARY KEY NOT NULL,
	"consumable_id" integer NOT NULL,
	"color" "toner_color_enum" NOT NULL,
	"yield" "toner_yield_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"email" text NOT NULL,
	"email_confirmed" boolean DEFAULT false NOT NULL,
	"name" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" "user_role_enum" NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "consumable_job" ADD CONSTRAINT "consumable_job_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "consumable_job" ADD CONSTRAINT "consumable_job_consumable_id_consumable_id_fk" FOREIGN KEY ("consumable_id") REFERENCES "public"."consumable"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consumable_part" ADD CONSTRAINT "consumable_part_consumable_id_consumable_id_fk" FOREIGN KEY ("consumable_id") REFERENCES "public"."consumable"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "consumable_part" ADD CONSTRAINT "consumable_part_part_id_part_id_fk" FOREIGN KEY ("part_id") REFERENCES "public"."part"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "consumable" ADD CONSTRAINT "consumable_manufacturer_id_manufacturer_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "public"."manufacturer"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "drum" ADD CONSTRAINT "drum_consumable_id_consumable_id_fk" FOREIGN KEY ("consumable_id") REFERENCES "public"."consumable"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "job_timestamp" ADD CONSTRAINT "job_timestamp_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "job_timestamp" ADD CONSTRAINT "job_timestamp_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_user" ADD CONSTRAINT "job_user_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "job_user" ADD CONSTRAINT "job_user_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permission" ADD CONSTRAINT "permission_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "secure_token" ADD CONSTRAINT "secure_token_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "toner" ADD CONSTRAINT "toner_consumable_id_consumable_id_fk" FOREIGN KEY ("consumable_id") REFERENCES "public"."consumable"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "manufacturer_id_idx" ON "consumable" USING btree ("manufacturer_id");--> statement-breakpoint
CREATE UNIQUE INDEX "email" ON "user" USING btree ("email");