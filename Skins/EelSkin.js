import Segment from "../Core/Skin/Segment.js";
import Skin from "../Core/Skin/Skin.js";

export default class EelSkin extends Skin {

    constructor() {
        super()
        let segmentCount = 10
        this.headSegment = new Segment(10, 5)
        let prevSegment = this.headSegment
        for (let i = 0; i < segmentCount; i++) {
            let newSegment = new Segment(15, 150)
            newSegment.setParent(prevSegment)
            prevSegment = newSegment
        }
        console.log(this);
        
    }
    
    update(dt) {
        this.headSegment.update(dt, this)
    }

    render(renderer) {
        const ctx = renderer.ctx

        this.headSegment.render(renderer)
        // ctx.fillStyle = this.color || "white"
        // ctx.beginPath()
        // ctx.arc(this.actor.position.x, this.actor.position.y, 10, 0, Math.PI * 2)
        
        // ctx.fill()
    }
}