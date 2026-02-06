// main.js

import { canvas, ctx, setupCanvas, GAME_WIDTH, GAME_HEIGHT } from './canvas.js';
import { camera, platforms, clouds, spikes } from './world.js';
import { player, playerImg } from './player.js';
import { update, checkSpikes } from './physics.js';


const backgroundImg = new Image();
backgroundImg.src = 'assets/images/world1.png';

const tileset = new Image();
tileset.src = 'assets/images/tileset.jpg';

const cloudsImg = new Image();
cloudsImg.src = 'assets/images/clouds.png'; // imagem transparente de nuvem

const spikesImg = new Image();
spikesImg.src = 'assets/images/spikes.png';



const TILE_SIZE = 64;

function drawPlatform(p) {
  const tile = p.tile ?? 0;
  for (let x = 0; x < p.w; x += TILE_SIZE) {
    ctx.drawImage(
      tileset,
      tile * TILE_SIZE, 0,
      TILE_SIZE, TILE_SIZE,
      p.x + x,
      p.y,
      TILE_SIZE,
      TILE_SIZE
    );
  }
}

setupCanvas();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1️⃣ background
  ctx.save();
  ctx.translate(-camera.x * 0.4, 0);
  ctx.drawImage(backgroundImg, 0, 0, 5000, GAME_HEIGHT);
  ctx.restore();

  // 2️⃣ nuvens animadas
  ctx.save();
  ctx.translate(-camera.x * 0.6, 0);
  clouds.forEach(c => {
    if (cloudsImg.complete) {
      ctx.drawImage(cloudsImg, c.x, c.y);
      c.x += c.speed;
      if (c.x > 5000) c.x = -cloudsImg.width;
    }
  });
  ctx.restore();

  // 3️⃣ plataformas e spikes
  ctx.save();
  ctx.translate(-camera.x, 0);
  platforms.forEach(drawPlatform);

  spikes.forEach(s => {
    if (spikesImg.complete) {
      ctx.drawImage(spikesImg, s.x, s.y, s.w, s.h);
    } else {
      ctx.fillStyle = 'purple';
      ctx.fillRect(s.x, s.y, s.w, s.h);
    }
  });

  // player
  ctx.save();
  if (player.facing === 'left') {
    ctx.translate(player.x + player.w / 2, 0);
    ctx.scale(-1, 1);
    ctx.translate(-(player.x + player.w / 2), 0);
  }

  if (playerImg.complete) {
    ctx.drawImage(
      playerImg,
      player.frameX * player.spriteW,
      player.frameY * player.spriteH,
      player.spriteW,
      player.spriteH,
      player.x,
      player.y,
      player.w,
      player.h
    );
  } else {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.w, player.h);
  }
  ctx.restore();
  ctx.restore();

  // 4️⃣ HUD de vidas → desenhar por último, sem translate
  ctx.fillStyle = 'black';
  ctx.font = '65px honk';
  ctx.fillText('Vidas: ' + player.lives, 20, 40);
}

function loop() {
  update();        // move o player e aplica física
  checkSpikes();   // checa se o player tocou nos spikes e aplica dano
  draw();          // desenha tudo no canvas
  requestAnimationFrame(loop);
}

loop();


