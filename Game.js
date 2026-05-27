import Painter from "./Painter.js"
import Otter from "./Otter.js"

export default class Game {



    constructor() {
        // Initialisation du canvas (id = main)
        this.canvas = document.getElementById('main')
        this.ctx = this.canvas.getContext('2d')

        this.initCanvas()
        this.initEventListener()

        // Initialisation du helper Draw
        this.painter = new Painter(this.ctx)

        this.otter = new Otter(100, 100, this.painter)

        this.startGame()
    }

    initEventListener() {
        window.addEventListener('resize', () => this.initCanvas())
        //window.addEventListener('click', (e) => this.moveOtter(e.clientX, e.clientY))
        window.addEventListener('mousemove', (e) => this.moveOtter(e.clientX, e.clientY))
    }


    initCanvas() {
        console.log("init canvas");

        const dpr = window.devicePixelRatio || 1;

        const rect = this.canvas.getBoundingClientRect();

        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;

        this.ctx.scale(dpr, dpr);

        this.initWorld()
    }

    initWorld() {
        // Applique la couleur bleu marine au background
        this.ctx.fillStyle = 'rgb(22, 14, 36)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    emptyWorld() {
        this.ctx.fillStyle = 'rgb(22, 14, 36)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }


    startGame() {
        this.lastTime = performance.now();

        const loop = (now) => {
            const delta = (now - this.lastTime) / 1000; // en secondes
            this.lastTime = now;

            this.update(delta);
            this.render();

            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }

    update(delta) {
        this.otter.moveOtter(delta);
    }

    render() {
        this.emptyWorld();
        this.otter.draw();
    }

    moveOtter(x, y) {
        console.log(x, y);
        this.otter.targetX = x
        this.otter.targetY = y
    }
}