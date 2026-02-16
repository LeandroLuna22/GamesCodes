export function createObstacles(qtd, levelLength) {
    const obstacles = [];

    for (let i = 0; i < qtd; i++) {
        obstacles.push({
            x: 700 + i * (levelLength / qtd),
            y: 320,
            width: 30,
            height: 30,

            draw(ctx) {
                ctx.fillStyle = "gray";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        });
    }

    return obstacles;
}

