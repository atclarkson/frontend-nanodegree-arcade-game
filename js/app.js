const numRows = 5;
const numCols = 6;
const colWidth = 101;
const rowHeight = 83;

/**
 * Enemies our player must avoid
 */
class Enemy {
  constructor() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.reset();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x > colWidth * 5) {
      this.reset();
    }
    //TODO Collision detection
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }
  reset() {
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }
    this.x = -100;
    this.y = rowHeight * getRandomIntInclusive(1,3) - 25;
    this.speed = getRandomIntInclusive(50, 200);

  }

}

/**
 * Player Class
 */
class Player {
  constructor() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 2 * colWidth;
    this.y = numRows * rowHeight - 10;
  }
  update(dt) {
    // TODO checkCollisions
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(keyPress) {
    switch(keyPress) {
    case 'left':
        if (this.x > 0) {
          this.x -= colWidth;
        }
        break;
    case 'right':
        if (this.x < colWidth * 4) {
          this.x += colWidth;
        }
        break;
    case 'up':
        if (this.y > 0) {
          this.y -= rowHeight;
        }
        break;
    case 'down':
        if (this.y < rowHeight * 5 - 10) {
          this.y += rowHeight;
        }
        break;
    default:
        break;
    }
  }
}

// Now instantiate your objects.
const player = new Player();
const allEnemies = [];
const numEnemies = 10;
(function() {
  for (let i = 0; i < numEnemies; i++){
    setTimeout(function(){
      const enemy = new Enemy();
      allEnemies.push(enemy);
    }, 3000);
  }
})();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
