import Vector2 from "./Vector2.js"

export default class Eel2 {
    constructor(x, y, segmentCount = 15) {
        this.segments = []

        this.spacing = 12 // distance entre segments

        // tête
        this.segments.push({
            position: new Vector2(x, y),
            size: 10
        })

        // corps
        for (let i = 1; i < segmentCount; i++) {
            this.segments.push({
                position: new Vector2(x - i * this.spacing, y),
                size: 10 - i * 0.3
            })
        }

        this.time = 1
        this.speed = 10
        this.amplitude = 10
        this.velocity = 10
    }

    // -----------------------------------
    // UPDATE
    // -----------------------------------
    update(dt) {
        this.time += dt

        this.updateHead(dt)
        this.updateBody()
    }

    // -----------------------------------
    // HEAD MOTION (procédural)
    // -----------------------------------
    updateHead(dt) {
        const head = this.segments[0]

        // déplacement global
        head.position.addScaledVector(this.velocity, dt)

        // wiggle local autour de la trajectoire
        const offset = new Vector2(
            Math.sin(this.time * 6) * 10,
            Math.cos(this.time * 4) * 6
        )

        head.position.set(
            head.position.x + offset.x,
            head.position.y + offset.y
        )
    }

    // -----------------------------------
    // BODY FOLLOW (chaîne)
    // -----------------------------------
    updateBody() {
        for (let i = 1; i < this.segments.length; i++) {
            const current = this.segments[i]
            const prev = this.segments[i - 1]

            this.follow(current, prev)
        }
    }

    follow(current, target) {
        const dir = new Vector2()
            .subVectors(target.position, current.position)

        const distance = dir.length()

        // si trop loin → on corrige
        if (distance > this.spacing) {
            dir.normalize()

            current.position.set(
                target.position.x - dir.x * this.spacing,
                target.position.y - dir.y * this.spacing
            )
        }
    }

    // -----------------------------------
    // DRAW
    // -----------------------------------
    draw(renderer) {
        const ctx = renderer.ctx

        // corps
        for (let i = 0; i < this.segments.length; i++) {
            const s = this.segments[i]

            ctx.beginPath()
            ctx.arc(s.position.x, s.position.y, s.size, 0, Math.PI * 2)

            // gradient simple visuel (optionnel)
            const t = i / this.segments.length
            ctx.fillStyle = `rgba(255, 255, 255, ${1 - t * 0.6})`

            ctx.fill()
        }

        // debug tête (optionnel)
        const head = this.segments[0]
        ctx.beginPath()
        ctx.arc(head.position.x, head.position.y, head.size + 2, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()
    }
}