import { smartboard, resetSimulation, init, mouse, yanomamiDesigns, yanomamiHut } from './main.js';
import { numOfVillagers, totalCost, doctor, vaccine, mask, handGel } from './setupSimulation.js';
import { totalInfected, resetInfoBarStats, simulationCount, planPassed } from './runSimulation.js';
import Physics from './physics.js';
import Text from './text.js';
import GameObject from './gameObject.js';

let doctorStartingPositionX;
let doctorStartingPositionY;
let villagerStartingPositionX;
let villagerStartingPositionY;

let restartButton;
let clearDataButton;

let displaySimulationCount;
let displayTotalCostResults;
let displayTotalInfectedResults;

let displayUseMask;
let displayUseHandGel;
let displayNumOfVaccines;
let displayNumOfDoctors;

let displayCongratulations;
let displayFailed;

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let physics = new Physics();

let initEndResults = () => {

    restartButton = new GameObject("../images/StartNextSimulation.png", 575, 581, 353, 93);
    clearDataButton = new GameObject("../images/ClearData.png", 953, 581, 353, 93);

    displaySimulationCount = new Text(ctx, "66px", "#1478be", "Simulation #", 700, 255);

    displayCongratulations = new Text(ctx, "66px", "#1478be", "Congratulations! Your plan was a success!", 505, 600);
    displayFailed = new Text(ctx, "66px", "#1478be", "Your plan was unsucessful.", 600, 600);

    displayTotalCostResults = new Text(ctx, "48px", "#424242", "Total Cost: $", 959, 395);
    displayTotalInfectedResults = new Text(ctx, "48px", "#424242", "Total Infected: ", 959, 455);

    displayUseMask = new Text(ctx, "48px", "#1478be", "Used Masks", 605, 335);
    displayUseHandGel = new Text(ctx, "48px", "#1478be", "Used Hand Gel ", 605, 395);
    displayNumOfDoctors = new Text(ctx, "48px", "#1478be", "Doctors Used: ", 605, 455);
    displayNumOfVaccines = new Text(ctx, "48px", "#1478be", "Vaccines Used: ", 605, 515);
}

let drawLine = () => {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(690, 270);
    ctx.lineTo(1145, 270);
    ctx.stroke();
}

let changeCursor = () => {
    if (physics.hoverCollisionDetected(restartButton, mouse) || physics.hoverCollisionDetected(clearDataButton, mouse) ||
        physics.hoverCollisionDetected(yanomamiHut, mouse) || physics.hoverCollisionDetected(yanomamiDesigns, mouse)) {
        document.body.style.cursor = "pointer";
    }
    else {
        document.body.style.cursor = "default";
    }
}

export default function showEndResults(doctors, villagers) {

    for (let i in villagers) {
        villagers[i].speed.x = 0;
        villagers[i].speed.y = 0;
    }

    displaySimulationCount.draw(ctx, "Simulation #" + simulationCount + " Results");
    drawLine();
    displayTotalCostResults.draw(ctx, "Total Cost: $" + totalCost);

    if (mask.use) {
        displayUseMask.draw(ctx, "Masks: Yes");
    }
    else {
        displayUseMask.draw(ctx, "Masks: No");
    }

    if (handGel.use) {
        displayUseHandGel.draw(ctx, "Hand Gel: Yes");
    }
    else {
        displayUseHandGel.draw(ctx, "Hand Gel: No");
    }

    displayNumOfDoctors.draw(ctx, "Doctors: " + doctor.num);
    displayNumOfVaccines.draw(ctx, "Vaccines: " + vaccine.num);
    displayTotalInfectedResults.draw(ctx, "Total Infected: " + totalInfected);

    if (simulationCount != 5) {

        changeCursor();

        restartButton.draw(ctx);
        clearDataButton.draw(ctx);
        if (physics.clickCollisionDetected(restartButton, mouse)) {

            doctorStartingPositionX = smartboard.position.x + 300;
            doctorStartingPositionY = smartboard.position.y + 170;

            for (let i = 0; i < doctor.num; i++) {

                doctors[i].position.x = doctorStartingPositionX;
                doctors[i].position.y = doctorStartingPositionY;

                if (i % 10 == 9) {
                    doctorStartingPositionX = smartboard.position.x + 300;
                    doctorStartingPositionY += 60;
                }
                else {
                    doctorStartingPositionX += 35;
                }

                doctors[i].speed.x = Math.random() < 0.5 ? -1 : 1;
                doctors[i].speed.y = Math.random() < 0.5 ? -1 : 1;
            }

            villagerStartingPositionX = smartboard.position.x + 300;
            villagerStartingPositionY = smartboard.position.y + 260;

            for (let i = 0; i < numOfVillagers; i++) {

                villagers[i].position.x = villagerStartingPositionX;
                villagers[i].position.y = villagerStartingPositionY;

                if (i % 10 == 9) {
                    villagerStartingPositionX = smartboard.position.x + 300;
                    villagerStartingPositionY += 60;
                }
                else {
                    villagerStartingPositionX += 35;
                }

                villagers[i].speed.x = Math.random() < 0.5 ? -1 : 1;
                villagers[i].speed.y = Math.random() < 0.5 ? -1 : 1;

                if (villagers[i].infected) {
                    villagers[i].infected = false;
                }
            }

            resetInfoBarStats();
            resetSimulation();

            let randomVillager = Math.floor(Math.random() * ((numOfVillagers - 1) - 30 + 1)) + 30;
            villagers[randomVillager].infected = true;

        }
        if (physics.clickCollisionDetected(clearDataButton, mouse)) {
            init();
        }
    }
    else if (simulationCount == 5) {

        if (physics.hoverCollisionDetected(yanomamiHut, mouse) || physics.hoverCollisionDetected(yanomamiDesigns, mouse) ||
         physics.hoverCollisionDetected(clearDataButton, mouse)) {
            document.body.style.cursor = "pointer";
        }
        else {
            document.body.style.cursor = "default";
        }

        clearDataButton.position.x = 750;
        clearDataButton.position.y = 640;
        clearDataButton.draw(ctx);

        if (planPassed >= 4) {
            displayCongratulations.draw(ctx, "Congratulations! Your plan was a success!");
        }
        else {
            displayFailed.draw(ctx, "Sorry. Your plan was unsuccessful.");
        }
        if (physics.clickCollisionDetected(clearDataButton, mouse)) {

            init();

        }
    }
}

export { totalCost, restartButton, clearDataButton };
export { initEndResults }