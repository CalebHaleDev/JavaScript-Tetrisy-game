console.log("Hello World");

//this is just to collapse visually
function notes(){
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
// === is strict comparison (data types not converted)

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
}

function makeGrid(width, height){
    gameGrid = [];
    var row = [];
    for(var i=0;i<width;i++){
        row.push(0);
    }
    for(var i=0;i<height;i++){
        gameGrid.push(row);
    }
    console.log("grid made");
    console.log(gameGrid);
}

function printGrid(){
    gameGrid.forEach(element => {
        console.log(element);
    });
}

makeGrid(3,5);
printGrid();





var i=0;
console.log("test");
var gameloopID = setInterval(()=> {
    console.log("doing ");
    i++;
    if(i>1){
        clearInterval(gameloopID);
    }
},100);




//wait(1000);


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