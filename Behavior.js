export default class Behavior {
    constructor() {
        this.owner = null
    }

    setOwner(actor) {
        console.log("Set onwer : ", actor);
        
        this.owner = actor
    }

    update(dt) {}
    draw(renderer) {}
}