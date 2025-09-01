require('dotenv/config')

const express = require('express');
const bookRouter = require('./routes/books.routes');
const authorRoute = require('./routes/authors.routes')
const { loggerMiddleware } = require('./MiddleWares/logger');


const app = express();
const PORT = 8000;

// consider In Memory DB as we don't have beacuse our API become StateLess

// middlewares (Plugins)

app.use(express.json()); 
// this a plugin if some data is comming and it is a header (application/json) it will do the all transformation for me and give me the actuall data in the request.body
app.use(loggerMiddleware)


// Routes
app.use('/books', bookRouter);
app.use('/authors', authorRoute);


// listening PORT
app.listen(PORT, () => console.log(`HTTP Server is UP and Running at ${PORT}`));

