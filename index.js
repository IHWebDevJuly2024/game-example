console.log("GAME initialized");
const gameOverElement = document.querySelector("#game-over-screen");

const game = {
  score: 0,
  lives: 6,
  enemies: [],
  isGameOver: false,
  level: 0,
  checkGameOver() {
    if (this.lives <= 0) {
      gameOverElement.style.display = "flex";
      this.isGameOver = true;
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

  if (!game.isGameOver) {
    player.checkCollisions();
    player.move();
    game.checkGameOver();

    // I spawn an enemy every 100 frames
    if (frames % 50 === 0) {
      if (game.score % 20 === 0) {
        // LEVEL increase
        game.enemies.push(new Enemy(10));
      } else {
        game.enemies.push(new Enemy(4));
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
