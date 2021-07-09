export default class Text {
    constructor(ctx, size, color, text, x, y) {
        
        this.color = color;
        this.text = text;
        this.position = {
            x: x,
            y: y
        }
        this.size = size;
        this.width = ctx.measureText(text).width;
    }

    draw = (ctx, text) =>
    {
        ctx.fillStyle = this.color;
        ctx.font =  this.size + " BCTEXT"
        ctx.fillText(text, this.position.x, this.position.y);
    }

    updateWidth = (ctx, text) => {
        this.width = ctx.measureText(this.text + text).width;
    }

}