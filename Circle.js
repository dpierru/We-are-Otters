import Utils from "./Utils.js"

export default class Circle {
    static baseRadius = 30

    constructor(x, y, radius, color, head) {
        
        
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.head = head
        this.angle = 0
    }

    calculateNewCoordinate() {
        if (!this.head) return;

        const dx = this.head.x - this.x;
        const dy = this.head.y - this.y;

        const targetAngle = Math.atan2(dy, dx);

        const maxTurn = 0.3; // rad/frame (ajuste ici)

        this.angle = Utils.clampAngle(this.angle, targetAngle, maxTurn);

        const distance = Circle.baseRadius * 2

        this.x = this.head.x - Math.cos(this.angle) * distance;
        this.y = this.head.y - Math.sin(this.angle) * distance;
    }
}