import { smartboard, setStartSimulation, setEndSimulation, yanomamiDesigns, yanomamiHut, mouse } from './main.js';
import { numOfVillagers, doctor } from './setupSimulation.js'
import Physics from './physics.js';
import villagerInteraction from './villagerInteraction.js';
import doctorInteraction from './doctorInteraction.js';
import Text from './text.js';
import GameObject from './gameObject.js';

const FPS = 60;
const FPS_INTERVAL = 1000 / FPS;

let simulationCount;

let infected;
let totalInfected;
let totalPercentageInfected;

let days;
let daysPassed;
let counter;
let lastTime;

let displayDaysPassed;
let displayInfected;
let displayTotalInfected;

let infoBar;
let boundary;
let planPassed;

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
let physics = new Physics();

let initRunSimulation = () => {

    simulationCount = 0;

    infected = 1;
    totalInfected = 1;
    totalPercentageInfected = 0;

    days = 30;
    daysPassed = 0;
    counter = 0;
    lastTime = 0;
    planPassed = 0;

    boundary = new GameObject("../images/boundary.png", 595, 270, 651, 470);
    infoBar = new GameObject("../images/InfoBar.png", 477, 182, 891, 74);
    displayDaysPassed = new Text(ctx, "48px", "#1478be", "Day: ", 574, smartboard.position.y + 80);
    displayInfected = new Text(ctx, "48px", "#1478be", "Infected: ", 760, smartboard.position.y + 80);
    displayTotalInfected = new Text(ctx, "48px", "#1478be", "Total Infected: " + totalInfected, 1007, smartboard.position.y + 80);
}

let changeCursor = () => {
    if (physics.hoverCollisionDetected(yanomamiDesigns, mouse) || physics.hoverCollisionDetected(yanomamiHut, mouse)) {
        document.body.style.cursor = "pointer";
    }
    else {
        document.body.style.cursor = "default";
    }
}

let resetInfoBarStats = () => {
    daysPassed = 0;
    infected = 1;
    totalInfected = 1;
}

let curePatient = (villagers, doctors) => {
    villagers.infected = false;
    doctors.curedPatient = true;
    totalInfected--;
}

let checkInfected = (villager) => {
    if (villager.infected) {
        infected++;
        totalInfected++;
    }
}

export default function runSimulation(timestamp, dt, doctors, villagers) {

    changeCursor();

    if (document.getElementById("numOfVaccinations")) {
        document.getElementById("numOfVaccinations").remove();
    }
    if (document.getElementById("numOfDoctors")) {
        document.getElementById("numOfDoctors").remove();
    }

    if (dt > FPS_INTERVAL) {
        lastTime = timestamp - (dt % FPS_INTERVAL);


        counter++
        //update every second
        if (counter % FPS == 0 && daysPassed < days) {
            daysPassed++;
            infected = 0;
            //cured = 0;
            for (let i in doctors) {
                doctors[i].curedPatient = false;
            }
        }

        if (daysPassed < 30) {
            doctorInteraction(dt, doctors, villagers);
            villagerInteraction(dt, villagers);
        }
        else {
            if (totalPercentageInfected <= 25) {
                planPassed++;
            }
            totalPercentageInfected = (totalInfected / numOfVillagers) * 100;
            simulationCount++;

            setStartSimulation(false);
            setEndSimulation(true);
        }
    }

    infoBar.draw(ctx);
    displayDaysPassed.draw(ctx, "Day " + daysPassed);
    displayInfected.draw(ctx, "Infected:  " + infected);
    displayTotalInfected.draw(ctx, "Total Infected: " + totalInfected);

    boundary.draw(ctx);
    for (let i in villagers) {
        villagers[i].draw(ctx);
    }
    for (let i in doctors) {
        doctors[i].draw(ctx);
    }
}

export { totalInfected, totalPercentageInfected, simulationCount, lastTime, boundary, planPassed, doctor };
export { initRunSimulation, curePatient, checkInfected, resetInfoBarStats };