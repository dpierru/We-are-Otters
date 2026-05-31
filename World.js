export default class World {
    bounds = { width: 0, height: 0 }
    actors = []

    constructor(width = 0, height = 0) {
        
        this.setBounds(width, height)
    }

    setBounds(width, height) {
        this.bounds.width = width
        this.bounds.height = height
        console.log(this.bounds.width, this.bounds.height);
        
    }

    add(actor) {
        console.log("Acteur ajouté : ", actor)
        actor.world = this
        
        this.actors.push(actor)
    }

    update(dt) {
        for (const actor of this.actors) {
            actor.update(dt)
        }
    }

    render(renderer) {
        const ctx = renderer.ctx
        ctx.fillStyle = 'rgb(22, 14, 36)'
        ctx.fillRect(0, 0, this.bounds.width, this.bounds.height)

        for (const actor of this.actors) {
            actor.render(renderer)
        }
    }

    getBounds() {
        return {
            width: this.width,
            height: this.height
        }
    }
}