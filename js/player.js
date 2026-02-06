// player.js

export const playerImg = new Image();
playerImg.src = 'assets/images/player.png';

// player.js
export const player = {
  x: 100,
  y: 300,
  w: 128,
  h: 128,
  spriteW: 64,
  spriteH: 64,
  frameX: 0,
  frameY: 0,
  vx: 0,
  vy: 0,
  speed: 5,
  jump: 15,
  onGround: false,
  facing: 'right',
  lives: 5,
  hurt: false,
  hurtTimer: 0,

  hitbox: { xOffset: 20, yOffset: 10, width: 56, height: 56 } // menor que o sprite
};


