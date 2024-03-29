//gameSetup
    //settings:         you could get user input to change these
    emptySpaceCharacter = "__";
    spacerCharacter = "";
    colorScheme =
    [`style="color:White; background-color:Purple;"`, `style="background-color:lightGreen;"`, `style="background-color:DodgerBlue;"`,
    `style="background-color:White;"`,
    `style="background-color:Orange;"`, `style="background-color:Red;"`, `style="color:Black; background-color:Yellow;"`, `style="color:White; background-color:Gray;"`];
    var unlockedLevels = 1; //starting level
    //initialize game
    var score = 0;
    var completedRows = [];
    const elementList = ["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg"];
    const periodicTable = {"H":-1, "He":+1, "Li":-1, "Be":-2, "B":-3, "C": +4, "N":+3, "O":+2, "F":+1, "Ne":0, "Na":-1, "Mg":-2};
    const validKeys = ["A","S","D"];
    level = unlockedLevels;

function levelSetup(unscaledWidth, unscaledHeight){
    makeGrid(level+unscaledWidth, level+unscaledHeight);
    setFaller(Math.floor(Math.random()*(gameGrid[0].length)), elementList[Math.floor(Math.random()*(level))] );
    printGrid();
    gravityTimer=Date.now()+Math.min((1100-(100*level)),250);
    shiftTimer=Date.now()+(1000*level/20);
    keypressed = null;
    //window.score = 0;
    score = 0; 
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
        print(`<t text-align="justify">`);
        element.forEach(element => {
            print(`<t `+colorScheme[periodicTable[element]+3]+`>`+(element.length==emptySpaceCharacter.length ? element : element+emptySpaceCharacter[0])+`</t>`+spacerCharacter);
        });
        print("</t><br>");
    });
    print("score: "+score+`<br>`);
    print("completed: "+completedRows);
    //print("faller is at "+fallerCoords+"<br>");
}
function mainGravityShift(){
    for(let column = gameGrid[0].length; column>-1; column--){
        for(let row = gameGrid.length-1; row>0; row--){
            if(gameGrid[row][column]==emptySpaceCharacter){
                gameGrid[row][column] = gameGrid[row-1][column];
                gameGrid[row-1][column] = emptySpaceCharacter;
            }
        }
    }
}
function doGravity(){
    //if the faller is landing at the top row, end game immediately
    if(fallerCoords[1]==0 && gameGrid[fallerCoords[1]+1][fallerCoords[0]]!=emptySpaceCharacter){
        level = 0;
        return;     //not necessary, but skips some redundant lines
        }
    //move everything down
    mainGravityShift();
    fallerCoords[1]++;

    //if the faller lands
    if(fallerCoords[1]==gameGrid.length-1 || gameGrid[fallerCoords[1]+1][fallerCoords[0]]!=emptySpaceCharacter){
        //check for rows made. This could be changed to only check the row the faller landed in in the future for efficiency
        gameGrid.forEach(element => {
            if(element.indexOf(emptySpaceCharacter)==-1 &&
            element.reduce((sum, a)=>(Number.isInteger(sum) ? sum : periodicTable[sum]) + (Number.isInteger(a) ? a : periodicTable[a]))==0){   //if there's no empty space in the row and it sums to 0
                print("row made: "+element);
                gameGrid[gameGrid.indexOf(element)] = emptyRow.map(x => x); //clear row
                printGrid();
                //mainGravityShift(); //do an extra shift so the rows fall before a new block starts falling, otherwise it might fall on a floating tower... :|
                score+=5;
                if(!completedRows.includes(element)){   //complete a new type of row
                    completedRows.push(element.map(x => x));
                    score+=5;
                }
            }
        //make new faller
        setFaller(Math.floor(Math.random()*(gameGrid[0].length)), elementList[Math.floor(Math.random()*(level+1))] );
        });
    }
    gravityTimer=Date.now()+Math.min((1100-(50*level)),500);
}
function shiftFaller(direction){
    //document.getElementById("gameDisplay").innerHTML += "shifting: "+direction;
    let newLocation = direction==0 ? [fallerCoords[0],fallerCoords[1]+1] : [fallerCoords[0]+direction,fallerCoords[1]];
    if(gameGrid[newLocation[1]][newLocation[0]]==emptySpaceCharacter){  //if newLocation is open...
        gameGrid[newLocation[1]][newLocation[0]] = gameGrid[fallerCoords[1]][fallerCoords[0]];  //set the newLocation to the faller
        gameGrid[fallerCoords[1]][fallerCoords[0]] = emptySpaceCharacter;       //and set the faller to a blank space
        fallerCoords = [newLocation[0],newLocation[1]];
        if(direction==0) score++;
    }
    printGrid();
    shiftTimer=Date.now()+Math.max(1000*(level/20),250); //only if shift successful?
}
function setFaller(xPosition, value){
    gameGrid[0][xPosition] = value;
    fallerCoords = [xPosition,0];
}
    level = unlockedLevels;
    levelSetup(1,5);
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
print("game over");