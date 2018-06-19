const numRows = 5;
const numCols = 6;
const colWidth = 101;
const rowHeight = 83;
/**
 * Generate a Random whole number inclusive of min and max
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Enemies our player must avoid
 */
class Enemy {
  constructor() {
    this.reset();
    this.x = getRandomIntInclusive(0,colWidth * numRows);
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
    if(this.collisionDetection(player)) {
        player.reset();
    }
  }
  reset() {
    this.x = getRandomIntInclusive(-500, -100);
    this.y = rowHeight * getRandomIntInclusive(1,3) - 25;
    this.speed = getRandomIntInclusive(80, 300);
  }
  collisionDetection(playerPos){
    var enemy = {x: this.x, y: this.y, width: 78, height: 32};
    var player = {x: playerPos.x, y: playerPos.y, width: 44, height: 39};

    if (enemy.x < player.x + player.width &&
       enemy.x + enemy.width > player.x &&
       enemy.y < player.y + player.height &&
       enemy.height + enemy.y > player.y) {
         console.log("colission");
         return true;
    }
  }
}

/**
 * Player Class
 */
class Player {
  constructor() {
    this.level = 1;
    this.sprite = 'images/char-cat-girl.png';
    this.x = 2 * colWidth;
    this.y = numRows * rowHeight - 10;
  }
  reset() {
    this.x = 2 * colWidth;
    this.y = numRows * rowHeight - 10;
    buildEnemies();
  }
  update(dt) {
    if (this.y <= 0){
      this.y = numRows * rowHeight - 10;
      console.log("winner Winner Chicken Dinner");
      winnerModal();
      this.level += 1;
      this.x = 10000;
      // let self = this;
      // setTimeout(function(){
      //   self.reset();
      // }, 300);
    }
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
let allEnemies = [];
const buildEnemies = function() {
  allEnemies = [];
  const numEnemies = player.level;
  (function() {
    for (let i = 0; i < numEnemies; i++){
      //setTimeout(function(){
        const enemy = new Enemy();
        allEnemies.push(enemy);
      //}, 3000);
    }
  })();
}

/**
 * Winner Modal
 */
function winnerModal() {
  // Get the modal
  const modal = document.getElementById('myModal');
  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];
  $('#winningLevel .level').html(player.level);
  // When the user clicks on the button, open the modal

      modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
      player.reset();
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
          player.reset();
      }
  }
  // Get the button to restart the game
  var nextLevelBtn = document.getElementById("nextLevelBtn");
  nextLevelBtn.focus();
  // When the user clicks the button, restart the game
  nextLevelBtn.onclick = function() {
      modal.style.display = "none";
      player.reset();
  }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
