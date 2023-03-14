console.log("Hello World");

//this is just to collapse visually
function notes(){
var exampleVariable = 'something';  //can be used anywhere, can declare multiple in the same scope
let otherExampleVariable = 'something else';  //can only be used in scope, can't declare multiple times in same scope
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

//the or operator || can be used to pass in a default value in a return statement if another value doesn't exist
//tertiary operation is condition ? statement-if-true : statement-if-false;
//"use strict"; does checking for common mistakes

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
function gameSetup(){
    level = 2;
    makeGrid(level+1,5);
    printGrid();
    fallerCoords = (0,0);
}
function doGravity(){
    //move blocks down
    //if faller lands, create new faller and check for rows
    //if the faller lands on the first row (reaches the top), level = 0 (which ends the game)
    //set gravityTimer = now + (1.1-.1*difficulty) sec (minimum .25 sec)
}
function shiftFaller(direction){
    //if direction is not 0, set newlocation to fallerCoord +- direction, otherwise new location is downward
    /*if(newlocation is open){
        set the newlocation to the faller
        set the old location to blank
        change the faller coordinates
        //if moving downward, increase score?
        //set shiftTimer = now + difficulty/20 sec (only if shift successful?)
    }*/
    //set shiftTimer = now + difficulty/20 sec (only if shift successful?)
}


gameSetup();


console.log("test");
//main game loop
var gameloopID = setInterval(()=> {

/*
 * if (gravityTimer < now){
 *  doGravity();
 * }
 * 
 * if (userTime < now && keypressed){
 * tertiary for direction based on keypressed
 *  shiftFaller(direction)
 * }
 * 
 */


    console.log("doing main loop");
    if(true/*endCondition*/){
        clearInterval(gameloopID);
    }
},100); //change rate to 5 later

//wait(1000);

