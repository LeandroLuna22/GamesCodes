// physics.js

import { GAME_WIDTH } from './canvas.js';
import { gravity, world, camera, platforms } from './world.js';
import { spikes } from './world.js';
import { player } from './player.js';

export function checkSpikes() {
  const hb = player.hitbox;
  const playerX = player.x + hb.xOffset;
  const playerY = player.y + hb.yOffset;
  const playerW = hb.width;
  const playerH = hb.height;

  spikes.forEach(s => {
    const hit =
      playerX < s.x + s.w &&
      playerX + playerW > s.x &&
      playerY < s.y + s.h &&
      playerY + playerH > s.y;

    if (hit && !player.hurt) {
      player.lives--;
      player.hurt = true;
      player.hurtTimer = 30; // invencibilidade ~0,5s

      if (player.lives <= 0) {
        alert('GAME OVER');
        window.location.reload();
      } else {
        player.y -= 100;
        player.x -= 100;
      }
    }
  });

  if (player.hurt) {
    player.hurtTimer--;
    if (player.hurtTimer <= 0) {
      player.hurt = false;
      player.hurtTimer = 0;
    }
  }
}



import { keys } from './input.js';

let gameFrame = 0;
const staggerFrames = 6;

export function update() {
  player.vx = 0;

  if (keys.ArrowLeft || keys.KeyA) {
    player.vx = -player.speed;
    player.facing = 'left';
  }

  if (keys.ArrowRight || keys.KeyD) {
    player.vx = player.speed;
    player.facing = 'right';
  }

  if ((keys.Space || keys.ArrowUp || keys.KeyW) && player.onGround) {
    player.vy = -player.jump;
    player.onGround = false;
  }

  player.vy += gravity;
  player.x += player.vx;
  player.y += player.vy;

  player.onGround = false;
  platforms.forEach(p => {
    if (
      player.x < p.x + p.w &&
      player.x + player.w > p.x &&
      player.y + player.h <= p.y + 10 &&
      player.y + player.h + player.vy >= p.y
    ) {
      if (player.vy > 0) {
        player.y = p.y - player.h;
        player.vy = 0;
        player.onGround = true;
      }
    }
  });

  player.x = Math.max(0, Math.min(player.x, world.width - player.w));

  camera.x = player.x - GAME_WIDTH / 2 + player.w / 2;
  camera.x = Math.max(0, Math.min(camera.x, world.width - GAME_WIDTH));

  if (player.vx !== 0 && gameFrame % staggerFrames === 0) {
    player.frameX = player.frameX < 3 ? player.frameX + 1 : 0;
  }

  if (player.vx === 0) player.frameX = 0;

  gameFrame++;
}

spikes.forEach(s => {
  const hit =
    player.x < s.x + s.w &&
    player.x + player.w > s.x &&
    player.y < s.y + s.h &&
    player.y + player.h > s.y;

  if (hit) {
    player.lives--;
    // empurra o player para trás pra não reduzir várias vezes de uma vez
    player.y -= 100;
player.x += (player.facing === 'right' ? -100 : 100); // empurra pra direção oposta


    if (player.lives <= 0) {
      alert('GAME OVER');
      window.location.reload(); // reinicia o jogo
    }
  }
});

