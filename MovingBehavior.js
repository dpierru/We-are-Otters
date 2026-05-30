import Behavior from "./Behavior.js"

export default class MovingBehavior extends Behavior {
    constructor(maxSpeed = 500) {
        super()
        this.maxSpeed = maxSpeed
    }

    update(dt) {
        const speed = this.owner.velocity.length()

        if (speed > this.maxSpeed) {
            this.owner.velocity.multiply(this.maxSpeed / speed)
        }

        this.owner.position.addScaledVector(this.owner.velocity, dt)
    }
}