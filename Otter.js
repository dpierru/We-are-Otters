import Circle from "./Circle.js"

export default class Otter {

    constructor(x, y, renderer) {
        this.renderer = renderer
        this.speed = 2

        this.body = []
        this.body.push(new Circle(x, y, 30, 'rgba(255, 255, 255, 1)'))
        this.body.push(new Circle(x, y, 50, 'rgb(255, 255, 255)', this.body[0]))
        this.body.push(new Circle(x, y, 40, 'rgb(255, 255, 255)', this.body[1]))
        this.body.push(new Circle(x, y, 30, 'rgb(255, 255, 255)', this.body[2]))
        this.body.push(new Circle(x, y, 20, 'rgb(255, 255, 255)', this.body[3]))
        this.body.push(new Circle(x, y, 10, 'rgb(255, 255, 255)', this.body[4]))


        this.targetX = x
        this.targetY = y


        this.vx = 0;
        this.vy = 0;

        this.maxSpeed = 2;
        this.maxForce = 0.1;
    }

    getX() {
        return this.body[0].x        
    }

    getY() {
        return this.body[0].y
    }

    setX(x) {
        this.body[0].x = x
    }

    setY(y) {
        this.body[0].y = y
    }

    addX(x) {
        this.body[0].x += x
    }

    addY(y) {
        this.body[0].y += y
    }

    moveOtter() {
        let dx = this.targetX - this.getX()
        let dy = this.targetY - this.getY()
        
        let dist = Math.sqrt(dx * dx + dy * dy)

        if (dist > this.speed * 4) { // seuil pour éviter jitter
            dx /= dist;
            dy /= dist;

            this.addX(dx * this.speed)
            this.addY(dy * this.speed)

            for (let circle of this.body) {
                circle.calculateNewCoordinate()
            }
            
        } else {
            this.calculateNewTarget()
        }
    }

    calculateNewTarget() {
        ({ x: this.targetX, y: this.targetY } = this.renderer.getRandomPoint());
        console.log("new target", this.targetX, this.targetY)
        
    }

    draw() {
        //console.log(this.x, this.y)
        for (let circle of this.body) {
            this.renderer.drawCircle(circle.x, circle.y, circle.radius, circle.color)
        }

        
    }
}