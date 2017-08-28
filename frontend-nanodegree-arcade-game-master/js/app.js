'use strict';
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //this.x = 0;
    
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 80 + 0.5);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;

    if(this.x>505) {
        this.x = 0;
    }

    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // this.x = 200;
    // this.y = 400;

    /**
     * Store the starting position of the player (x-coordinate)
     * @type {number}
     */
    this.INIT_X = 202;

    /**
     * Store the starting position of the player (y-coordinate)
     * @type {number}
     */
    this.INIT_Y = 405;

    /**
     * Current position of the player on the x-axis.
     * @type {number}
     */
    this.x = this.INIT_X;

    /**
     * Current position of the player on the y-axis.
     * @type {number}
     */
    this.y = this.INIT_Y;



    this.sprite = 'images/char-boy.png';
};



//new code
function InteractiveItem(id, width, visibleWidth, startingXPosition, startingYPosition, sprite) {
    RenderableItem.call(this, id, startingXPosition, startingYPosition, sprite);

    this.row = 0; // proxy for Y coordinate; makes interaction easier to detect.
    this.startingXPosition = startingXPosition;
    this.startingYPosition = startingYPosition;

    this.width = width; // total, including non-visible portion.
    this.halfVisibleWidth = visibleWidth / 2;
}

function RenderableItem(id, x, y, sprite) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

InteractiveItem.prototype = Object.create(RenderableItem.prototype);
InteractiveItem.prototype.constructor = InteractiveItem;

Player.prototype = Object.create(InteractiveItem.prototype);
Player.prototype.constructor = Player;
//ends

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput= function(keyup) {
    //make Player move with key input
    switch(keyup){
        case 'left' :
            this.x = this.x - 83;
            break;
        case 'right' :
            this.x = this.x + 83;
            break;
        case 'down' :
            this.y = this.y + 101;
            break;
        case 'up' :
            this.y = this.y - 101;
            break;
    }
}


//Collision functions to reset player position
// Player.prototype.checkCollisions = function(){
//   for (var i = 0; i < allEnemies.length; i++){
//      if (Math.abs(player.x - allEnemies[i].x) < 60 && Math.abs(player.y - allEnemies[i].y) < 60){
//        this.positionReset();
//      }
//      if ((this.x - allEnemies[i].x) < 50 && (this.y - allEnemies[i].y) < 50){
//     this.positionReset();
//     }
//     console.log("checkCollisions invoked!");
//   }

// };

// Player.prototype.checkCollisions = function() {
//     for (var i = 0; i < allEnemies.length; ++i) {
//         var enemy = allEnemies[i];
//         if (this.overlapsWith(enemy)) {
//             if (this.index != enemy.index) {
//                 // Enemy kills player.
//                 this.reset();
//                 break;
//             }
//         };
//     };
// };

Enemy.prototype.checkCollision = function() {
    "use strict";
    // Set hitboxes for collision detection
    var playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    var enemyBox = {x: this.x, y: this.y, width: 60, height: 70};
    // Check for collisions, if playerBox intersects enemyBox, we have one
    if (playerBox.x < enemyBox.x + enemyBox.width &&
        playerBox.x + playerBox.width > enemyBox.x &&
        playerBox.y < enemyBox.y + enemyBox.height &&
        playerBox.height + playerBox.y > enemyBox.y) {
        // Collision detected, call collisionDetected function
        this.collisionDetected();
    }
};

// Collision detected, decrement playerLives and reset the player
Enemy.prototype.collisionDetected = function() {
    "use strict";
    player.reset();
};

Player.prototype.update = function() {
    if (this.y < 0) {
        alert("You WIN! Game will now restart");
        this.reset();
    };

    if (this.x<0){
        this.x = 0;
    };

    if (this.y>500){
       this.reset();
    };

    if (this.x>400){
        this.x=400;
    };
    
};

Player.prototype.reset = function() {
    this.x = this.INIT_X;
    this.y = this.INIT_Y;
};

// }
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(0, 55, 150),
    new Enemy(0, 140, 250),
    new Enemy(0, 225, 100),
    ];

// Place the player object in a variable called player
var player = new Player(200,400);

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
