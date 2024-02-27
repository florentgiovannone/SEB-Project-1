# Star ward invader

## Table of Contents

- [Star ward invader](#Star-ward-invader)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [File Structure](#file-structure)
    - [index.html](#indexhtml)
    - [styles/main.css](#stylesmaincss)
    - [scripts/app.js](#scriptsappjs)
  - [Setup and Usage](#setup-and-usage)
  - [Enhancements](#enhancements)
  - [bugs](#bugs)

## Overview

This project is a web-based rendition of the classic space invader. It utilizes HTML, CSS, and JavaScript to create an interactive gaming experience where the player controls the player ship.

## Features

- A welcome screen with character's names link to some sound and text ehancement when the usert hover the character's image

- A grid where the ship is place at the bottom left of the grid

- a start button to start the game when the player is ready

- enemies that will spawn when the button has been pressed

- After 1 second of the enemies being on the screen the enemies will start shooting at the player randomly

- 5 lives that reduce everytime that the player is hit

- 3 differents levels with different ships at each levels

## Screenshots

![Welcome Screenshot](./images/welcome%20screen.png)
![Gameplay Screenshot](./images/game%20screen.png)
![Ending Screenshot](./images/ending%20screen.png)

## File Structure

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

## Setup and Usage

1. Clone or download the project to your local machine.

2. Open the `index.html` file in a web browser to start the game.

3. Use the arrow keys to move the ships and space bar to shoot at enemie

4. The game's objective is to beat all the ships and levels

You can also play the game online by visiting [Star Wars Invader](https://florentgiovannone.github.io/project-1-/)

## Enhancements

- 4 different ending: 1 loss and 1 win for each side with different gif and wording for each situation

- Each character has dedicated sound when hovering it

- different ships (player and enemies) and lasers color depending and who you are choosing

## bugs

- at time the enemies are still shooting when the player as cleared the screen. press the start button again and you will pass the next level

- the enemies keep shooting even after being shot, this is due to the fact that the killed enemies are copies into a new array of enemyRemoved rather than sliced and and pleced into this array
