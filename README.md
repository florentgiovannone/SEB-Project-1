# Star Wars Invader

## Summary

- [Description](#description)
- [Deployment](#deployment)
- [Technologies](#technologies)
- [Timeframe & Working Team](#timeframe--working-team)
- [Screenshots](#screenshots)
  - [Welcome Screen](#welcome-screen)
  - [Gameplay Screen](#gameplay-screen)
  - [Game Over Screen](#game-over-screen)
- [Planning](#planning)
  - [index.html](#indexhtml)
  - [styles/main.css](#stylesmaincss)
  - [scripts/app.js](#scriptsappjs)
- [Build Code Process](#build-code-process)
  - [Player Shooting and Movement](#player-shooting-and-movement)
  - [Enemy Moving and Shooting](#enemy-moving-and-shooting)
- [Wins](#wins)
- [Challenges](#challenges)
- [Key Learning and Takeaway](#key-learning-and-takeaway)
- [Bugs](#bugs)
- [Future Improvements](#future-improvements)

## Description

### What is Space Invader?
Space Invaders: Defend Earth against an alien invasion! Control your spacecraft as waves of extraterrestrial does descend from above, unleashing relentless firepower. Blast through the ranks of invaders, dodging their attacks, and strive to be the hero humanity needs. With fast-paced action and strategic maneuvers, can you save the planet from the impending threat?

### What is My Twist on It?
I recreated a Space Invader game using Star Wars as a theme. The user can choose a character which will then update the kind of music, ships, and assets.

This project is a web-based rendition of the classic Space Invader game. It utilizes HTML, CSS, and JavaScript to create an interactive gaming experience where the player controls the player ship. [Play here!](https://starwarsinvaqder.netlify.app/)

## Deployment
We have used Netlify to deploy our app.

1. Clone or download the project to your local machine.
2. Open the `index.html` file in a web browser to start the game.

## Technologies
- HTML
- CSS
- Vanilla JavaScript

## Timeframe & Working Team
This was our first project and it was a solo project. It lasted a total of 5 days. I also pseudo-coded each feature prior to starting coding.

We had a daily stand-up at the beginning of every day, and I was updating my task list a few times a day.

## Screenshots
### Welcome Screen
First page: This gives the user the choice of picking a character to start the game. When hovering over each character, the name of the character will be shown on the screen and a 'catch phrase' will be heard.
![Welcome Screenshot](./images/welcome%20screen.png)

### Gameplay Screen
The user will see the ship and be able to move it around. When the user presses start, the enemy ships will spawn. Depending on the character chosen, the user will see different ships. Each level, the user will hear different music and see different ships.
![Gameplay Screenshot](./images/game%20screen.png)

### Game Over Screen
When the game finishes, the user will see a GIF and a leaderboard that is linked to the user's local storage. There are four different endings depending on whom the user chooses and whether the user wins or loses.
![Ending Screenshot](./images/ending%20screen.png)

## Planning
To set up this project, I started by wireframing the app and creating a day-by-day task set with the number of hours to be dedicated to the development of each feature.

This allowed me to challenge myself and to ensure an MVP was ready by the end of the project.

```plaintext
star wars invader
│
├── index.html # Main HTML file for the game.
│
├── styles
│   └── main.css # CSS styles for the game.
│
└── scripts
    └── app.js # JavaScript logic for the game functionality.

```

### index.html

Contains the structure of the game, including the game grid, current high score from the local memory score display, and lives display.

### styles/main.css

Defines the styling for the game, including the layout of the game grid, player ships, enemy ships depending on who you are choosing. It also includes styles for the score display and instructions.

### scripts/app.js

Contains the JavaScript logic for the game's functionality. This includes moving the ships and enemies, shooting at and from the enemies, and updating the score and lives.


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




This snippet function gets the player to move and shoot depending on which key code is actioned by the player. The way the player moves is by removing and adding classes going right or left. 

For shooting, I used a similar approach; however, this time I used the setInterval built-in function. The laser will stop if the laser touched an enemy or if the laser is at the top of the screen. 
The shooting is matched with sound when shooting and when an enemy is killed.  
```javascript
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
Enemy shooting is very similar to player shooting, unless this time enemies are chosen randomly from the array of enemies.

Enemy movement was slightly more challenging, as at first the enemies were just going through walls. To bypass this issue, I created a function checking if the last enemy has reached the wall, and if the enemy is moving to the right or left. If both of these conditions are met, the enemy will then go down once and then the opposite way.
```javascript
 // Adding class to enemy to appear
  function displayEnemy() {
    for (let i = 0; i < enemy.length; i++) {
      if (!enemyRemoved.includes(i)) {
        cells[enemy[i]].classList.add(classEnemyOne);
      }
    }
  }

  // removing class to enemy to disappear and move
  function removeEnemy() {
    for (let i = 0; i < enemy.length; i++) {
      cells[enemy[i]].classList.remove(classEnemyOne);
    }
  }

  // moving the enemies around
  function enemyMovement() {
    const leftBorder = enemy[0] % width === 0;
    const rightBorder = enemy[enemy.length - 1] % width === width - 1;

    if (rightBorder && isGoingRight) {
      for (let i = 0; i < enemy.length; i++) {
        enemy[i] += width + 1;
        enemyDirection = -1;
        isGoingRight = false;
      }
    }

    if (leftBorder && !isGoingRight) {
      for (let i = 0; i < enemy.length; i++) {
        enemy[i] += width - 1;
        enemyDirection = 1;
        isGoingRight = true;
      }
    }

    for (let i = 0; i < enemy.length; i++) {
      enemy[i] += enemyDirection;
    }
  }

  // enemy movement sync
  function moveEnemy() {
    removeEnemy();
    enemyMovement();
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

## Challenges
During this project, the main challenges were all linked to the enemies.

1. Enemy Movement: As a true space invader, enemies were supposed to go right or left until one enemy reached the wall. I struggled at first, but then read a lot and came across a good solution that tracked the last movement and, depending on the location of the enemy, the whole pack would go down and then the other way.

2. Killed Enemy: Removing the enemies killed from the array was hard. I couldn't manage to get the array sliced and remove the enemies. Instead, I copied the killed enemies into a new array. This created a bug (still existing) that even the killed enemies are shooting.

## Key Learning and Takeaway
If I were to make this project again, I would prioritize a lot more time on the gameplay itself first and look at styling later during the project.

## Bugs
- Sometimes, the enemies keep shooting even after the player has cleared the screen. Press the start button again, and you will advance to the next level.

- The issue where enemies continue shooting after being shot is caused by the fact that the killed enemies are copied into a new array called `enemyRemoved` rather than being sliced and placed into this array.

## Future Improvements
I would love to implement the below improvements:

- Have more factions and more levels to make the game harder to play.
- Implement a global leaderboard so players from across the world can compare with each other.
- Fix the bugs.  
