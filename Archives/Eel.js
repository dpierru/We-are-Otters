import Utils from "../Services/Utils.js"
import Vector2 from "../Core/Vector2.js"

export default class Eel {
    constructor(x, y, color = "") {
        this.position = new Vector2(x, y)
        this.maxSpeed = 200
        this.velocity = new Vector2(1, 0).multiply(this.maxSpeed)
        this.time = 0
        this.startTurning = false
        this.turningDirection = "droite"
        this.target = new Vector2(500, 500)
        this.maxTurn = 0.01
        this.wiggleOffset = new Vector2(0, 0)
        this.offset = 150 // Distance des murs et des obstacles

        this.frequency = 3
        this.amplitude = 1

        this.color = color
        if (color === "") {
            this.color = Utils.getRandomColor()
        }
        
    }

    // Détermine si on est proche des murs.
    isNearWall(bounds) {
        const x = this.position.x
        const y = this.position.y
        let isNear = x < this.offset || x > bounds.width - this.offset || y < this.offset || y > bounds.height - this.offset
        //console.log("Near Wall : ", isNear);

        return isNear
    }

    // Détermine si on est proche du point vers lequel on cherche à aller. 
    isInsideTargetRadius(radius) {
        const dx = this.position.x - this.target.x
        const dy = this.position.y - this.target.y

        const distanceSquared = dx * dx + dy * dy

        return distanceSquared <= radius * radius
    }

    // Détermine s'il faut calculer une nouvelle cible.
    shouldCalcultateNewTarget(bounds) {
        if (this.isNearWall(bounds) && this.startTurning === false) {
            return true
        }
        if (this.isInsideTargetRadius(100)) {
            return true
        }

        return false
    }
        
    calculateWiggle(dt) {
        const forward = this.velocity.clone().normalize()

        const perp = new Vector2(-forward.y, forward.x)
        const time = this.time
        const offset = Math.sin(time * this.frequency) * this.amplitude
        this.wiggleOffset = perp.multiply(offset)
    }

    updateDirectionToTarget() {
        const currentAngle = Math.atan2(this.velocity.y, this.velocity.x)

        const toTarget = this.target.clone().sub(this.position)
        const targetAngle = Math.atan2(toTarget.y, toTarget.x)

        // différence d’angle (corrigée)
        let diff = targetAngle - currentAngle

        // normalisation [-PI, PI]
        diff = Math.atan2(Math.sin(diff), Math.cos(diff))

        // rotation limitée
        const newAngle = currentAngle + Math.max(-this.maxTurn, Math.min(this.maxTurn, diff))

        const speed = this.velocity.length()

        // Règle de trigonométrie : 
        // cos(x) correspond sur un repère orthonormé à la position d
        this.velocity.x = Math.cos(newAngle) * speed
        this.velocity.y = Math.sin(newAngle) * speed
    }

    handleBounds(bounds) {
        if (this.shouldCalcultateNewTarget(bounds)) {
            this.startTurning = true
            // On défini une nouvelle random target. 
            console.log("Bounds", bounds);

            this.target = new Vector2(
                Utils.getRandomInt(150, bounds.width - this.offset),
                Utils.getRandomInt(150, bounds.height - this.offset)
            )
            console.log("this.target : ", this.target);

        } else if (this.isNearWall(bounds) === false) {
            this.startTurning = false
        }

    }

    update(dt) {
        this.updateDirectionToTarget()
        this.position.addScaledVector(this.velocity, dt)
        this.calculateWiggle(dt)
        this.position.add(this.wiggleOffset)
        this.time += dt
    }


    draw(renderer) {
        const ctx = renderer.ctx
        ctx.fillStyle = this.color

        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2)
        ctx.fill()
        this.velocity.draw(ctx, this.position.x, this.position.y, this.color)

        this.target.drawPoint(ctx, this.color)
        this.wiggleOffset.drawPoint(ctx, this.color)
    }
}