const { Buffer } = require("node:buffer");

//const buf = Buffer.alloc(4); // this allocate a memory of size 4bytes
// console.log(buf); 
// console.log(buf[1]); 

// const buf = Buffer.from("Hello World"); // create karega buffer "Hello world" se 
// console.log(buf);
// console.log(buf.toString());

/***
 * this alloc is intiallised memory
 * this allocUnsafe is uninitalised memory
 */

// const buftwo = Buffer.allocUnsafe(10);
// console.log(buftwo);

/** 
const buf = Buffer.alloc(10);
buf.write('hello')
console.log(buf.toString());
*/

/** 
const buf = Buffer.from("anubhav pathak");
console.log(buf.toString());
console.log(buf.toString('utf-8', 0, 7));
*/

/*
const bufAnother = Buffer.from("Hola!");
console.log(bufAnother);
bufAnother[0] = 0x5A;
console.log(bufAnother);
console.log(bufAnother.toString().length);
*/

// concatination of buffer
const buf1 = Buffer.from('Anubhav');
const buf2 = Buffer.from('Pathak');
const merged = Buffer.concat([buf1, buf2]);
console.log(merged.toString().length);

