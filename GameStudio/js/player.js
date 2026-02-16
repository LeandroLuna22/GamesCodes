// Player.js

export class Player {
    constructor(character) {
        this.x = 100;
        this.y = 0;
        this.width = 64;   // tamanho do player no canvas
        this.height = 64;

        this.speed = 6;
        this.velocityY = 0;
        this.velocityX = 0;
        this.gravity = 0.6;
        this.jumpForce = -12;

        this.state = "idle";

        this.frameX = 0;
        this.frameY = 0;
        this.frameTimer = 0;
        this.frameInterval = 6;

        this.isOnGround = false;
        this.isHit = false;
        this.invulnerable = false;

        this.keys = {};

        // Sprite sheet única
        this.spriteImage = new Image();
        this.spriteImage.src = character.sprite; // pega o sprite do personagem escolhido

        this.frameWidth = 64;  // largura de cada frame na sprite sheet
        this.frameHeight = 64; // altura de cada frame

        document.addEventListener("keydown", (e) => { this.keys[e.key] = true; });
        document.addEventListener("keyup", (e) => { this.keys[e.key] = false; });
    }

    update(canvasHeight) {
        const movingRight = this.keys["ArrowRight"];
        const movingLeft = this.keys["ArrowLeft"];
        const attackKey = this.keys["f"];

        // NÃO permite controle durante hit
        if (!this.isHit) {

            // 🔥 ATAQUE TEM PRIORIDADE
            if (attackKey && this.state !== "attack" && this.isOnGround) {
                this.state = "attack";
                this.frameX = 0;
                this.velocityX = 0; // para o player
            }

            // Se NÃO estiver atacando
            if (this.state !== "attack") {

                this.velocityX = 0;

                if (movingRight) {
                    this.velocityX = this.speed;
                    this.state = "run";
                } else if (movingLeft) {
                    this.velocityX = -this.speed;
                    this.state = "run";
                } else if (this.isOnGround) {
                    this.state = "idle";
                }

                // Pulo
                if (this.keys[" "] && this.isOnGround) {
                    this.velocityY = this.jumpForce;
                    this.isOnGround = false;
                    this.state = "jump";
                }
            }
        }

        // Movimento horizontal
        this.x += this.velocityX;

        // Gravidade
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Chão
        if (this.y + this.height >= canvasHeight - 20) {
            this.y = canvasHeight - 20 - this.height;
            this.velocityY = 0;
            this.isOnGround = true;

            if (this.state === "jump") {
                this.state = "idle";
            }
        }

        this.updateAnimation();
    }

    takeHit(source) {
        if (this.invulnerable) return;

        this.isHit = true;
        this.invulnerable = true;

        // Salto vertical
        this.velocityY = -10;

        const playerCenter = this.x + this.width / 2;
        const sourceCenter = source.x + source.width / 2;

        // Knockback oposto
        this.velocityX = playerCenter < sourceCenter ? -8 : 8;

        setTimeout(() => {
            this.invulnerable = false;
            this.isHit = false;
            this.velocityX = 0;
        }, 600);
    }

    updateAnimation() {
        const animations = {
            idle: { row: 0, frames: 4 },
            run: { row: 1, frames: 6 },
            jump: { row: 2, frames: 2 },
            attack: { row: 3, frames: 6 },
            hit: { row: 4, frames: 2 }
        };

        const anim = animations[this.state];
        if (!anim) return;

        this.frameY = anim.row;

        this.frameTimer++;
        if (this.frameTimer >= this.frameInterval) {
            this.frameTimer = 0;
            this.frameX++;

            if (this.frameX >= anim.frames) {
                // Após ataque, volta para run ou idle
                if (this.state === "attack") {
                    if (this.keys["ArrowRight"] || this.keys["ArrowLeft"]) {
                        this.state = "run";
                    } else {
                        this.state = "idle";
                    }
                }
                this.frameX = 0;
            }
        }
    }

    draw(ctx) {
        ctx.drawImage(
            this.spriteImage,
            this.frameX * this.frameWidth,
            this.frameY * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    collides(obj) {
        return (
            this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y
        );
    }
}


