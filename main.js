//this is in a function just to collapse visually
function notes(){
var exampleVariable = 'something';  //can be used anywhere, can declare multiple in the same scope
let otherExampleVariable = 'something else';  //can only be used in scope, can't declare multiple times in same scope
const pi = 3.1415;
//+= can be used with strings
// ', ", and ` can be used around strings, so delimiting \ wouldn't be necessary
//other escapes/delimits:
// \\ backslash
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

//the or operator || can be used to pass in a default value in a return statement if another value doesn't exist
//tertiary operation is condition ? statement-if-true : statement-if-false;
//"use strict"; does checking for common mistakes
//use Object.freeze(object); to prevent data changing (read-only, like constants)

}

//to do list:
//figure out 2d array value assignment (not a column)
//add shifting faller function
//add score, unlocking higher levels and level selection
//better graphics? (Actual graphics)?
//add "completed rows" panel, score bonus

//next version to-do list:
//unfinished items from above
//better graphics (actual graphics) if not done already
//element dataType
//special powerups

function makeGrid(width, height){
    gameGrid = [];
    emptyRow = [];
    for(var i=0;i<width;i++){
        emptyRow.push(emptySpaceCharacter);
    }
    for(var i=0;i<height;i++){
        gameGrid.push(emptyRow.map(x => x));        //future research: how to dereference
    }
    console.log("grid made");
    //console.log(gameGrid);
}
function printGrid(){
    document.getElementById("gameDisplay").innerHTML = "<br>";
    gameGrid.forEach(element => {
        console.log(element);
        document.getElementById("gameDisplay").innerHTML += element + "<br>";
    });
    console.log("btw, now is "+(Date.now()%10000));
    console.log("faller is at "+fallerCoords);
    document.getElementById("gameDisplay").innerHTML += "btw, now is "+(Date.now()%10000)+"<br>";
    document.getElementById("gameDisplay").innerHTML += "faller is at "+fallerCoords+"<br>";
    document.getElementById("gameDisplay").innerHTML += "0,1: "+gameGrid[1][0]+"<br>";
}
function gameSetup(){
    //settings:         you could get user input to change these
    let startingLevel = 4;
    let unscaledWidth = 1;
    let unscaledHeight = 5;
    emptySpaceCharacter = "_";
    //initialize game
    level = startingLevel;
    makeGrid(level+unscaledWidth, level+unscaledHeight);
    setFaller(Math.floor(Math.random()*(gameGrid[0].length)), Math.floor(Math.random()*(level))+1);
    printGrid();
    gravityTimer=Date.now()+Math.min((1100-(100*level)),250);
    shiftTimer=Date.now()+(1000*level/20);
    keypressed = null;
    validKeys = ["A","S","D"];
    elementList = ["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg"];
    periodicTable = {"H":-1, "He":+1, "Li":-1, "Be":-2, "B":-3, "C": -+4, "N":+3, "O":+2, "F":+1, "Ne":0, "Na":-1, "Mg":-2};
    //document.getElementById("gameDisplay").innerHTML += periodicTable["H"];
    console.log("starting game loop");
}
function doGravity(){
    //if the faller is landing at the top row, end game immediately
    if(fallerCoords[1]==0 && gameGrid[fallerCoords[1]+1][fallerCoords[0]]!=emptySpaceCharacter){
        level = 0;
        return;     //not necessary, but skips some redundant lines
        }
    //move everything down
    for(let column = gameGrid[0].length; column>-1; column--){
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
        //make new faller
        setFaller(Math.floor(Math.random()*(gameGrid[0].length)), Math.floor(Math.random()*(level))+1);

        //check for rows made. This could be changed to only check the row the faller landed in in the future for efficiency
        gameGrid.forEach(element => {
            if(element.indexOf(emptySpaceCharacter)==-1){   //if there's no empty space in the row
                console.log("row made: "+element);
                gameGrid[gameGrid.indexOf(element)] = emptyRow.map(x => x); //clear row
                //could also set the row to a "win row" to show visually, print out the grid once to make sure it displays, then wipe it, just for a fun visual
            }
        });
    }
    gravityTimer=Date.now()+Math.min((1100-(100*level)),250);
    //level -= .05;
}
function shiftFaller(direction){
    document.getElementById("gameDisplay").innerHTML += "shifting: "+direction;
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
function setFaller(xPosition, value){
    gameGrid[0][xPosition] = value;
    fallerCoords = [xPosition,0];
}

gameSetup();
//main game loop
var gameloopID = setInterval(()=> {
    //do gravity
    if(gravityTimer<Date.now()){
    doGravity();
    printGrid();
}

//get user input
this.addEventListener('keypress', event => {
    keypressed = (event.code==key_A ? "A" : event.code==key_S ? "S" : event.code==key_D ? "D" : "!");
    alert("pressed");
    document.getElementById("gameDisplay").innerHTML += "key: "+keypressed + (validKeys.includes(keypressed) ? "found" : "not found") + "<br>";
  })
//do user input
if(shiftTimer<Date.now() && validKeys.includes(keypressed)){
    shiftFaller(keypressed=="A" ? -1 : keypressed=="S" ? 0 : keypressed=="D" ? 1 : null);
    document.getElementById("gameDisplay").innerHTML += "shifting: "+(keypressed=="A" ? -1 : keypressed=="S" ? 0 : keypressed=="D" ? 1 : null);
}
keypressed = null;

   if(level<1){    //end game condition
        clearInterval(gameloopID);
    }
},100); //change rate lower later

console.log("game over");
document.getElementById("gameDisplay").innerHTML += "game over";
