const ChatRoom = require("./chatRoom.js");
const chat = new ChatRoom();


// designing event listener
chat.on('join', (user) => {
    console.log(`${user} has joined the chat`);
})

chat.on('message', (user, message) => {
    console.log(`${user} wrote this message on chat: ${message}`);
})

chat.on('leave', (user) => {
    console.log(`${user} has leave the chat`);
})

// simulating chat
chat.join('Alice');
chat.join('Bob');

chat.sendMessage('Alice', 'Hello Bob!!! How is Your Life going')

chat.sendMessage('Bob', 'Hey Alice!!! It\'s going great. How is Yours?')


chat.leave('Alice');
