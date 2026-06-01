import Segment from "../Core/Skin/Segment.js";
import Skin from "../Core/Skin/Skin.js";
import EyeAttachment from "./Attachment/EyeAttachment.js";

export default class EelSkin extends Skin {

    constructor() {
        super()
        let segmentCount = 10
        this.headSegment = new Segment(10, 10)
        // let prevSegment = this.headSegment
        // for (let i = 0; i < segmentCount; i++) {
        //     let newSegment = new Segment(15, 10)
        //     newSegment.setParent(prevSegment)
        //     prevSegment = newSegment
        // }
        
        this.headSegment.addChild(new Segment(10, 20))
            .addChild(new Segment(20, 20))
            .addChild(new Segment(15, 25))
            .addChild(new Segment(20, 35))
            .addChild(new Segment(20, 35))
            .addChild(new Segment(20, 35))
            .addChild(new Segment(20, 30))
            .addChild(new Segment(20, 25))
            .addChild(new Segment(20, 20))
            .addChild(new Segment(20, 15))
            .addChild(new Segment(15, 10))
        
        this.headSegment
            .addAttachment(new EyeAttachment(-3, 5))
            .addAttachment(new EyeAttachment(-3, -5))
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