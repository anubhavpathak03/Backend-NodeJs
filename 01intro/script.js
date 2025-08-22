const fs = require('node:fs');

// task: Read the contents of notes.txt


console.log("start of Script");


// [Sync] => Blocking operations
// const contents_of_file = fs.readFileSync('notes.txt', 'utf-8');
// console.log('contents of file is here:-> \n', contents_of_file);



// [Async] => non-blocking operation 
fs.readFile('notes.txt', 'utf-8', function(error, data) {
    if(error) console.log(error);
    else console.log('Content got', data);
});

console.log('End Of Script');
