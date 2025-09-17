CREATE TABLE "journal" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"date" timestamp DEFAULT now(),
	"description" text,
	"debit" integer,
	"credit" integer,
	"totalbalance" integer
);
--> statement-breakpoint
ALTER TABLE "journal" ADD CONSTRAINT "journal_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;