const { booksTable } = require('../models/books.models');
const {authorTable} = require('../models/authors.models')
const db = require('../db');
const { sql } = require('drizzle-orm');
const { eq, ilike } = require('drizzle-orm')


exports.getAllBooks = async function(req, res) {
    const search = req.query.search;
    if(search) {
        const books = await db
            .select()
            .from(booksTable)
            .where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`);
        return res.json(books);
    }
    try {
        const books = await db.select().from(booksTable);
        return res.status(200).json({data: books, error: null});
    } catch (error) {
        console.error('Error fetching books:', error);
        return res.status(500).json({ data: null, error: 'Internal server error' });
    }
}


exports.getAllBooks_ByID = async (req, res) => {
    const id = req.params.id;
    try {
        const [book] = await db
            .select()
            .from(booksTable)
            .where((table) => eq(table.id, id))
            .leftJoin(authorTable, eq(booksTable.authorId, authorTable.id))
            .limit(1); // Select * from book where id = {id}
        if(!book) {
            return res.status(404).json({error: `book with id ${id} does not exist`});
        }
        return res.status(200).json({data: book, error: null});
    } catch (error) {
        console.error('Error fetching books:', error);
        return res.status(500).json({ data: null, error: 'Internal server error' }); 
    }
}


exports.createNewBooks = async (req, res) => {
    const {title, authorId, description} = req.body; // here we extract some data from body
    if(!title || title === '') {
        return res.status(400).json({data: null, error: 'title is required'})
    }
    

    const [result] = await db.insert(booksTable).values({
        title,
        authorId,
        description,
    }).returning({
        id: booksTable.id
    });

    return res.status(201).json({message : "Books Created Successfully", id: result.id});
}



exports.deleteBooks_ByID = async (req, res) => {
    const id = req.params.id;

    try {
        const [result] = await db.delete(booksTable).where(eq(booksTable.id, id)).returning({ id: booksTable.id });
        if (!result) {
            return res.status(404).json({ error: `Book with id ${id} does not exist` });
        }
        return res.status(201).json({message : "Books Deleted Successfully", id: result.id});
    } catch (error) {
        console.error('Error deleting book:', error);
        return res.status(500).json({ data: null, error: 'Internal server error' });
    }
}