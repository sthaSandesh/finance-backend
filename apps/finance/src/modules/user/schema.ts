import { pgTable, text, serial } from 'drizzle-orm/pg-core';

export const UserSchema = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique(),
  password: text('password'),
});
