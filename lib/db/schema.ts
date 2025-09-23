import { pgTable, serial, text, varchar, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description'),
  githubUrl: text('github_url'),
  demoUrl: text('demo_url'),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  progress: jsonb('progress').default({ init: false, push: false, deploy: false }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});