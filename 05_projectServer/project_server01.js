const http = require('node:http');
const fs = require('node:fs');
const server = http.createServer(
    function(req, res) {
        const method = req.method;
        const path = req.url;
        const now = new Date();
        const log = `\n[${now.toLocaleString()}] : ${method}: ${path}`;
        fs.appendFileSync('log.txt', log, 'utf-8');
        switch(method) {
            case 'GET': {
                switch(path) {
                    case '/':
                        res.writeHead(200);
                        return res.end("Hello Your Server is listening 👋🏻");
                    case '/contact-us':
                        res.writeHead(200);
                        return res.end('Sure, Contact me at Email: anubhavpathak@pathak.in and Phone: +91 9121912191');
                    case '/tweet':
                        return res.writeHead(200).end('Tweet-1\nTweet-2\nTweet-3\nTweet-4\nTweet-5');
                }
            }
            break
            case 'POST': {
                switch(path) {
                    case '/tweet':
                        return res.writeHead(201).end("Your Tweet is Created");

                }
            }

            

        }
        return res.writeHead(404).end('Youre lost man!');
    }
)

server.listen(8000, () => console.log('Your HTTP Server is UP and Running at Port 8000'));