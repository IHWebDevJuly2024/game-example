class Enemy {
  constructor(velocity) {
    // this method is adding also this.element
    this.createEnemyElement();
    // so we can access to the element to set the position
    this.positionX = gameArea.offsetWidth;
    // The Y has to be random, between 0 and the height of my gameArea - the height of the enemy
    this.positionY = Math.floor(
      Math.random() * (gameArea.offsetHeight - this.element.offsetHeight)
    );
    this.velocity = velocity;
    // now we update the position of the element in the browser based on the X and Y
    this.updateElementPosition();
  }

  createEnemyElement() {
    this.element = document.createElement("div");
    this.element.className = "enemy";
    gameArea.appendChild(this.element);
  }

  updateElementPosition() {
    this.element.style.left = `${this.positionX}px`;
    this.element.style.top = `${this.positionY}px`;
  }

  move() {
    this.positionX -= this.velocity;
    this.updateElementPosition();
  }

  exit() {
    if (this.positionX < 0 - this.element.offsetWidth) {
      this.disappear();
      game.score++;
      document.querySelector("#score").textContent = game.score;
    }
  }

  disappear() {
    // we need to get the specific index for the object we want to delete inside the array
    const index = game.enemies.indexOf(this);
    game.enemies.splice(index, 1);
    this.element.remove();
  }
}

/* setInterval(() => {
  game.enemies.push(new Enemy(5));
  console.log(game.enemies);
}, 1000); */
