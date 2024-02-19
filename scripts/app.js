function init() {

const grid = document.querySelector(".grid");

const width = 10; // width of a single row
const CellsCount = width * width; //The number of cells in the grid(ten rows of ten)
const cells = []; //how we store and reference the rows

function createGrid() {
  for (let i = 0; i < CellsCount; i++) {
    const cell = document.createElement("div");
    cell.innerText = i;
    grid.appendChild(cell);
    cells.push(cell);
  }
  addCat(catCurrentPosition);
}
 createGrid();

    // -----------PLAYER-----------
        // Players character array
    // Have the player spawn on the screen at the begining "add player function" adding classes
    // once the player is hit the player loose a life (5 lifes total)
    // Player removed once no more lifes "Remove player function" removing classes
    // Have the player shoot and travel spawn only when space is pressed
    // have the shoot from player disapeared once it hit an alien or the end of the grid





    // -----------ALIENS-----------
    // Array for "aliens"
    // Have the aliens spawn on the screen "add alien function"  adding classes
    // Have the alien disapear once hit "Remove alien function" removing classes
    // Have the alien shoot and travel spawn
    // have the shoot from alien disapeared once it hit the player or the end of the grid
    // Array of starting positions of the aliens





    // -----------MAIN-----------
    // Create Score, Lives, Current level and highscore
    // Create grid and rules for the player and the alien to stay withing the grid
    // Make the game faster when the level id increased
    // High score will have to be retrived from local memory
    // Remove every class from the grid once the game is over
    // create a seamless UI to enter and exit the game
    // Have function for every stage of the game steps (welcome, play, end -> play again)
    // have a function for each  level playable link to a button when the player is ready
    // have a mute       
    // incorporate assets via JS or CSS to keep HTML as clean as possible





}
window.addEventListener("DOMContentLoaded", init);
