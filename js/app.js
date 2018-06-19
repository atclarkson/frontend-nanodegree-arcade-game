// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// TODO Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Player Class
 */
class Player {
  constructor() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 2 * 101;
    this.y = 5 * 83 - 10;
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
          this.x -= 101;
        }
        break;
    case 'right':
        if (this.x < 101 * 4) {
          this.x += 101;
        }
        break;
    case 'up':
        if (this.y > 0) {
          this.y -= 83;
        }
        break;
    case 'down':
        if (this.y < 83 * 5) {
          this.y += 83;
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
const allEnemies = [];
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
