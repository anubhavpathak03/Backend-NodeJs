const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('greet', (username) => {
    console.log(`Hello ${username} and Welcome to events in node js`)
})

// Emit the event
// eventEmitter.emit('greet', "anubhav");


eventEmitter.once('pushnotify', (username) =>{
    console.log("This event will run only once");
}) // it executes only once

// Emit that event that 'once' event executes once no matter how my times we run 
// eventEmitter.emit('pushnotify', "Pathak");
// eventEmitter.emit('pushnotify', "Pathak");


const myListener = () => console.log("I am a listener");
eventEmitter.on("test", myListener);
eventEmitter.emit('test');
eventEmitter.removeListener('test', myListener);
eventEmitter.emit('test'); // this line not run now beacuse of above removeLitener


console.log(eventEmitter.listenerCount("greet"));
console.log(eventEmitter.listeners('greet'));

