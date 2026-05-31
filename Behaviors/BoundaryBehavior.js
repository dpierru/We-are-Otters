import Behavior from "./Behavior.js"
import Vector2 from "../Vector2.js"
import Utils from "../Services/Utils.js"

export default class BoundaryBehavior extends Behavior {
    constructor(offset = 150) {
        super()
        this.offset = offset
        this.startTurning = false
        this.forceCalculateNewTarget = true
    }

    get bounds() {
        return this.owner.world.bounds
    }

    initWorldAttachement() {
        this.eventBus.on('boundsUpdated', () => {
            console.log("BoundUpdated (Boundary)");
            
            this.forceCalculateNewTarget = true
        })

        this.eventBus.on("clickInWorld", (event) => {
            this.forceNewTarget(event.x, event.y)
        })
    }

    isNearWall() {
        const x = this.owner.position.x
        const y = this.owner.position.y
        let isNear = x < this.offset || x > this.bounds.width - this.bounds.offset || y < this.offset || y > this.bounds.height - this.offset

        return isNear
    }

    isInsideTargetRadius(radius) {
        const dx = this.owner.position.x - this.owner.target.x
        const dy = this.owner.position.y - this.owner.target.y

        const distanceSquared = dx * dx + dy * dy

        return distanceSquared <= radius * radius
    }

    shouldCalcultateNewTarget() {
        if (this.forceCalculateNewTarget) {
            return true
        }
        if (this.isNearWall() && this.startTurning === false) {
            return true
        }
        if (this.isInsideTargetRadius(100)) {
            return true
        }

        return false
    }

    forceNewTarget(x, y) {
        this.owner.target = new Vector2(x, y)
        this.forceCalculateNewTarget = false
    }

    calculateNewTarget(x, y) {
        this.owner.target = new Vector2(
            Utils.getRandomInt(150, this.bounds.width - this.offset),
            Utils.getRandomInt(150, this.bounds.height - this.offset)
        )
        this.forceCalculateNewTarget = false
    }

    handleBounds() {
        if (this.shouldCalcultateNewTarget()) {
            this.startTurning = true

            this.calculateNewTarget()
            //console.log("this.owner.target : ", this.owner.target);

        } else if (this.isNearWall() === false) {
            this.startTurning = false
        }

    }

    update() {
        this.handleBounds()
    }
}