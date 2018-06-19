const numRows = 5;
const numCols = 6;
const colWidth = 83;
const rowHeight = 101;
const randomStoneRow = 2; // FIXME remove this test variable

/**
 * Enemies our player must avoid
 */
class Enemy {
  constructor() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.y = rowHeight * randomStoneRow;    // TODO random stone tile 1 of three rows.
    this.speed = 80; // TODO Random speed value
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // TODO Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x = this.x + this.speed * dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }

}

/**
 * Player Class
 */
class Player {
  constructor() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 2 * rowHeight;
    this.y = (numRows) * colWidth - 10;
  }
  update(dt) {
    // TODO checkCollisions
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // TODO
  }
  handleInput(keyPress) {
    switch(keyPress) {
    case 'left':
        if (this.x > 0) {
          this.x -= rowHeight;
        }
        break;
    case 'right':
        if (this.x < rowHeight * 4) {
          this.x += rowHeight;
        }
        break;
    case 'up':
        if (this.y > 0) {
          this.y -= colWidth;
        }
        break;
    case 'down':
        if (this.y < colWidth * 5 - 10) {
          this.y += colWidth;
        }
        break;
    default:
        break;
    }
  }
}


// TODO Now instantiate your objects.
const player = new Player();
// TODO Place all enemy objects in an array called allEnemies
const enemy = new Enemy();
const allEnemies = [enemy];
// TODO Place the player object in a variable called player



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
