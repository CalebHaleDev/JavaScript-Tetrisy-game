//to do list:
//add score, unlocking higher levels and level selection
//better graphics? (Actual graphics)?
//add "completed rows" panel, score bonus

//next version to-do list:
//unfinished items from above
//better graphics (actual graphics) if not done already
//element dataType
//special powerups

function gameSetup(){
    //settings:         you could get user input to change these
    let startingLevel = 4;
    emptySpaceCharacter = "  ";
    emptySpaceCharacter = "__";
    //initialize game
    elementList = ["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg"];
    periodicTable = {"H":-1, "He":+1, "Li":-1, "Be":-2, "B":-3, "C": +4, "N":+3, "O":+2, "F":+1, "Ne":0, "Na":-1, "Mg":-2};
    validKeys = ["A","S","D"];
    level = startingLevel;
    levelSetup(1, 5);   //specify additional width, height changes
    print("starting game loop");
}
function levelSetup(unscaledWidth, unscaledHeight){
    makeGrid(level+unscaledWidth, level+unscaledHeight);
    setFaller(Math.floor(Math.random()*(gameGrid[0].length)), elementList[Math.floor(Math.random()*(level))] );
    printGrid();
    gravityTimer=Date.now()+Math.min((1100-(100*level)),250);
    shiftTimer=Date.now()+(1000*level/20);
    keypressed = null;
    completedRows = [];
}
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
function print(printText){
    document.getElementById("gameDisplay").innerHTML += printText;
}
function printGrid(){
    document.getElementById("gameDisplay").innerHTML = "<br>";
    gameGrid.forEach(element => {
        element.forEach(element => {
            print(element.length==emptySpaceCharacter.length ? element : element+emptySpaceCharacter[0]);
        });
        print("<br>");
    });
    print("score: "+score);
    //print("btw, now is "+(Date.now()%10000)+"<br>");
    //print("faller is at "+fallerCoords+"<br>");
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
        setFaller(Math.floor(Math.random()*(gameGrid[0].length)), elementList[Math.floor(Math.random()*(level))] );

        //check for rows made. This could be changed to only check the row the faller landed in in the future for efficiency
        gameGrid.forEach(element => {
            if(element.indexOf(emptySpaceCharacter)==-1){   //if there's no empty space in the row
                print("row made: "+element);
                gameGrid[gameGrid.indexOf(element)] = emptyRow.map(x => x); //clear row
                //could also set the row to a "win row" to show visually, print out the grid once to make sure it displays, then wipe it, just for a fun visual
                score+=5;
                if(!completedRows.includes(element)){   //complete a new type of row
                    completedRows.push(element.map(x => x));
                    score+=5;
                }
            }
        });
    }
    gravityTimer=Date.now()+Math.min((1100-(50*level)),500);
    //level -= .05;
}
function shiftFaller(direction){
    //document.getElementById("gameDisplay").innerHTML += "shifting: "+direction;
    let newLocation = direction==0 ? [fallerCoords[0],fallerCoords[1]+1] : [fallerCoords[0]+direction,fallerCoords[1]];
    if(gameGrid[newLocation[1]][newLocation[0]]==emptySpaceCharacter){  //if newLocation is open...
        gameGrid[newLocation[1]][newLocation[0]] = gameGrid[fallerCoords[1]][fallerCoords[0]];  //set the newLocation to the faller
        gameGrid[fallerCoords[1]][fallerCoords[0]] = emptySpaceCharacter;       //and set the faller to a blank space
        fallerCoords = [newLocation[0],newLocation[1]];
        //if(direction==0) score++;
    }
    printGrid();
    shiftTimer=Date.now()+Math.max(1000*(level/20),250); //only if shift successful?
}
function setFaller(xPosition, value){
    gameGrid[0][xPosition] = value;
    fallerCoords = [xPosition,0];
}

gameSetup();
var score = 0;  //for some reason it will let other variables be defined in setup, but not score

//main game loop
var gameloopID = setInterval(()=> {
    //get user input
    this.addEventListener('keypress', event => {
        keypressed = event.code[3];
    //print(event.code[3]+" pressed, "+(validKeys.includes(keypressed) ? "found" : "not found") + " in valid keys <br>");
  })
  //do user input
  if(shiftTimer<Date.now() && validKeys.includes(keypressed)){
    shiftFaller(keypressed=="A" ? -1 : keypressed=="S" ? 0 : keypressed=="D" ? 1 : null);
    //document.getElementById("gameDisplay").innerHTML += "shifting: "+(keypressed=="A" ? -1 : keypressed=="S" ? 0 : keypressed=="D" ? 1 : null);
}
keypressed = null;
    //do gravity
    if(gravityTimer<Date.now()){
        doGravity();
        printGrid();
    }

   if(level<1){    //end game condition
        clearInterval(gameloopID);
    }
},100); //refresh rate

console.log("game over");
document.getElementById("gameDisplay").innerHTML += "game over";
