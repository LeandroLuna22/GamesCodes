// game.js

import { Player } from "./player.js";
import { levels } from "./levels.js";
import { createEnemies } from "./enemies.js";
import { createObstacles } from "./obstacles.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const hud = document.getElementById("hud");
const livesDisplay = document.getElementById("livesDisplay");

let player;
let gameRunning = false;
let lives = 5;

let currentLevelIndex = 0;
let currentLevel;
let enemies = [];
let obstacles = [];

let cameraX = 0;

export function initGame(character) {
    canvas.classList.remove("hidden");
    hud.classList.remove("hidden");

    player = new Player(character);

    loadLevel(currentLevelIndex);

    updateHUD();
    gameRunning = true;
    gameLoop();
}

function loadLevel(index) {
    currentLevel = levels[index];

    enemies = createEnemies(currentLevel.enemies, currentLevel.length);
    obstacles = createObstacles(currentLevel.obstacles, currentLevel.length);

    player.x = 100;
    player.y = 0;
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update(canvas.height);

    // Limite horizontal do mapa
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > currentLevel.length) player.x = currentLevel.length - player.width;

    // Atualiza câmera
    if (player.x > canvas.width / 2) {
        cameraX = player.x - canvas.width / 2;
    }

    ctx.save();
    ctx.translate(-cameraX, 0);

    // chão
    ctx.fillStyle = "brown";
    ctx.fillRect(0, canvas.height - 20, currentLevel.length, 20);

    // desenhar player
    player.draw(ctx);

    // DESENHAR OBSTÁCULOS
    obstacles.forEach(obs => {
        obs.draw(ctx);

        if (player.collides(obs) && !player.invulnerable) {
            loseLife(obs);
        }
    });

    // DEPOIS INIMIGOS
    enemies.forEach(enemy => {
        enemy.update();
        enemy.draw(ctx);

        if (player.collides(enemy) && !player.invulnerable) {
            loseLife(enemy);
        }
    });

    // ITEM FINAL DA FASE (Portal)
    const portal = {
        x: currentLevel.length - 100,
        y: canvas.height - 80,
        width: 40,
        height: 60
    };

    ctx.fillStyle = "gold";
    ctx.fillRect(portal.x, portal.y, portal.width, portal.height);

    if (player.collides(portal)) nextLevel();

    ctx.restore();

    // continuar o loop
    requestAnimationFrame(gameLoop);
}


function nextLevel() {
    currentLevelIndex++;

    if (currentLevelIndex >= levels.length) {
        alert("Você zerou o jogo! 🔥");
        location.reload();
        return;
    }

    cameraX = 0;
    loadLevel(currentLevelIndex);

    updateHUD();
}

function loseLife(source) {
    if (player.invulnerable) return;

    lives--;
    updateHUD();
    player.takeHit(source);

    if (lives <= 0) {
        setTimeout(() => gameOver(), 500);
    }
}


function updateHUD() {
    livesDisplay.textContent = "Vidas: " + lives + " | Fase: " + (currentLevelIndex + 1);
}

function gameOver() {
    gameRunning = false;
    canvas.classList.add("hidden");
    hud.classList.add("hidden");
    document.getElementById("gameOverScreen").classList.remove("hidden");
}

export function restartGame() {
    location.reload();
}


