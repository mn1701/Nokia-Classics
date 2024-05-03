const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
let gameStart = false;


// load start screen on opening window
window.onload = function() {
    drawStartScreen();
}

// start screen
function drawStartScreen() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FFFFFF'; 
    ctx.font = '24px "Press Start 2P"';  
    ctx.textAlign = 'center';  

    ctx.fillText('Press Enter to Start', canvas.width / 2, canvas.height / 2);
}

// Press enter to start game
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !gameStart) {
        startGame();
        gameStart = true;
    }
});

function startGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // clear the start message

    class Player {
        constructor() {
            this.width = 30;
            this.height = 30;
    
            this.x = canvas.width / 2;
            this.y = canvas.height - this.height - 20;
            this.speed = 5;
            this.dx = 0; // movement in x axis
            this.dy = 0; // movement in y axis
            this.image = new Image();
            this.image.src = '../../images/ship.png';
            // Reference: Minh Nguyen's self produced
            
        }
    
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    
        update() {
            this.x += this.dx;
            this.checkBoundary();

            this.y += this.dy;
        }
    
        checkBoundary() {
            // set boundaries of game area
            if (this.x < 0) this.x = 0;
            if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
            if (this.y < canvas.height - 200) this.y = canvas.height - 200;
            if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;
        }
    }
    
    class Enemy {
        constructor() {
            this.x = Math.random() * (canvas.width - 40);
            this.y = -30;
            this.width = 30;
            this.height = 30;
            this.speed = 2;
            this.image = new Image();
            this.image.src = '../../images/enemy.png';
            // Reference: Self produced by Minh Nguyen
        }
    
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    
        update() {
            this.y += this.speed; 
        }
    }
    
    class Bullet {
        constructor(x, y) {
            this.x = x  + 13; 
            this.y = y;
            this.width = 5;
            this.height = 10;
            this.speed = 4;
        }
    
        draw() {
            ctx.fillStyle = '#8bac0f'; 
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    
        update() {
            this.y -= this.speed; 
        }
    }
    
    class EnemyBullet {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.width = 5; 
            this.height = 10; 
            this.speed = 3;
        }
    
        update() {
            this.y += this.speed; 
        }
    
        draw() {
            ctx.fillStyle = '#96b142'; 
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    
    
    let player = new Player();
    let gameOver = false;
    let bullets = [];
    let enemies = [];
    let enemyBullets = [];
    let score = 0;  
    
    function keyDown(e) {
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            player.dx = player.speed;
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
            player.dx = -player.speed;
        } else if (e.key === "ArrowUp" || e.key === "Up") {
            player.dy = -player.speed;
        } else if (e.key === "ArrowDown" || e.key === "Down") {
            player.dy = player.speed; 
        }
    }
    
    function keyUp(e) {
        if (e.key === 'ArrowRight' || e.key === 'Right' ||
            e.key === 'ArrowLeft' || e.key === 'Left') {
            player.dx = 0;
        } else if (e.key == "ArrowUp" || e.key == "ArrowDown" || 
                   e.key == "Up" || e.key == "Down") {
            player.dy = 0;
        }
    }
    
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    
    function handleEnemies() {
        if (Math.random() < 0.01) { //spawn rate 
            enemies.push(new Enemy());
        }
        enemies.forEach((enemy, index) => {
            enemy.update();
            enemy.draw();
    
            // remove enemies that go below the game area
            if (enemy.y > canvas.height) {
                enemies.splice(index, 1);
            }
        });
    }
    
    function checkBullets() {
        bullets.forEach((bullet, index) => {
            bullet.update();
            bullet.draw();
    
            // remove bullets if they move past the game area
            if (bullet.y + bullet.height < 0) {
                bullets.splice(index, 1);
            }
        });
    }
    
    function shoot() {
        bullets.push(new Bullet(player.x, player.y));
    }
    
    function enemyShooting() {
        enemies.forEach(enemy => {
            if (Math.random() < 0.005) {  // enemy shooting rate every frame
                let bullet = new EnemyBullet(enemy.x + enemy.width / 2, enemy.y + enemy.height);
                enemyBullets.push(bullet);
            }
        });
    }
    
    function updateEnemyBullets() {
        for (let i = enemyBullets.length - 1; i >= 0; i--) {
            enemyBullets[i].update();
            // remove bullets that go off screen
            if (enemyBullets[i].y > canvas.height) {
                enemyBullets.splice(i, 1); 
            }
        }
    }
    
    function drawEnemyBullets() {
        enemyBullets.forEach(bullet => bullet.draw());
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Spacebar') { // space key to shoot
            shoot();
        }
    });
    
    function checkCollisions() {
        enemyBullets.forEach((bullet, index) => {
    
            // check for collision between enemy bullets and player
    
            if (bullet.x < player.x + player.width &&
                bullet.x + bullet.width > player.x &&
                bullet.y < player.y + player.height &&
                bullet.y + bullet.height > player.y) {
                
                gameOver = true;
                GameOver();
            }
        });
    
        enemies.forEach((enemy, index) => {
            
            // check for collision between enemies and player
            
            if (enemy.x < player.x + player.width &&
                enemy.x + enemy.width > player.x &&
                enemy.y < player.y + player.height &&
                enemy.y + enemy.height > player.y) {
    
                // game over if collision
                gameOver = true;
                GameOver();
            }
    
            bullets.forEach((bullet, bulletIndex) => {
    
                // check for collision between enemies and player bullets
    
                if (bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y) {
                    // collision occur -> remove eneny and bullet
                    enemies.splice(index, 1); 
                    bullets.splice(bulletIndex, 1);
                    // add scores when enemy is hit
                    score += 10;
                }
            });
        });
    }
    
    function GameOver() {
        // create and overlay for the game over screen
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#8bac0f';
        ctx.font = '36px "Press Start 2P"';
        ctx.fillText('Game Over', canvas.width / 2 - 150, canvas.height / 2 - 10);
    
        ctx.font = '24px "Press Start 2P"';
        ctx.fillStyle = '#8bac0f';
        ctx.fillText(`Score: ${score}`, canvas.width / 2 - 100, canvas.height / 2 + 40);
    
        ctx.font = '24px "Press Start 2P"';
        ctx.fillStyle = '#8bac0f';
        ctx.fillText('Press Enter to Restart', canvas.width / 2 - 260, canvas.height / 2 + 90);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && gameOver) {
            restartGame();
        }
    });
    
    updateGame(); // start of the game loop
    
    function updateGame() {
        if (!gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            player.update();
            player.draw();
            handleEnemies();
            enemyShooting();
            updateEnemyBullets();
            drawEnemyBullets();
            checkBullets();
            checkCollisions();
            drawScore();
        }
        animationFrameId = requestAnimationFrame(updateGame); // looping the update function
    }
    
    function restartGame() {
        cancelGameLoop();
        gameOver = false;
    
        player = new Player();
        enemies = [];
        bullets = [];
        enemyBullets = [];
        score = 0;
    
        animationFrameId = requestAnimationFrame(updateGame); 
    }
    
    // stopping the current instance of the game
    function cancelGameLoop() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null; 
        }
    }
    
    // display score on top left of game area
    function drawScore() {
        ctx.font = '24px "Press Start 2P"';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#8bac0f';  
        ctx.fillText(`Score: ${score}`, 10, 30);  
    }   
}

