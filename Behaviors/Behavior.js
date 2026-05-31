export default class Behavior {
    constructor() {
        this.owner = null
    }

    setOwner(actor) {
        console.log("Set owner : ", actor);
        this.owner = actor
    }

    update(dt) {}
    draw(renderer) {}
}