const EventEmitter = require('node:events');

class ChatRoom extends EventEmitter {
    constructor() {
        super();
        this.users = new Set();
    }
    // functionality
    join(user) {
        this.users.add(user);
        // console.log(`${user} joined the chat`)
        this.emit('join', user);
    }

    sendMessage(user, message) {
        if(this.users.has(user)) {
            // checking it is part of chat 
            this.emit('message', user, message);
        }else {
            console.log(`${user} is not in the chat`);
        }
    }
    
    leave(user){
        if(this.users.has(user)) {
            this.users.delete(user);
            // console.log(`${user} leave the chat`)
            this.emit('leave', user);
        }else {
            console.log(`${user} is not in the chat`)
        }
    }
};


module.exports = ChatRoom;