import Vector2 from "../Vector2.js"


export default class Attachment {

    parent = null

    // x et y sont les coordonnées relative de l'attachement par rapport aux corrdonnées du segment
    // auquel il est attaché
    constructor(x, y) {
        this.offset = new Vector2(x, y)
    }

    setParent(parent) {
        this.parent = parent
    }

    update() { }

    render(renderer) { }

}