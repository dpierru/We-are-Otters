import Vector2 from "./Vector2.js"

export default class Actor {
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

    update(dt) {
        for (const c of this.behaviors) {
            c.update?.(dt, this)
        }
    }

    draw(renderer) {
        for (const c of this.behaviors) {
            c.draw?.(renderer, this)
        }

        const ctx = renderer.ctx

        ctx.fillStyle = this.color || "white"

        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2)
        ctx.fill()

        // this.target.drawPoint(ctx, this.color || "white")
        // this.velocity.draw(ctx, this.position.x, this.position.y, this.color || "white")
    }
}