import Behavior from "../Core/Behavior.js"
import Vector2 from "../Core/Vector2.js"

export default class WiggleBehavior extends Behavior {
    constructor(amplitude = 1, frequency = 3) {
        super()
        this.amplitude = amplitude
        this.frequency = frequency
        this.time = 0
        this.offset = new Vector2(0, 0)
    }

    update(dt) {
        this.time += dt

        const actor = this.owner

        const forward = actor.velocity.clone().normalize()
        const perp = new Vector2(-forward.y, forward.x)

        const wobble = Math.sin(this.time * this.frequency) * this.amplitude

        this.offset = perp.multiply(wobble)

        this.apply()
    }

    apply() {
        this.owner.position.add(this.offset)
    }
}