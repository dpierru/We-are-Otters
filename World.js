export default class World {

    constructor(width = 0, height = 0) {
        this.width = width
        this.height = height
    }

    update(dt) {

    }

    render(renderer) {
        const ctx = renderer.ctx
        ctx.fillStyle = 'rgb(22, 14, 36)'
        ctx.fillRect(0, 0, this.width, this.height)
    }

    getBounds() {
        return {
            width: this.width,
            height: this.height
        }
    }
}