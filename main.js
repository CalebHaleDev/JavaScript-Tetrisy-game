console.log("Hello World");

//this is in a function just to collapse visually
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
//wait(1000);       //why doesn't wait work?

}

function makeGrid(width, height){
    gameGrid = [];
    emptyRow = [];
    for(var i=0;i<width;i++){
        emptyRow.push(emptySpaceCharacter);
    }
    for(var i=0;i<height;i++){
        gameGrid.push(emptyRow);
    }
    console.log("grid made");
    //console.log(gameGrid);
}
function printGrid(){
    gameGrid.forEach(element => {
        console.log(element);
    });
    console.log("btw, now is "+(Date.now()%10000));
}
function gameSetup(){
    //settings:
    let startingLevel = 2;
    let unscaledWidth = 1;
    let unscaledHeight = 5;
    emptySpaceCharacter = "_";
    //initialize game
    level = startingLevel;
    makeGrid(level+unscaledWidth, level+unscaledHeight);
    //gameGrid[0][0] = 1;
    printGrid();
    fallerCoords = [0,0];
    gravityTimer=Date.now()+Math.min((1100-(100*level)),250);
    shiftTimer=Date.now()+(1000*level/20);
    console.log("starting game loop");
    console.log("now is "+Date.now());
    console.log("gravityTimer is "+gravityTimer);
    console.log("shiftTimer is "+shiftTimer);
}
function doGravity(){
    //move everything down
    for(let column = gameGrid[0].length; column>0; column--){
        for(let row = gameGrid.length-1; row>0; row--){
            if(gameGrid[row][column]==emptySpaceCharacter){
                gameGrid[row][column] = gameGrid[row-1][column];
                gameGrid[row-1][column] = emptySpaceCharacter;
            }
        }
    }
    fallerCoords[1]++;

    //if the faller lands
    if(fallerCoords[1]==gameGrid.length-1 || gameGrid[fallerCoords[1]+1][fallerCoords[0]]!=emptySpaceCharacter){
        //check for game over
        if(fallerCoords[1]=0){
            level = 0;
            return;     //not necessary, but skips some redundant lines
        }
        
        //make new faller
        gameGrid[0][1] = 1; //replace the 1 with whatever is falling
        fallerCoords = [0,0];

        //check for rows made. This could be changed to only check the row the faller landed in in the future for efficiency
        gameGrid.forEach(element => {
            if(element.indexOf(emptySpaceCharacter)==-1){   //if there's no empty space in the row
                console.log("row made: "+element);
                gameGrid[gameGrid.indexOf(element)] = emptyRow; //clear row
                //could also set the row to a "win row" to show visually, print out the grid once to make sure it displays, then wipe it, just for a fun visual
            }
        });
    }
    console.log("faller is at "+fallerCoords);
    
    gravityTimer=Date.now()+Math.min((1100-(100*level)),250);
    level -= .02;
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

//main game loop
var gameloopID = setInterval(()=> {

    if(gravityTimer<Date.now()){
    doGravity();
    printGrid();
}

/*
this.addEventListener('keypress', event => {
    if (event.code == 13) {
      alert('hi.')
    }
  })
*/
let keypressed = 0;
if(shiftTimer<Date.now()&& keypressed!=null){
    //stuff below
}
/*

 * 
 * if (userTime < now && keypressed){
 * tertiary for direction based on keypressed
 *  shiftFaller(direction)
 * }
 * 
 */


    //console.log("doing main loop");
    if(level<1){
        clearInterval(gameloopID);
    }
},100); //change rate to 5 later

console.log("game ended");
