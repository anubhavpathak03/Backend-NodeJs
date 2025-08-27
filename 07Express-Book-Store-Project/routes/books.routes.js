const express = require('express');
const router = express.Router();

// const { Books_DB } = require('../models/books')
const controller = require('../Controllers/book.controllers');
/** 
router.get('/', (req, res) => {
    res.setHeader('x-ap', 'Anubhav Pathak') // for setting custome headers use x-"": 
    res.json(Books_DB);
});
*/

router.get('/', controller.getAllBooks);

router.get('/:id', controller.getAllBooks_ByID);


router.post('/', controller.createNewBooks);

router.delete('/:id', controller.deleteBooks_ByID); 

module.exports = router;
