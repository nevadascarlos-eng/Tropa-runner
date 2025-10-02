const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let player = { x: 180, y: 500, w: 40, h: 40, color: 'cyan' };
let obstacles = [];
let score = 0;
let gameOver = false;

document.addEventListener('keydown', e => {
  if(e.key === 'ArrowLeft' && player.x > 0) player.x -= 20;
  if(e.key === 'ArrowRight' && player.x < canvas.width - player.w) player.x += 20;
});

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawObstacles() {
  ctx.fillStyle = 'red';
  obstacles.forEach(o => {
    ctx.fillRect(o.x, o.y, o.w, o.h);
  });
}

function updateObstacles() {
  if(Math.random() < 0.05) {
    obstacles.push({ x: Math.random()*360, y: 0, w: 40, h: 40 });
  }
  obstacles.forEach(o => o.y += 5);
  obstacles = obstacles.filter(o => o.y < canvas.height);
}

function checkCollision() {
  obstacles.forEach(o => {
    if(player.x < o.x + o.w && player.x + player.w > o.x &&
       player.y < o.y + o.h && player.y + player.h > o.y) {
         gameOver = true;
       }
  });
}

function gameLoop() {
  if(gameOver) {
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', 120, 300);
    return;
  }
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawPlayer();
  drawObstacles();
  updateObstacles();
  checkCollision();
  score++;
  document.getElementById('score').innerText = 'Score: ' + score;
  requestAnimationFrame(gameLoop);
}
gameLoop();
