// canvas.js

export const canvas = document.getElementById('game');
export const ctx = canvas.getContext('2d');

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

export function setupCanvas() {
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  ctx.imageSmoothingEnabled = false;
}