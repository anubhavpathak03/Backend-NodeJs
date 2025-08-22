const { clear } = require('node:console');
const http = require('node:http');

const server = http.createServer(
    function(req, res) {
        console.log(`Incomming request at [${Date.now().toLocaleString()}]`);
        // console.log(req.headers);
        console.log(req.url);

        switch(req.url) {
            case '/':
                res.writeHead(200);    
                return res.end('HomePage'); 
            case '/contact-us':
                res.writeHead(200);
                return res.end('contact me hahaaa');
            case '/about-me':
                res.writeHead(200);
                return res.end('I\'m shaktimann :-))');
            default:
                res.writeHead(404);
                res.end('Game Over... :((');
        }
    }
)
server.listen(8000, function() {
    console.log('server is running at port 8000');
})