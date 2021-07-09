import GameObject from "./gameObject.js";

export default class Item extends GameObject {
    constructor(img, x, y, width, height, cost) {

        super(img, x, y, width, height, cost) 
      
        this.num = 0;
        this.cost = cost;
        this.prevCost = 0;
        this.currentCost = 0;
        this.use = false;
    }
}