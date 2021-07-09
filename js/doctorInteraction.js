import { curePatient, boundary } from './runSimulation.js';
import Physics from './physics.js';

let physics = new Physics();

export default function doctorInteraction(dt, doctors, villagers) {
    for (let i = 0; i < doctors.length; i++) {
        doctors[i].update(dt);

        //if doctor collides with another doctor change directions
        for (let j = i + 1; j < doctors.length; j++) {
            if (physics.collisionDetected(doctors[i], doctors[j], 1)) {

                physics.repel(doctors[i], doctors[j]);
                physics.repel(doctors[j], doctors[i]);

                doctors[i].update(dt);
                doctors[j].update(dt);
            }
        }

        //if doctor collides with a villager change directions
        for (let k = 0; k < villagers.length; k++) {
            if (physics.collisionDetected(doctors[i], villagers[k], 1)) {

                physics.repel(doctors[i], villagers[k]);
                physics.repel(villagers[k], doctors[i]);

                doctors[i].update(dt);
                villagers[k].update(dt);

                if (villagers[k].infected && !doctors[i].curedPatient) {
                    curePatient(villagers[k], doctors[i]);
                }
            }
        }

        if(!physics.innerCollisionDetected(doctors[i], boundary)) {

            doctors[i].speed.x = -doctors[i].speed.x;
            doctors[i].speed.y = -doctors[i].speed.y;

            doctors[i].update(dt);
        }
    }
}

