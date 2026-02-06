// world.js

export const world = {
  width: 5000,
  height: 720
};

export const camera = {
  x: 0,
  y: 0
};

export const gravity = 0.6;

export const platforms = [
  { x: 0, y: 656, w: 5000, h: 120 },//chão
  { x: 300, y: 500, w: 200, h: 30 },
  { x: 650, y: 350, w: 200, h: 30 },
  { x: 1000, y: 250, w: 200, h: 30 }
];

export const clouds = [
  { x: 100, y: 50, speed: 0.2 },
  { x: 600, y: 100, speed: 0.15 },
  { x: 1200, y: 70, speed: 0.1 },
  { x: 2000, y: 40, speed: 0.25 }
];

export const spikes = [
  { x: 900, y: 592, w: 200, h: 64 },
  { x: 1500, y: 592, w: 140, h: 64 },
  { x: 2300, y: 592, w: 140, h: 64 }
];
