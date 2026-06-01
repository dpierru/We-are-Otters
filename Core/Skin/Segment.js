import Vector2 from "../Vector2.js"

export default class Segment {
    constructor(length, radius, parent = null) {
        this.position = new Vector2()
        this.angle = 0

        this.length = length
        this.radius = radius
        this.setParent(parent)

        this.segmentsChildren = []      // Liste des segments enfants (corps)
        this.attachmentsChildren = []   // Liste des attachements enfants (yeux)
        this.parent = null
    }

    setParent(parent) {
        this.parent = parent
        parent?.segmentsChildren.push(this)
    }

    addChild(segment) {
        this.segmentsChildren.push(segment)
        segment.setParent(this)
        return segment
    }

    addAttachment(attachment) {
        
        this.attachmentsChildren.push(attachment)
        attachment.setParent(this)
        
        return this
    }

    update(dt, skin = null) {    
        // Cas du segment racine, on est attaché directement à la skin. 
        if (!this.parent) {
            this.position = skin.actor.position.clone()
            
            const velocity = skin.actor.velocity
            this.angle = Math.atan2(velocity.y, velocity.x)
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
            const direction = this.parent.position.clone().sub(this.position)

            if (direction.length() > 0) {
                this.angle = Math.atan2(dir.y, dir.x)
                
            }

        }
        
        


        for (const child of this.segmentsChildren) {
            child.update(dt)
        }

        
        for (const child of this.attachmentsChildren) {
            child.update()
        }
    }

    render(renderer) {
        const ctx = renderer.ctx
        ctx.fillStyle = "white"
        //console.log(this.position, this.radius);
        //this.position.draw(ctx, 0, 0, "white")

        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fill()

        for (const child of this.segmentsChildren) {
            child.render(renderer)
        }

        for (const child of this.attachmentsChildren) {
            child.render(renderer)
        }

        
    }
}