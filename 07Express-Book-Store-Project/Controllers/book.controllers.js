const { Books_DB } = require('../models/books');

exports.getAllBooks = function(req, res) {
    res.json(Books_DB);
}


exports.getAllBooks_ByID = (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)) {
        // its means it is bad request 
        res.status(400).json({error : `Id must be type of number`})
    }

    const book = Books_DB.find((e) => e.id == id); // Select * from book where id = {id}
    if(!book) {
        return res.status(404).json({error: `book with id ${id} does not exist`});
    }
    return res.json(book);
}


exports.createNewBooks = (req, res) => {
    const {title, author} = req.body; // here we extract some data from body
    if(!title || title === '') {
        return res.status(400).json({error: 'title is required'})
    }
    if(!author|| author === '') {
        return res.status(400).json({error: 'author is required'})
    }

    const id = Books_DB.length + 1;

    const book = {id, title, author};
    // Avoid mutating the imported Books_DB directly
    // const updatedBooks = [...Books_DB, book];
    Books_DB.push(book)
    // Optionally, you can update the export or handle persistence here

    return res.status(201).json({message : `A new Book is added in the list id is ${id}`});
}



exports.deleteBooks_ByID = (req, res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)) {
        // its means it is bad request 
        res.status(400).json({error : `Id must be type of number`})
    } 
    const indexToDelete = Books_DB.findIndex(e => e.id === id);
    if(indexToDelete < 0) {
       return res.status(404).json({error: `book with id ${id} does not exist`}); 
    }
    Books_DB.splice(indexToDelete, 1);
    return res.status(200).json({message: `book deleted`})
}