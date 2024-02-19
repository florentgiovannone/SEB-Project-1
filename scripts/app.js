function init() {
  const startButton = document.getElementById("start-game");
  const grid = document.querySelector(".grid");
  let lives = 5;
  const livesDisplay = document.querySelector("#lives-display");
  let playerShipCurrentPosition = 90;

  livesDisplay.innerHTML = lives ? "❤️".repeat(lives) : "☠️";

  const width = 10; // width of a single row
  const CellsCount = width * width; //The number of cells in the grid(ten rows of ten)
  const cells = []; //how we store and reference the rows

  const enemy = [
    0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25,
  ];
  const enemyRemoved = [];
  let enemyId;
  let isGoingRigth = true;
  let enemyDirection = 1;

  function createGrid() {
    for (let i = 0; i < CellsCount; i++) {
      const cell = document.createElement("div");
      cell.innerText = i;
      grid.appendChild(cell);
      cells.push(cell);
    }
    addPlayerShip(playerShipCurrentPosition);
  }
  createGrid();

  function addPlayerShip(position) {
    cells[position].classList.add("playerShip");
  }

  function removePlayerShip(position) {
    cells[position].classList.remove("playerShip");
  }

  function shoot(event) {
    currentLAserId = playerShipCurrentPosition;

    function shootLaser() {
      cells[currentLAserId].classList.remove("chewy");
      currentLAserId -= width;
      cells[currentLAserId].classList.add("chewy");
    }
    if (event.keyCode === 32) {
      setInterval(shootLaser, 500);
    }
  }

  //   move player ship
  function handleKeyDown(event) {
    removePlayerShip(playerShipCurrentPosition);
    // left is 37
    if (event.keyCode === 37 && playerShipCurrentPosition % width !== 0) {
      playerShipCurrentPosition--;

      //  up is 38
    } else if (event.keyCode === 38 && playerShipCurrentPosition >= width) {
      playerShipCurrentPosition = playerShipCurrentPosition;

      //  up is 39
    } else if (
      event.keyCode === 39 &&
      playerShipCurrentPosition % width !== width - 1
    ) {
      playerShipCurrentPosition++;

      // down is 40
    } else if (
      event.keyCode === 40 &&
      playerShipCurrentPosition + width <= CellsCount - 1
    ) {
      playerShipCurrentPosition += width;
    }

    addPlayerShip(playerShipCurrentPosition);
  }

  function displayEnemy() {
    for (let i = 0; i < enemy.length; i++) {
      if (!enemyRemoved.includes(i)) {
        cells[enemy[i]].classList.add("vader");
      }
    }
  }
  displayEnemy();

  function moveEnemy() {
    const leftBorder = enemy[0] % width === 0;
    const rightBorder = enemy[enemy.length - 1] % width === width - 1;
    removeEnemy();

    if (rightBorder && isGoingRigth) {
      for (let i = 0; i < enemy.length; i++) {
        enemy[i] += width + 1;
        enemyDirection = -1;
        isGoingRigth = false;
      }
    }

    if (leftBorder && !isGoingRigth) {
      for (let i = 0; i < enemy.length; i++) {
        enemy[i] += width - 1;
        enemyDirection = 1;
        isGoingRigth = true;
      }
    }

    for (let i = 0; i < enemy.length; i++) {
      enemy[i] += enemyDirection;
    }

    if (cells[playerShipCurrentPosition].classList.contains("vader")) {
      clearInterval(enemyId);
    }

    displayEnemy();
  }

  function removeEnemy() {
    for (let i = 0; i < enemy.length; i++) {
      cells[enemy[i]].classList.remove("vader");
    }
  }

  enemyId = setInterval(() => moveEnemy(), 100);

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keydown", shoot);
}
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

window.addEventListener("DOMContentLoaded", init);
