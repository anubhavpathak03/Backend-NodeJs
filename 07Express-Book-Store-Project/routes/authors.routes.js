const express = require('express');
const router = express.Router();

const db = require('../db');
const { booksTable } = require('../models/books.models'); 
const { authorTable } = require('../models/authors.models'); 
const { eq } = require('drizzle-orm')


router.get('/', async (req, res) => {
    const authors = await db.select().from(authorTable);
    return res.json(authors);
});

router.get('/:id', async (req, res) => {
    const [authors] = await db
        .select()
        .from(authorTable)
        .where(eq(authorTable.id, req.params.id));

    if(!authors) {
        return res.status(404).json({error: `Author with ${id} does not exists!`})
    }
    return res.json(authors);
});


router.post('/', async (req, res) => {
    const {firstName, lastName, email} = req.body;
    const [result] = await db.insert(authorTable).values({
        firstName,
        lastName,
        email,
    }).returning({
        id: authorTable.id
    });
    return res.json({message: "Authors has been Created", id: result.id})
});

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    const [authors] = await db.delete(authorTable).where(eq(authorTable.id, id)).returning({id: authorTable.id});
    if(!authors) {
        res.status(404).json({error: `author with ${id} does not exist`});
    }
    res.status(200).json({message: `author with id ${id} deleted successfully`})
})

router.get('/:id/books', async(req, res) => {
    const books = await db.select().from(booksTable)
        .where(eq(booksTable.authorId, req.params.id))

    return res.json(books);
})


module.exports = router;
