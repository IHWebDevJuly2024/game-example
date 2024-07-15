console.log("GAME initialized");
const gameOverElement = document.querySelector("#game-over-screen");
const startGameButton = document.querySelector("#start-game-btn");
const gameStartScreen = document.querySelector("#game-start-screen");

startGameButton.addEventListener("click", () => {
  game.hasStarted = true;
  gameStartScreen.style.display = "none";
});

const game = {
  score: 0,
  lives: 6,
  enemies: [],
  level: 0,
  isGameOver: false,
  hasStarted: false,
  level: 0,
  checkGameOver() {
    if (this.lives <= 0) {
      gameOverElement.style.display = "flex";
      this.isGameOver = true;
      const tryAgainButton = document.querySelector("#try-again-btn");
      tryAgainButton.addEventListener("click", () => {
        location.reload();
      });
    }
  },
};

const livesElement = document.querySelector("#lives");
livesElement.textContent = "💖".repeat(game.lives);

// create a reference to the game area
const gameArea = document.querySelector("#game-area");
console.table({
  gameAreaHeight: gameArea.offsetHeight,
  gameAreaWidth: gameArea.offsetWidth,
});

function shakeGameArea() {
  gameArea.style.animation = "shake 300ms";
  setTimeout(() => {
    gameArea.style.animation = "";
  }, 300);
}

// NOW I WANT TO LISTEN FOR THE EVENTS KEYDOWN in my document
document.addEventListener("keydown", (event) => {
  // console log the exact key that we are pressing
  player.setDirection(event.key);
});

document.addEventListener("keyup", (event) => {
  player.unSetDirection(event.key);
});

let frames = 0;
let animationID;

function gameLoop() {
  frames++;

  if (!game.isGameOver && game.hasStarted) {
    player.checkCollisions();
    player.move();
    game.checkGameOver();

    // I spawn an enemy every 100 frames
    if (frames % 500 === 0) {
      // LEVEL increase
      game.level++;
    }

    if (game.level < 3) {
      if (frames % 50 === 0) {
        game.enemies.push(new Enemy(4 * game.level));
      }
    }
    if (game.level >= 3) {
      if (frames % 40 === 0) {
        game.enemies.push(new Enemy(12));
      }
    }
  }
  // the last enemies are going to the end of the screen
  game.enemies.forEach((enemy) => {
    enemy.move();
    enemy.exit();
  });

  //   console.log(frames);
  animationID = window.requestAnimationFrame(gameLoop);
}

animationID = window.requestAnimationFrame(gameLoop);
