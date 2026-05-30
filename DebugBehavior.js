import Behavior from "./Behavior.js"
import Utils from "./Utils.js"

export default class DebugBehavior extends Behavior {

    constructor(showDebug = true) {
        super() 
        this.showDebug = showDebug
        
        //this.color = "red"
    }

    draw(renderer) {
        if (!this.showDebug) return

        const ctx = renderer.ctx
        console.log("DEBUG");
        
        this.owner.target.drawPoint(ctx, this.color || "white")
        this.owner.velocity.draw(ctx, this.owner.position.x, this.owner.position.y, this.color || "white")
    }
}