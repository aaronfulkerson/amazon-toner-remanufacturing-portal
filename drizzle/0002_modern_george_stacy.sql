CREATE TYPE "public"."cartridge_color" AS ENUM('black', 'cyan', 'magenta', 'yellow');--> statement-breakpoint
CREATE TYPE "public"."cartridge_type" AS ENUM('drum', 'toner');--> statement-breakpoint
CREATE TYPE "public"."cartridge_yield" AS ENUM('high', 'normal');--> statement-breakpoint
CREATE TYPE "public"."job_timestamp_type" AS ENUM('break_end', 'break_start', 'job_end', 'job_pause', 'job_resume', 'job_start', 'lunch_end', 'lunch_start', 'repair_end', 'repair_start');--> statement-breakpoint
CREATE TABLE "cartridge" (
	"id" serial PRIMARY KEY NOT NULL,
	"manufacturer_id" integer,
	"color" "cartridge_color",
	"model" text NOT NULL,
	"type" "cartridge_type" NOT NULL,
	"yield" "cartridge_yield"
);
--> statement-breakpoint
CREATE TABLE "job_timestamp" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"comment" text,
	"timestamp" timestamp,
	"type" "job_timestamp_type" NOT NULL
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
	"id" serial PRIMARY KEY NOT NULL,
	"cartridge_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "manufacturer" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cartridge" ADD CONSTRAINT "cartridge_manufacturer_id_manufacturer_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "public"."manufacturer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_timestamp" ADD CONSTRAINT "job_timestamp_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_timestamp" ADD CONSTRAINT "job_timestamp_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_user" ADD CONSTRAINT "job_user_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_user" ADD CONSTRAINT "job_user_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_cartridge_id_cartridge_id_fk" FOREIGN KEY ("cartridge_id") REFERENCES "public"."cartridge"("id") ON DELETE no action ON UPDATE no action;