const express = require('express');

const app = express();
app.get('/', function(req, res) {
    res.end("HomePage");
});

app.get('/contact-us', function(req, res) {
    res.end('You can contact me at my email address');
});

app.get('/tweets', function(req, res) {
    res.end('here are your tweets');
});

app.post('/tweets', (req, res) => {
    // by default express always going to send 200 to change it.
    res.status(201).end('Tweet Created Success'); 
});

app.listen(8000, () => console.log(`server is running on PORT 8000`))