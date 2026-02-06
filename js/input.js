import { canvas, GAME_WIDTH, GAME_HEIGHT } from './canvas.js';
import { player } from './player.js';

export const keys = {};

window.addEventListener('keydown', e => keys[e.code] = true);
window.addEventListener('keyup', e => keys[e.code] = false);

function getTouchPos(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.touches[0].clientX - rect.left) * scaleX,
    y: (e.touches[0].clientY - rect.top) * scaleY
  };
}

window.addEventListener('touchstart', e => {
  e.preventDefault();
  const pos = getTouchPos(e);

  if (pos.y < GAME_HEIGHT / 2) {
    if (player.onGround) {
      player.vy = -player.jump;
      player.onGround = false;
    }
  } else {
    pos.x < GAME_WIDTH / 2
      ? keys.ArrowLeft = true
      : keys.ArrowRight = true;
  }
}, { passive: false });

window.addEventListener('touchend', () => {
  keys.ArrowLeft = false;
  keys.ArrowRight = false;
});
