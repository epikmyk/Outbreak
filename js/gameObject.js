export default class GameObject {
    constructor(img, x, y, width, height) {
        this.width = width;
        this.height = height;
        this.changeImage = false;

        this.originX = width / 2;
        this.originY = height / 2;
        this.radiusX = width/ 2;
        this.radiusY = height/ 2;

        this.img = new Image();
        this.img.src = (img);

        this.position = {
            x: x,
            y: y
        }
    }

    draw = (ctx) =>
    {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height)
    }

    getOriginX = () => {
        return this.position.x + this.originX;
    }

    getOriginY = () => {
        return this.position.y + this.originY;
    }

    getRadius = () => {
        return this.radiusX;
    }
}