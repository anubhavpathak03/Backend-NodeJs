require('dotenv/config');
const { defineConfig }  =  require('drizzle-kit');  // send your Schema or UI to database

const config = defineConfig({
    dialect: "postgresql",
    out: "./drizzle",
    schema: './models/index.js',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});

module.exports = config;
