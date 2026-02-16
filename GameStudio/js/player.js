// Player.js 

export class Player {
    constructor(character) {
        this.x = 100;
        this.y = 0;
        this.width = 40;
        this.height = 40;
        this.color = character.color;

        this.speed = 5;
        this.velocityY = 0;
        this.velocityX = 0;
        this.gravity = 0.6;
        this.jumpForce = -12;

        this.isOnGround = false;
        this.isHit = false;
        this.invulnerable = false;

        this.keys = {};

        document.addEventListener("keydown", (e) => {
            this.keys[e.key] = true;
        });

        document.addEventListener("keyup", (e) => {
            this.keys[e.key] = false;
        });
    }

    update(canvasHeight) {

        if (!this.isHit) {
        this.velocityX = 0;

        if (this.keys["ArrowRight"]) this.velocityX = this.speed;
        if (this.keys["ArrowLeft"]) this.velocityX = -this.speed;

        if (this.keys[" "] && this.isOnGround) {
            this.velocityY = this.jumpForce;
            this.isOnGround = false;
        }
    }

this.x += this.velocityX;


        // Gravidade
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Chão
        if (this.y + this.height >= canvasHeight - 20) {
            this.y = canvasHeight - 20 - this.height;
            this.velocityY = 0;
            this.isOnGround = true;
            this.isHit = false;
        }
    }

        takeHit(direction = 1) {
        if (this.invulnerable) return;

        this.isHit = true;
        this.invulnerable = true;

        this.velocityY = -8;
        this.velocityX = -direction * 5;

        setTimeout(() => {
            this.invulnerable = false;
        }, 1000);
    }


    draw(ctx) {
        ctx.fillStyle = this.invulnerable ? "white" : this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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

