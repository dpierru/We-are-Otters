console.log("loading Vector2 from:", import.meta.url)

export default class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    multiply(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
    }

    addScaledVector(v, s) {
        this.x += v.x * s
        this.y += v.y * s
        return this
    }

    subScaledVector(v, s) {
        this.x -= v.x * s
        this.y -= v.y * s
        return this
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }

    normalize() {
        const length = this.length();
        if (length === 0) return this;
        this.x /= length;
        this.y /= length;
        return this;
    }

    lerp(target, t) {
        this.x += (target.x - this.x) * t
        this.y += (target.y - this.y) * t
        return this
    }

    clone() {
        return new Vector2(this.x, this.y);
    }


    // Utilisé pour le debug
    draw(ctx, originX = 0, originY = 0, color="white") {
        // On sauvegarde le contexte pour ne pas faire des modifs involontaires
        ctx.save()

        let scale = 0.3

        // On force la couleur en blanc
        ctx.strokeStyle = color
        ctx.fillStyle = color

        // On a les coordonnées d'origine passées en paramètre
        // On calcule les coordonnées d'arrivée.
        const endX = originX + this.x * scale
        const endY = originY + this.y * scale

        // ligne principale
        ctx.beginPath()
        ctx.moveTo(originX, originY)    // On commence à l'origine
        ctx.lineTo(endX, endY)          // On trace une ligne vers l'arrivée. 
        ctx.stroke()                    // On applique la ligne. 

        // direction normalisée
        const dir = new Vector2(this.x, this.y).normalize()
        // On calcule la perpendiculaire (base du triangle de la flèche)
        const perp = new Vector2(-dir.y, dir.x)

        const size = 10

        // pointe de flèche
        ctx.beginPath()
        ctx.moveTo(endX, endY)
        
        ctx.lineTo(
            endX - dir.x * size + perp.x * size * 0.5,
            endY - dir.y * size + perp.y * size * 0.5
        )
        ctx.lineTo(
            endX - dir.x * size - perp.x * size * 0.5,
            endY - dir.y * size - perp.y * size * 0.5
        )
        ctx.closePath()
        ctx.fill()

        ctx.restore()
    }

    drawPoint(ctx, color="white") {
        ctx.save()

        ctx.beginPath()
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()

        ctx.restore()
    }
}