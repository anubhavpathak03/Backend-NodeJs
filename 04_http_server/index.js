const http = require("node:http");

const server = http.createServer(
    function(req, res) {
        console.log('I got an incomming request');
        res.writeHead(200);
        res.end('Thanks for visiting my server :)');
    }
); // this line create server and return instance of that

// now I take that server instance and make it listen to port no. 
server.listen(8000, function() {
    console.log(`Http server is up and running on port 8000`);
})