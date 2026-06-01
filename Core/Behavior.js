export default class Behavior {
    constructor() {
        this.owner = null
    }

    setOwner(actor) {
        console.log("Set owner : ", actor);
        this.owner = actor

        this.init()
    }

    init() {
        // Cette méthode ne fait rien, elle est surchargeable pour initialiser les comportements.
        // Elle est appelée automatiquement après que le setOwner soit appelé, 
        // donc le monde et l'acteur sont accessibles.
    }

    get eventBus() {
        console.log(this.owner);
        
        return this.owner.eventBus
    }

    initWorldAttachement() {}

    update(dt) {}
    render(renderer) {}
}