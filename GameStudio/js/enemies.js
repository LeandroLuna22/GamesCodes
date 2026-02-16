export function createEnemies(qtd, levelLength) {
    const enemies = [];

    for (let i = 0; i < qtd; i++) {
        enemies.push({
            x: 500 + i * (levelLength / qtd),
            y: 300,
            width: 40,
            height: 40,
            speed: 1 + Math.random() * 2,

            update() {
                this.x -= this.speed;
            },

            draw(ctx) {
                ctx.fillStyle = "purple";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        });
    }

    return enemies;
}

