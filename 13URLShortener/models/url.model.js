import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import usersTable from './index.js'

export const urlsTables = pgTable('urls', {
    id: uuid().primaryKey().defaultRandom(),
    shortcode: varchar('code', { length: 155 }).unique(),
    target: text('target_url').notNull(), 

    userId: uuid('user_id').references(() => usersTable.id).notNull(),


    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});