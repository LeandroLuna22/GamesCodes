const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

/* ===== CANVAS FULL ===== */
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

/* ===== MUNDO ===== */
const world = {
  width: 2000,
  height: 600
};

/* ===== CAMERA ===== */
const camera = { x: 0, y: 0 };

/* ===== PLAYER ===== */
const player = {
  x: 100,
  y: 300,
  w: 32,
  h: 32,
  vx: 0,
  vy: 0,
  speed: 5,
  jump: 14,
  onGround: false
};

const gravity = 0.6;
const keys = {};

window.addEventListener('keydown', e => keys[e.code] = true);
window.addEventListener('keyup', e => keys[e.code] = false);

/* ===== CONTROLES TOUCH ===== */
window.addEventListener('touchstart', e => {
    const touchX = e.touches[1].clientX;
    const touchY = e.touches[1].clientY;

    if (touchY < canvas.height / 1) { 
        if (player.onGround) {
            player.vy = -player.jump;
            player.onGround = false;
        }
    } else {
        if (touchX < canvas.width / 1) keys.ArrowLeft = true;
        else keys.ArrowRight = true;
    }
});

window.addEventListener('touchend', () => {
    keys.ArrowLeft = false;
    keys.ArrowRight = false;
});

/* ===== CONTROLES MOBILE ATUALIZADOS ===== */
const btnLeft = document.getElementById('btnLeft');
const btnRight = document.getElementById('btnRight');
const btnJump = document.getElementById('btnJump');

// Funções para ativar/desativar as teclas
function handleTouch(btn, key, isPressed) {
    btn.addEventListener(isPressed ? 'touchstart' : 'touchend', (e) => {
        e.preventDefault();
        keys[key] = isPressed;
    });
}

// Configurando os botões
handleTouch(btnLeft, 'ArrowLeft', true);
handleTouch(btnLeft, 'ArrowLeft', false);

handleTouch(btnRight, 'ArrowRight', true);
handleTouch(btnRight, 'ArrowRight', false);

// Pulo especial (Space)
btnJump.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (player.onGround) {
        player.vy = -player.jump;
        player.onGround = false;
    }
});


/* ===== PLATAFORMAS ===== */
const platforms = [
  { x: 0, y: 500, w: world.width, h: 200 },
  { x: 300, y: 420, w: 150, h: 20 },
  { x: 600, y: 360, w: 150, h: 20 },
  { x: 900, y: 300, w: 150, h: 20 }
];

function update() {
  // 1. Movimento Horizontal (vx)
  player.vx = 0;
  if (keys.ArrowLeft) player.vx = -player.speed;
  if (keys.ArrowRight) player.vx = player.speed;

  // 2. Movimento Vertical (vy) - PULO
  // Se o pulo "vai para a frente" sozinho, certifique-se de que vy só afeta o eixo Y
  if (keys.Space && player.onGround) {
    player.vy = -player.jump; // Força negativa para subir
    player.onGround = false;
  }

  // 3. Aplica Gravidade
  player.vy += gravity;

  // 4. Aplica as velocidades à posição
  player.x += player.vx; // Move pros lados
  player.y += player.vy; // Move pra cima/baixo

  // 5. Limites do Mundo
  player.x = Math.max(0, Math.min(player.x, world.width - player.w));

  // 6. Colisão com Plataformas
  player.onGround = false;
  platforms.forEach(p => {
    if (
      player.x < p.x + p.w &&
      player.x + player.w > p.x &&
      player.y + player.h <= p.y + 10 && 
      player.y + player.h + player.vy >= p.y
    ) {
      if (player.vy > 0) { // Só colide se estiver a cair
          player.y = p.y - player.h;
          player.vy = 0;
          player.onGround = true;
      }
    }
  });

  /* CAMERA */
  camera.x = player.x - canvas.width / 2 + player.w / 2;
  camera.x = Math.max(0, Math.min(camera.x, world.width - canvas.width));
}


/* ===== DRAW ===== */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(-camera.x, 0);

  // Desenha Chão/Plataformas
  ctx.fillStyle = '#654321';
  platforms.forEach(p => ctx.fillRect(p.x, p.y, p.w, p.h));

  // Desenha Player
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(player.x, player.y, player.w, player.h);

  ctx.restore();
}

/* ===== LOOP ===== */
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();
