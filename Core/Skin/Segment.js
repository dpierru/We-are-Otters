import Vector2 from "../Vector2.js"

export default class Segment {
    constructor(length, radius) {
        this.position = new Vector2()
        this.angle = 0

        this.length = length
        this.radius = radius

        this.children = [] // attachments
        this.parent = null
    }

    setParent(parent) {
        this.parent = parent
        parent.children.push(this)
    }

    update(dt, skin = null) {    
        // Cas du segment racine, on est attaché directement à la skin. 
        if (!this.parent) {
            this.position = skin.actor.position.clone()
        }

        if (this.parent) {
            const dir = this.parent.position.clone().sub(this.position)
            const dist = dir.length()

            if (dist > 0) {
                dir.normalize()

                this.position = this.parent.position
                    .clone()
                    .sub(dir.multiply(this.length))            
            }    
        }
        
        for (const child of this.children) {
            child.update(dt)
        }
    }

    render(renderer) {
        const ctx = renderer.ctx
        ctx.fillStyle = "white"
        //console.log(this.position, this.radius);
        //this.position.draw(ctx, 0, 0, "white")

        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2)
        ctx.fill()

        for (const child of this.children) {
            child.render(renderer)
        }

        
    }
}