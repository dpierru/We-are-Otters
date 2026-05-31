import Renderer from "./Renderer.js"
import Otter from "./Otter.js"
import Vector2 from "./Vector2.js"
import Eel from "./Eel.js"
import World from "./World.js"
import Actor from "./Actor.js"
import InputSystem from "./InputSystem.js"
import Behavior from "./Behaviors/Behavior.js"
import WiggleBehavior from "./Behaviors/WiggleBehavior.js"
import MovingBehavior from "./Behaviors/MovingBehavior.js"
import SteeringBehavior from "./Behaviors/SteeringBehavior.js"
import BoundaryBehavior from "./Behaviors/BoundaryBehavior.js"
import DebugBehavior from "./Behaviors/DebugBehavior.js"
import EventBus from "./Services/EventBus.js"


export default class Game {

    constructor() {
        this.eventBus = new EventBus()

        // Initialisation du canvas (id = main)
        this.canvas = document.getElementById('main')
        this.ctx = this.canvas.getContext('2d')

        this.inputSystem = new InputSystem(this.eventBus, this.canvas)
        this.world = new World(this.eventBus)

        this.initCanvas()
        this.initEventListener()

        this.renderer = new Renderer(this.ctx)

        let eel = new Actor()
        eel.add(new SteeringBehavior())
        eel.add(new BoundaryBehavior())
        eel.add(new MovingBehavior(300))
        eel.add(new WiggleBehavior(0.5, 5))
        eel.add(new DebugBehavior(true, "random"))
       
        this.world.add(eel)

        this.startGame()
    }

    initEventListener() {
        window.addEventListener('resize', () => this.initCanvas())
        //window.addEventListener('click', (e) => this.eel.applyDirection(new Vector2(e.clientX, e.clientY)))
        //window.addEventListener('mousemove', (e) => this.moveOtter(e.clientX, e.clientY))
    }


    initCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;

        this.ctx.setTransform(1, 0, 0, 1, 0, 0)
        this.ctx.scale(dpr, dpr)
        this.world.setBounds(rect.width, rect.height)
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
        this.world.update(delta)
    }

    render() {
        this.world.render(this.renderer)
    }
}