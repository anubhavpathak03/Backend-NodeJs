const fs = require("node:fs");
// first I require this file System Module(fs) and store in fs variable
// and that fs variable is used to read the file 
// console.log(fs);


// const content = fs.readFileSync('notes.txt', 'utf-8'); 
// utf-8 -> binary encoding 
// console.log(content);


// fs.writeFileSync('copy.txt', content, 'utf-8') // it always overwrite the content
// fs.appendFileSync('copy.txt', content, 'utf-8') // it always overwrite the content
// fs.appendFileSync('copy.txt', '\n\n hey hola Mundo!!!!!', 'utf-8')

// fs.mkdirSync('games/xyz/a', {recursive : true});

// fs.rmdirSync('games/xyz/a') // removing 'a' directory
// fs.rmdirSync('games/xyz') // removing 'xyz' directory
// fs.rmdirSync('games') // removing 'games' directory


// if want to delete this copy.txt 

fs.unlinkSync('copy.txt');