import Behavior from "../Core/Behavior.js"

// Steering : orienter. 
// C'est le comportement qui permet de se diriger vers la target. 
export default class SteeringBehavior extends Behavior {
    constructor(maxTurn = 0.01) {
        super()
        this.maxTurn = maxTurn
    }

    setTarget(target) {
        this.target = target
    }

    update(dt) {
        const actor = this.owner
        this.target = this.owner.target
        
        if (!this.target) return

        const currentAngle = Math.atan2(actor.velocity.y, actor.velocity.x)

        const toTarget = this.target.clone().sub(actor.position)
        const targetAngle = Math.atan2(toTarget.y, toTarget.x)

        let diff = targetAngle - currentAngle
        diff = Math.atan2(Math.sin(diff), Math.cos(diff))

        const newAngle =
            currentAngle +
            Math.max(-this.maxTurn, Math.min(this.maxTurn, diff))

        const speed = actor.velocity.length()

        actor.velocity.x = Math.cos(newAngle) * speed
        actor.velocity.y = Math.sin(newAngle) * speed
    }
}