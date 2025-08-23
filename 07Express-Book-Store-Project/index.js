const express = require('express');

const app = express();
const PORT = 8000;


// consider In Memory DB as we don't have beacuse our API become StateLess
const Books_DB = [
    {id: 1, title: 'Theory Of Relativity', author: 'Albert Einstein'},
    {id: 2, title: 'Light', author: 'Issac Newton'}
];

// middlewares (Plugins)
app.use(express.json()); // this a plugin if some data is comming and it is a header (application/json) it will do the all transformation for me and give me the actuall data in the request.body

app.use((req, res, next) => {
    const log = `\n[${Date.now()}] ${req.method} ${req.path}`;
    fs.appendFileSync('log.txt', log, 'utf-8');
    next();
});

// Routes
app.get('/books', (req, res) => {
    res.setHeader('x-ap', 'Anubhav Pathak') // for setting custome headers use x-"": 
    res.json(Books_DB);
});

app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)) {
        // its means it is bad request 
        res.status(400).json({error : `Id must be type of number`})
    }

    const book = Books_DB.find((e) => e.id == id); // Select * from book where id = {id}
    if(!book) {
        return res.status(404).json({error: `book with id ${id} does not exist`});
    }
    return res.json(book)
});


app.post('/books', (req, res) => {
    // console.log(req.headers);
    // console.log(req.body);
    const {title, author} = req.body;
    if(!title || title === '') {
        return res.status(400).json({error: 'title is required'})
    }
    if(!author|| author === '') {
        return res.status(400).json({error: 'author is required'})
    }

    const id = Books_DB.length + 1;

    const book = {id, title, author};
    Books_DB.push(book);

    return res.status(201).json({message : `A new Book is added in the list id is ${id}`});
});

app.delete('/books/:id', (req, res) => {
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
})

app.listen(PORT, () => console.log(`HTTP Server is UP and Running at ${PORT}`));

