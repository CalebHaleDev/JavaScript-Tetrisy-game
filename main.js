console.log("Hello World");

var exampleVariable = 'something';  //can be used anywhere
let otherExampleVariable = 'something else';  //can only be used in scope
const pi = 3.1415;
//strings, numbers, and booleans are the only primitive dataTypes
//JS is dynamic, so the data types can change at runtime
//objects, arrays and functions are reference type variables
//+= can be used with strings
// ', ", and ` can be used around strings, so delimiting \ wouldn't be necessary
//other escapes/delimits:
// \\ backslash
// \n newline
// \carriage return
// \t tab
// \b backspace
// \f form feed

let elementBlock = {
    atomicNumber: 0,
    electrons: 0,
    charge:0
};
//dot notation is fine, or brackets, i.e. element['charge'] = 0; which is useful if the variable name is unknown or variable.

let emptyArray = [];

function exampleFunction() {
    //function body
}



      //main game loop
/*
 * if (gravityTime < now){
 * move blocks (if landed, create new faller)   //if landed in the first row, end game (level = 0)
 * check for rows
 * reset timer    gravityTime = now + 1.1-.1*difficulty sec
 * }
 * 
 * if (userTime < now){
 * shift if possible      user input
 *  if shift successful, reset timer    userTime = now + difficulty/20 sec
 * }
 * 
 * sleep 5+ milliseconds
 */