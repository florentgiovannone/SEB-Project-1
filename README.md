# Star Ward Invader

## Summary

  - [Description](#description)
  - [Deployement](#deployement)
  - [Technologies](#technologies)
  - [Timeframe & working team ](#timeframe--working-team)
  - [Screenshots](#screenshots)
    - [Welcome screen](#welcome-screen)
    - [Gameplay screen ](#gameplay-screen )
    - [Game over screen ](#game-over-screen )
  - [Planning](#planning)
    - [index.html](#indexhtml)
    - [styles/main.css](#stylesmaincss)
    - [scripts/app.js](#scriptsappjs)
  - [Build code process](#build-code-process)
    - [Player shooting and movement](#player-shooting-and-movement)
    - [Enemy moving and shooting](#enemy-moving-and-shooting)
  - [Wins](#wins)
  - [Key learning and takeaway](#key-learning-and-takeaway)
  - [Bugs](#bugs)
  - [Future improvements](#future-improvements)


## Description

This project is a web-based rendition of the classic space invader game. It utilizes HTML, CSS, and JavaScript to create an interactive gaming experience where the player controls the player ship.
[Play here!](https://starwarsinvaqder.netlify.app/)

## Deployement
We have use Netify to deploy our app

1. Clone or download the project to your local machine.
2. Open the index.html file in a web browser to start the game.

## Technologies
- HTML
- CSS 
- Vanilla JavaScript

## Timeframe & working team 
This was our first project and it was a solo project. It lastest a total of 5 days. 
I also pseudo coded each feature prior before starting  coding 

We had a daily stand up at the begining of everydays and I was updating my task list few times a day.

## Screenshots
### Welcome screen
First page: This gives the user the choice of picking a character to start the game. When hovering over each character, the name of the character will be shown on the screen and a 'catch phrase' will be heard.
![Welcome Screenshot](./images/welcome%20screen.png)

Gameplay page: the user will see the ship and be able to move it around. When the user press start, the enemy ships will spawn. Depending on the character chosen, the user will see different ships. Each level, the user will hear different music and see different ships.
### Gameplay screen 
![Gameplay Screenshot](./images/game%20screen.png)

When the game finishes, the user will see a GIF and a leaderboard that is linked to the userr local storage. There are four different endings depending on whom the user choose and whether the user win or lose.
### Game over screen 
![Ending Screenshot](./images/ending%20screen.png)


## Planning
To setup this project I started by a wireframing of the app and a day by day task set with the number of hours to be dedicated on the development of each features. 

This allowed me to challenge myself and to ensure a MVP was ready by the end of the project. 

```plaintext
star wars invader
│
├── index.html # Main HTML file for the game.
│
├── styles
│       └── main.css # CSS styles for the game.
│
└── scripts
│        └──app.js # JavaScript logic for the game functionality.
│
└── images
│
│
└── sounds

```

### index.html

Contains the structure of the game, including the game grid current highscore from the local memory score display and lives display.

### styles/main.css

Defines the styling for the game, including the layout of the game grid, player ships, enemies ships derpending on who you are choosing. It also includes styles for the score display and instructions.

### scripts/app.js

Contains the JavaScript logic for the game's functionality. This includes moving of the ships and enemies, shooting at and from the enemies and updating the score and lives.


## Build code process
Step 1:
I started by setting up the basics of HTML and CSS to establish a style identity.

Step 2:
Next, I created the grid and added visuals such as character images and audio, as well as planned the ending GIFs.

Step 3:
Once all the content was in place, I began working on adding and removing classes to display what was needed for an entertaining gameplay experience.

Step 4:
I incorporated audio for each character and each level.

Step 5:
I focused on implementing final features such as scoring, leaderboard functionality, lives, and scores.

Step 6:
Finally, I addressed the different endings depending on the outcome of the game.


### Player shooting and movement 
```jsx 
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
  ```


### Enemy moving and shooting
```jsx
 // Adding class to enemy to appear
  function displayEnemy() {
    for (let i = 0; i < enemy.length; i++) {
      if (!enemyRemoved.includes(i)) {
        cells[enemy[i]].classList.add(classEnemyOne);
      }
    }
  }

  // removing class to enemy to disapear and move
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
```

## Wins
The biggest achievement for me in this project was getting the enemy to move downward instead of crossing the walls of the grid. Additionally, successfully implementing the enemy disappearing when hit was also a significant win.

After completing this project, I feel much more confident in coding JavaScript and manipulating what needs to be seen by the user at a given time.

## Key learning and takeaway
If I would have to make this project again, I would prioritise a lot more time on the gameplay itself first and look at styling later during the project 


## Bugs
- Sometimes, the enemies keep shooting even after the player has cleared the screen. Press the start button again, and you will advance to the next level.

-The issue where enemies continue shooting after being shot is caused by the fact that the killed enemies are copied into a new array called enemyRemoved rather than being sliced and placed into this array.

## Future improvements

-There are four different endings: one loss and one win for each side, each with a different GIF and wording for each situation.

-Each character has a dedicated sound when hovered over.

-The ships (player and enemies) and lasers have different colors depending on whom you choose.