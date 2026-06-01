import Attachment from "../../Core/Skin/Attachment.js"


export default class EyeAttachment extends Attachment {
    constructor(offsetX, offsetY) {
        super(offsetX, offsetY);
    }

    update() {
    }

    render(renderer) {
        const ctx = renderer.ctx

        const angle = this.parent.angle
        //console.log("Angle du parent, ", this .parent.angle);
        

        const cos = Math.cos(angle)
        const sin = Math.sin(angle)

        const x =
            this.parent.position.x +
            this.offset.x * cos -
            this.offset.y * sin

        const y =
            this.parent.position.y +
            this.offset.x * sin +
            this.offset.y * cos

        const directionX = Math.cos(angle)
        const directionY = Math.sin(angle)
        
        ctx.beginPath()
        ctx.fillStyle = "darkblue"
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = "black"
        ctx.arc(x + directionX, y + directionY, 3, 0, Math.PI * 2)
        ctx.fill()

        
    }
}