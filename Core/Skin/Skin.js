export default class Skin {
    actor = null
    headSegment = null

    constructor() {
    }

    attachToActor(actor) { 
        this.actor = actor
    }

    update(dt) { }

    render(renderer) { }
    
    initActorAttachment() { }
}