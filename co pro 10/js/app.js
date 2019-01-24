// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 200);
    }
    if (score.level == 2) {
        this.speed = this.speed + 5;
    }
    if (score.level == 3) {
        this.speed = this.speed + 10;
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
        score.updateMiss();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    }
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    }
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83
    }
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83
    }
    if (this.y < 0) {
        score.updateSuccess();
        setTimeout(function() {
            player.x = 202;
            player.y = 405;
        }, 100);
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Position "y" where the enemies will are created
var enemyPosition = [63, 147, 230];
var player = new Player(202, 405);

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 200);
    allEnemies.push(enemy);
});

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

// Our score update (success, miss, level)
var Score = function() {
    this.success = 0;
    this.miss = 3;
    this.level = 1;
};

Score.prototype.updateSuccess = function() {
    this.success += 1;
    if (this.success == 5 || this.success == 10 || this.success == 15) {
        score.updateLevel();
    }
    document.getElementById('score-success').innerHTML = this.success;
};

Score.prototype.updateMiss = function() {
    this.miss -= 1;
    if (this.miss === 0) {
        toggleModal();
    }
    document.getElementById('score-miss').innerHTML = this.miss;
};

Score.prototype.updateLevel = function() {
    this.level += 1;
    if (this.level === 4) {
        winningModal();
    }
    document.getElementById('level').innerHTML = this.level;
}

var score = new Score();

//Our modal 
var winning = document.querySelector(".winning");
var modal = document.querySelector(".modal");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function winningModal() {
    winning.classList.toggle("show-modal");
}