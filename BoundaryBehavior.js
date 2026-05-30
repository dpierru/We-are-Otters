import Behavior from "./Behavior.js"
import Vector2 from "./Vector2.js"
import Utils from "./Utils.js"

export default class BoundaryBehavior extends Behavior {
    constructor(width, height, offset = 150) {
        super()
        this.width = width
        this.height = height
        this.offset = offset
        this.startTurning = false
    }

    isNearWall() {
        const x = this.owner.position.x
        const y = this.owner.position.y
        let isNear = x < this.offset || x > this.width - this.offset || y < this.offset || y > this.height - this.offset
        console.log("Near Wall : ", isNear);

        return isNear
    }

    isInsideTargetRadius(radius) {
        const dx = this.owner.position.x - this.owner.target.x
        const dy = this.owner.position.y - this.owner.target.y

        const distanceSquared = dx * dx + dy * dy

        return distanceSquared <= radius * radius
    }

    shouldCalcultateNewTarget() {
        if (this.isNearWall() && this.startTurning === false) {
            return true
        }
        if (this.isInsideTargetRadius(100)) {
            return true
        }

        return false
    }

    handleBounds() {
        if (this.shouldCalcultateNewTarget()) {
            this.startTurning = true

            this.owner.target = new Vector2(
                Utils.getRandomInt(150, this.width - this.offset),
                Utils.getRandomInt(150, this.height - this.offset)
            )
            console.log("this.owner.target : ", this.owner.target);

        } else if (this.isNearWall() === false) {
            this.startTurning = false
        }

    }

    update() {
        const x = this.owner.position.x
        const y = this.owner.position.y
        //console.log(x, y);

        this.handleBounds()
    }
}