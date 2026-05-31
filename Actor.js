import Vector2 from "./Vector2.js"

export default class Actor {
    world = null

    constructor() {
        this.position = new Vector2(200, 200)
        this.velocity = new Vector2(100, 100)
        this.target = new Vector2(500, 500)
        this.behaviors = []
    }

    add(behavior) {
        behavior.setOwner(this)
        this.behaviors.push(behavior)
    }

    attachToWorld(world) {
        this.world = world
        this.eventBus = this.world.eventBus // Raccourci. 
        for (const behavior of this.behaviors) {
            behavior.initWorldAttachement?.()
        }
    }

    update(dt) {
        for (const behavior of this.behaviors) {
            behavior.update?.(dt, this)
        }
    }

    render(renderer) {       
        for (const behavior of this.behaviors) {
            behavior.draw?.(renderer, this)
        }

        const ctx = renderer.ctx

        ctx.fillStyle = this.color || "white"

        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2)
        
        ctx.fill()
    }
}