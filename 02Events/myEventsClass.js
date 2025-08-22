const EventEmitter = require('events');

class Chat extends EventEmitter {
    sendMessage(msg)    {
        console.log(`Message Sent: ${msg}`);
        this.emit('messageRecieved', msg);
    }
}

const chat = new Chat();
chat.on('messageRecieved', (msg) => {
    console.log(`New Message: ${msg}`);
});

// trigger event
chat.sendMessage("hello anubhav")