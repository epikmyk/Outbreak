export default class Physics {
    constructor() { }

    collisionDetected = (object1, object2, ratio) => {
        if (Math.sqrt(Math.pow(object1.getOriginX() - object2.getOriginX(), 2)
            + Math.pow(object1.getOriginY() - object2.getOriginY(), 2)) >=
            object1.getRadius() * ratio + object2.getRadius() * ratio) {

            return false;
        }
        return true;
    }

    innerCollisionDetected = (object1, object2) => {

        if (((Math.pow((object1.getOriginX() - object1.getRadius() - object2.getOriginX()), 2) / Math.pow((object2.radiusX - object1.radius), 2)) +
            (Math.pow((object1.getOriginY() - object1.getRadius() - object2.getOriginY()), 2) / Math.pow((object2.radiusY - object1.radius), 2)) > 1)) {

            return false;
        }
        return true;
    }


    clickCollisionDetected = (object, mouse) => {
        if (mouse.position.x > object.position.x && mouse.position.x < object.position.x + object.width
            && mouse.position.y > object.position.y && mouse.position.y < object.position.y + object.height) {
            return true;
        }
        return false;
    }

    
    hoverCollisionDetected = (object, mouse) => {
        if (mouse.hover.x > object.position.x && mouse.hover.x < object.position.x + object.width
            && mouse.hover.y > object.position.y && mouse.hover.y < object.position.y + object.height) {
            return true;
        }
        return false;
    }

    offscreenCollisionDetected = (object, screen) => {
        if (object.position.x < screen.position.x + 30 || object.position.x > screen.position.x + screen.width - 30
            || object.position.y < screen.position.y + 200 || object.position.y > screen.position.y + screen.height - 50) {
            return true;
        }
        return false;
    }

    repel = (object1, object2) => {
        if (object1.speed.x > 0 && (object1.position.x + object1.radius * 2) < (object2.position.x + object2.radius)) {
            object1.speed.x = -object1.maxSpeed;
        }
        else if (object1.speed.x > 0 && (object1.position.x) > (object2.position.x + object2.radius)) {
            object1.speed.x = object1.maxSpeed;
        }
        else if (object1.speed.x < 0 && (object1.position.x + object1.radius * 2) < (object2.position.x + object2.radius)) {
            object1.speed.x = -object1.maxSpeed;
        }
        else if (object1.speed.x < 0 && (object1.position.x) > (object2.position.x + object2.radius)) {
            object1.speed.x = object1.maxSpeed;
        }

        if (object1.speed.y > 0 && (object1.position.y + object1.radius * 2) < (object2.position.y + object2.radius)) {
            object1.speed.y = -object1.maxSpeed;
        }
        else if (object1.speed.y > 0 && (object1.position.y) > (object2.position.y + object2.radius)) {
            object1.speed.y = object1.maxSpeed;
        }
        else if (object1.speed.y < 0 && (object1.position.y + object1.radius * 2) < (object2.position.y + object2.radius)) {
            object1.speed.y = -object1.maxSpeed;
        }
        else if (object1.speed.y < 0 && (object1.position.y) > (object2.position.y + object2.radius)) {
            object1.speed.y = object1.maxSpeed;
        }
    }
}