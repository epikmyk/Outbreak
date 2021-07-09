export default class Doctor {
    constructor(x, y, width) {
        this.curedPatient = false;
        this.position = {
            x: x,
            y: y
        }
        this.width = width;
        this.maxSpeed = 1;
        this.speed = {
            x: Math.random() < 0.5 ? -1 : 1,
            y: Math.random() < 0.5 ? -1 : 1
        }

        this.originX = 10;
        this.originY = 10;
        this.radius = 10
    }

    draw = (ctx) => {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
    }

    getOriginX = () => {
        return this.position.x + this.originX;
    }

    getOriginY = () => {
        return this.position.y + this.originY;
    }

    getRadius = () => {
        return this.radius;
    }

    update = (dt) => {
        if (!dt) return;

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }
}