// I WANT TO KEEP TRACK of the position of my player and other stats.

// I'm going to create an object to do this

const player = {
  positionX: 0,
  positionY: 0,
  velocity: 10,
  directions: [],
  element: document.querySelector("#player"),
  move() {
    const direction = this.directions.join(""); // "ArrowUpArrowLeft" or "wa"
    console.log(this.directions);
    switch (direction) {
      case "ArrowUp":
      case "w":
        this.positionY -= this.velocity;
        this.element.style.animation = "rotate-up 0.2s";
        break;
      case "ArrowUpArrowRight":
      case "ArrowRightArrowUp":
      case "wd":
      case "dw":
        this.positionY -= this.velocity;
        this.positionX += this.velocity;
        this.element.style.animation = "rotate-up 1s";
        break;
      case "ArrowDown":
      case "s":
        this.element.style.animation = "rotate-down 1s";
        this.positionY += this.velocity;
        break;
      case "ArrowDownArrowRight":
      case "ArrowRightArrowDown":
      case "sd":
      case "ds":
        this.element.style.animation = "rotate-down 1s";
        this.positionY += this.velocity;
        this.positionX += this.velocity;
        break;
      case "ArrowDownArrowLeft":
      case "ArrowLeftArrowDown":
      case "sa":
      case "as":
        this.element.style.animation = "rotate-down 1s";
        this.positionY += this.velocity;
        this.positionX -= this.velocity;
        break;
      case "ArrowUpArrowLeft":
      case "ArrowLeftArrowUp":
      case "wa":
      case "aw":
        this.element.style.animation = "rotate-up 1s";

        this.positionY -= this.velocity;
        this.positionX -= this.velocity;
        break;
      case "ArrowLeft":
      case "a":
        this.positionX -= this.velocity;
        break;
      case "ArrowRight":
      case "d":
        this.positionX += this.velocity;
        break;
    }

    // console.table({ x: this.positionX, y: this.positionY });
    this.setBoundaries();
    this.element.style.top = `${this.positionY}px`;
    this.element.style.left = `${this.positionX}px`;
  },
  setDirection(direction) {
    if (!this.directions.includes(direction)) {
      this.directions.push(direction);
    }
  },
  unSetDirection(direction) {
    // if we have this: ["ArrowUp", "ArrowLeft"]
    const index = this.directions.indexOf(direction); // direction is: ArrowUp so the value of index is 0
    this.element.style.animation = "trembling 0.5s infinite";
    this.directions.splice(index, 1);
  },
  setBoundaries() {
    // KISS!!
    if (this.positionX <= 0) {
      this.positionX = 0;
    }

    if (this.positionY <= 0) {
      this.positionY = 0;
    }

    if (this.positionX >= gameArea.offsetWidth - this.element.offsetWidth) {
      this.positionX = gameArea.offsetWidth - this.element.offsetWidth;
    }

    if (this.positionY >= gameArea.offsetHeight - this.element.offsetHeight) {
      this.positionY = gameArea.offsetHeight - this.element.offsetHeight;
    }
  },
  checkCollisions() {
    game.enemies.forEach((enemy) => {
      const playerLeftEdge = this.positionX;
      const playerRightEdge = this.positionX + this.element.offsetWidth;
      const playerTopEdge = this.positionY;
      const playerBottomEdge = this.positionY + this.element.offsetHeight;

      const enemyLeftEdge = enemy.positionX;
      const enemyRightEdge = enemy.positionX + enemy.element.offsetWidth;
      const enemyTopEdge = enemy.positionY;
      const enemyBottomEdge = enemy.positionY + enemy.element.offsetHeight;

      if (
        playerLeftEdge < enemyRightEdge &&
        playerRightEdge > enemyLeftEdge &&
        playerTopEdge < enemyBottomEdge &&
        playerBottomEdge > enemyTopEdge
      ) {
        enemy.disappear();
        shakeGameArea();
        game.lives--;
        livesElement.innerText = "💖".repeat(game.lives);
      }
    });
  },
};
