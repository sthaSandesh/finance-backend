import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { UserSchema } from '../user/schema';

export const journalSchema = pgTable('journal', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => UserSchema.id),
  date: timestamp('date').defaultNow(),
  description: text('description'),
  debit: integer('debit'),
  credit: integer('credit'),
  totalbalance: integer('totalbalance'),
});
