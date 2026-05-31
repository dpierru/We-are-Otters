/**
 * Cette classe est le moteur de rendu. 
 * Elle est la seule à connaitre le contexte pour pouvoir dessiner dans le canvas. 
 */
export default class Renderer {
    ctx // Contexte pour pouvoir dessiner dans le canvas

    constructor(ctx) {
        this.ctx = ctx;
    }

    draw(shape) {
        switch (shape.type) {
            case CIRCLE:
                this.drawCircle(shape)
                break;
            case ARROW: 
                this.drawArrow(shape)
                break;
            // On ajoute les types suivant. 
            default:
                break;
        }
    }


    drawCircle(x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

}