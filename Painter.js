export default class Painter {
    constructor(ctx) {
        this.ctx = ctx;
    }

    drawCircle(x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    getRandomPoint() {
        const canvas = this.ctx.canvas;

        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        };
    }
}