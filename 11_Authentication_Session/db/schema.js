import { uuid, pgTable, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN'])

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  role: userRoleEnum().notNull().default('USER'),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
});

export const userSession = pgTable("users_sessions", {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().references(() => usersTable.id).notNull(), 
    // if its unique its means at one time they login from one device
    createdAt: timestamp().defaultNow().notNull()

})
