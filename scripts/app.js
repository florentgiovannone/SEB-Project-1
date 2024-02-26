function init() {
  const startButton = document.querySelector("#start-game");
  const playButton = document.querySelector("#reset-button");
  const grid = document.querySelector(".grid");

  // pages content contant
  const welcomePage = document.getElementById("welcome-page");
  const gamePage = document.getElementById("game-page");
  const resultPage = document.getElementById("result-page");
  const winPage = document.getElementById("win");
  const lostPage = document.getElementById("loss");
  const winReb = document.getElementById("rebwon");
  const lostReb = document.getElementById("reblost");
  const winRep = document.getElementById("repwon");
  const lostRep = document.getElementById("replost");

  const message = document.getElementById("message");

  // character variable
  const solo = document.getElementById("solo");
  const chewy = document.getElementById("chewy");
  const luke = document.getElementById("luke");
  const ren = document.getElementById("ren");
  const vader = document.getElementById("vader");
  const palpatine = document.getElementById("palpatine");

  // Audio variable
  const unloopedAudio = document.getElementById("unloop");
  const loopedAudio = document.getElementById("loop");
  const buttonMute = document.getElementById("mute");
  const buttonUnmute = document.getElementById("unmute");

  // Level variable
  const levelTwo = document.getElementById("level-two");
  const levelThree = document.getElementById("level-three");
  const displayName = document.getElementById("name");

  // class adapt variable
  let classPlayer = "";
  let classLaserPlayer = "";
  let classLaserEnemy = "";
  let classEnemyOne = "";
  let classEnemyTwo = "";
  let classEnemyThree = "";

  // Live display
  let lives = 5;
  const livesDisplay = document.querySelector("#lives-display");
  livesDisplay.innerHTML = lives ? "❤️".repeat(lives) : "☠️";

  // Score display
  let score = 0;
  let name = " ";
  const scoreDisplay = document.querySelector(".score-display");
  const scoreDisplayLoss = document.querySelector(".score-display-loss");
  const scoreDisplayWin = document.querySelector(".score-display-win");

  // player position
  let playerShipCurrentPosition = 90;

  // Enemy position and movement variable
  let enemy = [
    0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25,
  ];
  const enemyRemoved = [];
  let isGoingRigth = true;
  let enemyDirection = 1;
  let isPlaying = false;
  let timer = null;
  let timerShoot = null;

  // Grid setup
  const width = 10; // width of a single row
  const cellsCount = width * width; //The number of cells in the grid(ten rows of ten)
  const cells = []; //how we store and reference the rows

  // function to create the grid
  function createGrid() {
    for (let i = 0; i < cellsCount; i++) {
      const cell = document.createElement("div");
      cell.innerText = i;
      grid.appendChild(cell);
      cells.push(cell);
    }
    addPlayerShip(playerShipCurrentPosition);
  }

  // Adding class to player
  function addPlayerShip(position) {
    cells[position].classList.add(classPlayer);
  }

  // removing class to player
  function removePlayerShip(position) {
    cells[position].classList.remove(classPlayer);
  }

  // Player shoot function
  function shoot(event) {
    let laserId;
    let currentLaserId = playerShipCurrentPosition;

    function shootLaser() {
      cells[currentLaserId].classList.remove(classLaserPlayer);
      currentLaserId -= width;
      cells[currentLaserId].classList.add(classLaserPlayer);

      if (cells[currentLaserId].classList.contains(classEnemyOne)) {
        cells[currentLaserId].classList.remove(classLaserPlayer);
        cells[currentLaserId].classList.remove(classEnemyOne);
        cells[currentLaserId].classList.add("boom");

        setTimeout(() => cells[currentLaserId].classList.remove("boom"), 100);
        clearInterval(laserId);

        const oneEnemyRemoved = enemy.indexOf(currentLaserId);
        enemyRemoved.push(oneEnemyRemoved);
        score += 100;
        scoreDisplay.innerHTML = score;
      }
    }
    if (event.keyCode === 32) {
      console.log(enemyRemoved.length);
      laserId = setInterval(shootLaser, 100);
      setTimeout(() => {
        cells[currentLaserId].classList.remove(classLaserPlayer);
        clearInterval(laserId);
      }, 999);
      unloopedAudio.src = "./sounds/shoot.mp3";
      unloopedAudio.play();
    }
  }

  // player movement
  function handleKeyDown(event) {
    removePlayerShip(playerShipCurrentPosition);
    // left is 37
    if (event.keyCode === 37 && playerShipCurrentPosition % width !== 0) {
      playerShipCurrentPosition--;

      //  up is 38
    } else if (event.keyCode === 38 && playerShipCurrentPosition >= width) {
      playerShipCurrentPosition = playerShipCurrentPosition;

      //  right is 39
    } else if (
      event.keyCode === 39 &&
      playerShipCurrentPosition % width !== width - 1
    ) {
      playerShipCurrentPosition++;

      // down is 40
    } else if (event.keyCode === 40 && playerShipCurrentPosition >= width) {
      playerShipCurrentPosition = playerShipCurrentPosition;
    }

    addPlayerShip(playerShipCurrentPosition);
  }

  // Adding class to enemy to appear
  function displayEnemy() {
    for (let i = 0; i < enemy.length; i++) {
      if (!enemyRemoved.includes(i)) {
        cells[enemy[i]].classList.add(classEnemyOne);
      }
    }
  }

  // removing clas to enemy to disapear and move
  function removeEnemy() {
    for (let i = 0; i < enemy.length; i++) {
      cells[enemy[i]].classList.remove(classEnemyOne);
    }
  }

  // moving the enemies around
  function enemyMouvement() {
    const leftBorder = enemy[0] % width === 0;
    const rightBorder = enemy[enemy.length - 1] % width === width - 1;

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
  }

  // enemy mouvement sync
  function moveEnemy() {
    removeEnemy();
    enemyMouvement();
    displayEnemy();
    checkIfLost();
  }

  // check if the player has lost
  function checkIfLost() {
    // Check if any enemy has reached the bottom of the grid
    if (!lives) {
      gameLost();
    }
    if (enemy.some((item) => item >= width * width - width)) {
      gameLost();
      removeEnemy();
      clearInterval(timer);
      return; // Exit the function early if the game is over
    }
  }

  // Enemy shoot function
  function shootEnemy() {
    // Generate a random index to select an enemy
    const randomEnemyIndex = Math.floor(Math.random() * enemy.length);

    let laserIdEnemy;
    let currentLaserIdEnemy = enemy[randomEnemyIndex]; // Select the enemy to shoot at

    function shootLaserEnemy() {
      cells[currentLaserIdEnemy].classList.remove(classLaserEnemy);
      currentLaserIdEnemy += width;
      cells[currentLaserIdEnemy].classList.add(classLaserEnemy);

      if (cells[currentLaserIdEnemy].classList.contains(classPlayer)) {
        lives--;
        livesDisplay.innerHTML = lives ? "❤️".repeat(lives) : "☠️";
        cells[currentLaserIdEnemy].classList.remove(classLaserEnemy);
        cells[currentLaserIdEnemy].classList.add("boom");

        setTimeout(
          () => cells[currentLaserIdEnemy].classList.remove("boom"),
          100
        );
        clearInterval(laserIdEnemy);
        score -= 500;
        scoreDisplay.innerHTML = score;
      }

      if (currentLaserIdEnemy >= 90) {
        clearInterval(laserIdEnemy);
        cells[currentLaserIdEnemy].classList.remove(classLaserEnemy);
      }
    }
    laserIdEnemy = setInterval(shootLaserEnemy, 100);
    unloopedAudio.src = "./sounds/shoot.mp3";
    unloopedAudio.play();
  }

  // start Game function
  function startGameOne() {
    if (!isPlaying) {
      isPlaying = true;
      timer = setInterval(moveEnemy, 800);
      timerShoot = setInterval(shootEnemy, 900);
    }

    if (enemyRemoved.length >= 18) {
      gameWonLevelOne();
      enemy = [
        0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25,
      ];
      enemyRemoved.length = 0;
      isPlaying = false;
      clearInterval(timer); // Clear the timer when the game is won
      clearInterval(timerShoot); // Clear the timer when the game is won
    }
  }
  // level two start
  function startGameTwo() {
    classEnemyOne = classEnemyTwo;
    message.classList.add("hidden");
    if (!isPlaying) {
      isPlaying = true;
      timer = setInterval(moveEnemy, 500);
      timerShoot = setInterval(shootEnemy, 700);
    }

    if (enemyRemoved.length >= 18) {
      gameWonLevelTwo();
      enemy = [
        0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25,
      ];
      enemyRemoved.length = 0;
      isPlaying = false;
      clearInterval(timer); // Clear the timer when the game is won
      clearInterval(timerShoot); // Clear the timerShoot when the game is won
    }
  }
  // level 3 start
  function startGameThree() {
    classEnemyOne = classEnemyThree;
    message.classList.add("hidden");
    if (!isPlaying) {
      isPlaying = true;
      timer = setInterval(moveEnemy, 250);
      timerShoot = setInterval(shootEnemy, 500);
    }

    if (enemyRemoved.length >= 18) {
      gameWonLevelThree();
      enemy = [
        0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25,
      ];
      enemyRemoved.length = 0;
      isPlaying = false;
      clearInterval(timer); // Clear the timer when the game is won
      clearInterval(timerShoot); // Clear the timer when the game is won
    }
  }
  // events when level one won
  function gameWonLevelOne() {
    startButton.classList.add("hidden");
    levelTwo.classList.remove("hidden");
    scoreDisplay.innerHTML = score;
    scoreDisplayLoss.innerHTML = score;
    scoreDisplayWin.innerHTML = score;
    message.classList.remove("hidden");
    message.innerHTML = "you beat Level one, press level two to start";
    const highScore = localStorage.getItem("high-score");
    if (!highScore || score > highScore) {
      localStorage.setItem("high-score", score);
      highScoreSetUp();
    }
  }
  // events when level two won
  function gameWonLevelTwo() {
    startButton.classList.add("hidden");
    levelTwo.classList.add("hidden");
    levelThree.classList.remove("hidden");
    message.classList.remove("hidden");
    scoreDisplay.innerHTML = score;
    scoreDisplayLoss.innerHTML = score;
    scoreDisplayWin.innerHTML = score;
    const highScore = localStorage.getItem("high-score");
    message.innerHTML = "you beat Level two, press level three to start";
    if (!highScore || score > highScore) {
      localStorage.setItem("high-score", score);
      highScoreSetUp();
    }
  }
  // events when level three won
  function gameWonLevelThree() {
    gamePage.classList.add("hidden");
    resultPage.classList.remove("hidden");
    lostPage.classList.add("hidden");
    scoreDisplay.innerHTML = score;
    scoreDisplayLoss.innerHTML = score;
    scoreDisplayWin.innerHTML = score;
    loopedAudio.src = "./sounds/levelthree.mp3";
    loopedAudio.play();
    const highScore = localStorage.getItem("high-score");
    if (!highScore || score > highScore) {
      name = prompt("You have the higest score!!! what is your name ?");
      localStorage.setItem("high-score", score);
      localStorage.setItem("name", name);
      highScoreSetUp();
    }
  }
  // // events when lost
  function gameLost() {
    clearInterval(timer);
    clearInterval(timerShoot);
    removeEnemy();
    const highScore = localStorage.getItem("high-score");
    if (!highScore || score > highScore) {
      localStorage.setItem("high-score", score);
      highScoreSetUp();
    }
    gamePage.classList.add("hidden");
    resultPage.classList.remove("hidden");
    winPage.classList.add("hidden");
    scoreDisplay.innerHTML = score;
    scoreDisplayLoss.innerHTML = score;
    scoreDisplayWin.innerHTML = score;
    loopedAudio.src = "./sounds/levelthree.mp3";
    loopedAudio.play();
  }
  // highscore setup
  function highScoreSetUp() {
    const highScoreDisplay = document.querySelector("#highscore-display");
    const highScoreDisplayFinal = document.querySelector("#highscore-final");
    const highScoreDisplayFinalName = document.querySelector("#name-final");
    const highScoreStorage = localStorage.getItem("high-score");
    const highScoreStorageName = localStorage.getItem("name");
    highScoreDisplay.innerHTML = highScoreStorage;
    highScoreDisplayFinal.innerHTML = highScoreStorage;
    highScoreDisplayFinalName.innerHTML = highScoreStorageName;
  }
  // playagain button function
  function playAgain() {
    welcomePage.classList.remove("hidden");
    resultPage.classList.add("hidden");
    window.location.reload();
  }
  // chnage cosmetic if player chose rebelion
  function choseReb() {
    classPlayer = "falcon";
    classLaserPlayer = "laser-blue";
    classLaserEnemy = "laser-red";
    classEnemyOne = "bomber-enemy";
    classEnemyTwo = "star-destroyer-enemy";
    classEnemyThree = "deathstar-enemy";
    welcomePage.classList.add("hidden");
    gamePage.classList.remove("hidden");
    loopedAudio.src = "./sounds/levelone.mp3";
    loopedAudio.play();
    winRep.classList.add("hidden");
    lostRep.classList.add("hidden");
    highScoreSetUp();
    createGrid();
  }
  // chnage cosmetic if player chose republic
  function choseRep() {
    classEnemyOne = "luke-enemy";
    classEnemyTwo = "ghost";
    classEnemyThree = "falcon";

    classPlayer = "star-destroyer";
    classLaserPlayer = "laser-red";
    classLaserEnemy = "laser-blue";
    loopedAudio.src = "./sounds/leveltwo.mp3";
    loopedAudio.play();
    welcomePage.classList.add("hidden");
    gamePage.classList.remove("hidden");
    winReb.classList.add("hidden");
    lostReb.classList.add("hidden");

    highScoreSetUp();
    createGrid();
  }
  // mute button function
  function enableMute() {
    loopedAudio.muted = true;
    unloopedAudio.muted = true;
    buttonUnmute.classList.remove("hidden");
    buttonMute.classList.add("hidden");
  }
  // unmute button function
  function disableMute() {
    loopedAudio.muted = false;
    unloopedAudio.muted = false;
    buttonUnmute.classList.add("hidden");
    buttonMute.classList.remove("hidden");
  }
  // function when mouse enter the character page to play a sound and show character name
  function enter(event) {
    if (event.target.id === "luke") {
      displayName.innerHTML = "luke";
      unloopedAudio.src = `./sounds/${event.target.id}.mp3`;
      unloopedAudio.play();
    }

    if (event.target.id === "chewy") {
      displayName.innerHTML = "chewbacca";
      unloopedAudio.src = `./sounds/${event.target.id}.mp3`;
      unloopedAudio.play();
    }
    if (event.target.id === "solo") {
      displayName.innerHTML = "han solo";
      unloopedAudio.src = `./sounds/${event.target.id}.mp3`;
      unloopedAudio.play();
    }
    if (event.target.id === "vader") {
      displayName.innerHTML = "Darth vader";
      unloopedAudio.src = `./sounds/${event.target.id}.mp3`;
      unloopedAudio.play();
    }
    if (event.target.id === "ren") {
      displayName.innerHTML = "Kylo Ren";
      unloopedAudio.src = `./sounds/${event.target.id}.mp3`;
      unloopedAudio.play();
    }
    if (event.target.id === "palpatine") {
      displayName.innerHTML = "darth sidious";
      unloopedAudio.src = `./sounds/${event.target.id}.mp3`;
      unloopedAudio.play();
    }
  }
  // function when mouse leave the character page to stop playing a sound and stop showing character name
  function leave(event) {
    if (event.target.id === "luke") {
      displayName.innerHTML = "";
      unloopedAudio.pause();
    }

    if (event.target.id === "chewy") {
      displayName.innerHTML = "";
      unloopedAudio.pause();
    }
    if (event.target.id === "solo") {
      displayName.innerHTML = "";
      unloopedAudio.pause();
    }
    if (event.target.id === "vader") {
      displayName.innerHTML = "";
      unloopedAudio.pause();
    }
    if (event.target.id === "ren") {
      displayName.innerHTML = "";
      unloopedAudio.pause();
    }
    if (event.target.id === "palpatine") {
      displayName.innerHTML = "";
      unloopedAudio.pause();
    }
  }
// muter / unmute listener
  buttonMute.addEventListener("click", enableMute);
  buttonUnmute.addEventListener("click", disableMute);

// listener to chose character and adapt cosmetics
  solo.addEventListener("click", choseReb);
  chewy.addEventListener("click", choseReb);
  luke.addEventListener("click", choseReb);
  ren.addEventListener("click", choseRep);
  palpatine.addEventListener("click", choseRep);
  vader.addEventListener("click", choseRep);

  // listener to trigger function to enter and leave each character
  luke.addEventListener("mouseenter", enter);
  luke.addEventListener("mouseleave", leave);
  solo.addEventListener("mouseenter", enter);
  solo.addEventListener("mouseleave", leave);
  chewy.addEventListener("mouseenter", enter);
  chewy.addEventListener("mouseleave", leave);
  vader.addEventListener("mouseenter", enter);
  vader.addEventListener("mouseleave", leave);
  ren.addEventListener("mouseenter", enter);
  ren.addEventListener("mouseleave", leave);
  palpatine.addEventListener("mouseenter", enter);
  palpatine.addEventListener("mouseleave", leave);

  // keydown listener
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keydown", shoot);

  // listener to start games
    playButton.addEventListener("click", playAgain);
  startButton.addEventListener("click", startGameOne);
  levelTwo.addEventListener("click", startGameTwo);
  levelThree.addEventListener("click", startGameThree);
  // bossLevel.addEventListener("click", startGameThree);
}
window.addEventListener("DOMContentLoaded", init);
