const { pgTable, integer, varchar} = require('drizzle-orm/pg-core');

const usersTable = pgTable('users', {
    id:integer('id').primaryKey(),  
    name: varchar('name', { length: 255 }).notNull(),  
    email: varchar('email', { length: 255 }).notNull().unique(),
});

module.exports = {usersTable};

// used as a unique key to identify the column
// by notNull() it becames required field