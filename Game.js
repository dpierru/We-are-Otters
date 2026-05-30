import Renderer from "./Renderer.js"
import Otter from "./Otter.js"
import Vector2 from "./Vector2.js"
import Eel from "./Eel.js"
import World from "./World.js"
import Utils from "./Utils.js"

export default class Game {

    constructor() {
        // Initialisation du canvas (id = main)
        this.canvas = document.getElementById('main')
        this.ctx = this.canvas.getContext('2d')

        this.world = new World()

        this.initCanvas()
        this.initEventListener()

        this.renderer = new Renderer(this.ctx)
        this.eelList = []
        // for (let i = 0; i < 10; i++) {
        //     this.eelList.push(
        //         new Eel(
        //             Utils.getRandomInt(0, this.world.width),
        //             Utils.getRandomInt(0, this.world.height)
        //         )
        //     )
        // } 
        this.eel = new Eel(100, 100, "white")
       
        this.startGame()
    }

    initEventListener() {
        window.addEventListener('resize', () => this.initCanvas())
        window.addEventListener('click', (e) => this.eel.applyDirection(new Vector2(e.clientX, e.clientY)))
        //window.addEventListener('mousemove', (e) => this.moveOtter(e.clientX, e.clientY))
    }


    initCanvas() {
        console.log("init canvas");

        const dpr = window.devicePixelRatio || 1;

        const rect = this.canvas.getBoundingClientRect();

        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;

        this.ctx.scale(dpr, dpr);

        this.world.width = this.canvas.width
        this.world.height = this.canvas.height
    }

    startGame() {
        this.lastTime = performance.now();

        const loop = (now) => {
            const delta = (now - this.lastTime) / 1000
            this.lastTime = now

            this.update(delta)
            this.render()

            requestAnimationFrame(loop)
        };

        requestAnimationFrame(loop)
    }

    update(delta) {
        this.eel.update(delta)
        this.eel.handleBounds(this.world.getBounds())

        //for (let i = 0; i < 10; i++) this.eelList[i].update(delta)
        // for (let eel of this.eelList) {
        //     eel.update(delta)
        //     eel.handleBounds(this.world.getBounds())
        // }
        
    }

    render() {
        this.world.render(this.renderer)
        this.eel.draw(this.renderer)
        // for (let eel of this.eelList) {
        //     eel.draw(this.renderer)
        // }
    }
}