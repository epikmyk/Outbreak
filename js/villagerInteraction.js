import { mask, handGel } from './setupSimulation.js';
import { checkInfected, boundary } from './runSimulation.js';
import Physics from './physics.js';

let physics = new Physics();

let calculateInfectionRate = (villager1, villager2) => {
    //infection rate if wearing mask
    
    if (villager1.infected && !villager2.infected && mask.use && !handGel.use && !villager2.vaccinated) {

        villager1.infect(villager2, 0.5)
        checkInfected(villager2);
    }
    //infection rate if using hand gel
    if (villager1.infected && !villager2.infected && !mask.use && handGel.use && !villager2.vaccinated) {

        villager1.infect(villager2, .25)
        checkInfected(villager2);
    }
    //infection rate if vaccinated
    if (villager1.infected && !villager2.infected && !mask.use && !handGel.use && villager2.vaccinated) {

        villager1.infect(villager2, 0.04)
        checkInfected(villager2);
    }
    //infection rate with no protection
    if (villager1.infected && !villager2.infected && !mask.use && !handGel.use && !villager2.vaccinated) {

        villager1.infect(villager2, 1)
        checkInfected(villager2);
    }
    //infected rate if wearing mask and using hand gel
    if (villager1.infected && !villager2.infected && mask.use && handGel.use && !villager2.vaccinated) {

        villager1.infect(villager2, 0.5 * .25)
        checkInfected(villager2);
    }
    //infected rate if wearing mask and vaccinated
    if (villager1.infected && !villager2.infected && mask.use && !handGel.use && villager2.vaccinated) {

        villager1.infect(villager2, 0.5 * .04)
        checkInfected(villager2);
    }
    //infected rate if using hand gel and vaccinated
    if (villager1.infected && !villager2.infected && !mask.use && handGel.use && villager2.vaccinated) {

        villager1.infect(villager2, 0.25 * .04)
        checkInfected(villager2);
    }
    //infected rate if wearing a mask, using hand gel and vaccinated
    if (villager1.infected && !villager2.infected && mask.use && handGel.use && villager2.vaccinated) {

        villager1.infect(villager2, 0.5 * 0.25 * .04)
        checkInfected(villager2);
    }
}

export default function villagerInteraction(dt, villagers) {
    for (let i = 0; i < villagers.length; i++) {

        villagers[i].update(dt);

        for (let j = i + 1; j < villagers.length; j++) {
            if (physics.collisionDetected(villagers[i], villagers[j], 1)) {

                physics.repel(villagers[i], villagers[j]);
                physics.repel(villagers[j], villagers[i]);

                villagers[i].update(dt);
                villagers[j].update(dt);

                calculateInfectionRate(villagers[i], villagers[j]);
                calculateInfectionRate(villagers[j], villagers[i]);
            }
        }

        if (!physics.innerCollisionDetected(villagers[i], boundary)) {

            villagers[i].speed.x = -villagers[i].speed.x;
            villagers[i].speed.y = -villagers[i].speed.y;

            villagers[i].update(dt);

        }
    }
}
