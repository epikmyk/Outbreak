import { smartboard, mouse, resetMousePosition, setStartSimulation, yanomamiHut, yanomamiDesigns } from './main.js';
import Item from './item.js';
import Doctor from './doctor.js';
import Villager from './villager.js';
import GameObject from './gameObject.js';
import Text from './text.js';
import Physics from './physics.js';

let doctorStartingPositionX;
let doctorStartingPositionY;

let villagerStartingPositionX;
let villagerStartingPositionY;
let numOfVillagers;
let randomVillager;

let doctor;
let vaccine;
let mask;
let handGel;

let smartboardVaccine;
let smartboardDoctor;
let smartboardMask;
let smartboardHandGel;

let totalCost;

let startButton;
let displayTotalCost;

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let physics = new Physics();

let initSetupSimulation = () => {

    totalCost = 0;
    numOfVillagers = 40;

    startButton = new GameObject("../images/StartText.png", smartboard.position.x + 300, 581, 328, 78);
    displayTotalCost = new Text(ctx, "48px", "#1478be", "Total Cost: $", smartboard.position.x + 320, smartboard.position.y + 80);

    mask = new Item("../images/mask.png", 1585, 673, 147, 105, 750);
    smartboardMask = new GameObject("../images/mask.png", smartboard.position.x + 500, smartboard.position.y + 130, 147, 105);

    handGel = new Item("../images/handgel.png", 1750, 584, 88, 191, 1000);
    smartboardHandGel = new GameObject("../images/handgel.png", smartboard.position.x + 750, smartboard.position.y + 50, 88, 191);

    vaccine = new Item("../images/vaccine.png", 1395, 652, 33, 98, 120);
    smartboardVaccine = new GameObject("../images/vaccine.png", smartboard.position.x + 150, smartboard.position.y + 110, 33, 98);

    doctor = new Item("../images/doctor.png", 1461, 674, 118, 75, 1600);
    smartboardDoctor = new GameObject("../images/doctor.png", smartboard.position.x + 300, smartboard.position.y + 130, 118, 75);
}

let changeCursor = () => {
    if (physics.hoverCollisionDetected(vaccine, mouse) || physics.hoverCollisionDetected(doctor, mouse) ||
        physics.hoverCollisionDetected(mask, mouse) || physics.hoverCollisionDetected(handGel, mouse) ||
        physics.hoverCollisionDetected(startButton, mouse) || physics.hoverCollisionDetected(yanomamiDesigns, mouse) || 
        physics.hoverCollisionDetected(yanomamiHut, mouse)) {
        document.body.style.cursor = "pointer";
    }
    else {
        document.body.style.cursor = "default";
    }
}

let createInput = (inputId, inputWrap) => {
    let input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.value = "0";
    input.max = "40";
    input.id = inputId;
    let wrap = document.getElementById(inputWrap);
    wrap.appendChild(input);
}

let updateCost = (item) => {
    item.prevCost = item.num * item.cost;
    if (item.currentCost != item.prevCost) {
        totalCost -= item.currentCost;
        item.currentCost = item.prevCost;
        totalCost += item.currentCost;
    }
}

let updateInputValue = (inputId, item) => {
    let value = document.getElementById(inputId).value;
    if (value >= 0 && value <= 40) {
        item.num = value;
        updateCost(item);
    }
}

let setStartingPosition = (Object, objects, numOfObject, startingPositionX, startingPositionY) => {
    for (let i = 0; i < numOfObject; i++) {
        objects.push(new Object(startingPositionX, startingPositionY));

        if (i % 10 == 9) {
            startingPositionX = smartboard.position.x + 300;
            startingPositionY += 60;
        }
        else {
            startingPositionX += 35;
        }
    }
}

//set up simulation
export default function setupSimulation(doctors, villagers) {

    startButton.draw(ctx);
    displayTotalCost.draw(ctx, "Total Cost: $" + totalCost);

    changeCursor();

    if (totalCost > 10000) {
        displayTotalCost.color = "red";
    }
    else {
        displayTotalCost.color = "#1478be"
    }

    //if start simulation is clicked
    if (physics.clickCollisionDetected(startButton, mouse)) {

        //console.log("START" + doctor.qauntity)
        doctorStartingPositionX = smartboard.position.x + 300;
        doctorStartingPositionY = smartboard.position.y + 170;
        setStartingPosition(Doctor, doctors, doctor.num, doctorStartingPositionX, doctorStartingPositionY);

        villagerStartingPositionX = smartboard.position.x + 300;
        villagerStartingPositionY = smartboard.position.y + 260;
        if (villagers.length < numOfVillagers) {

            setStartingPosition(Villager, villagers, numOfVillagers, villagerStartingPositionX, villagerStartingPositionY);

            //create one sick villager
            randomVillager = Math.floor(Math.random() * ((numOfVillagers - 1) - 30 + 1)) + 30;
            villagers[randomVillager].infected = true;

            //vaccinate x number of villagers
            for (let i = 0; i < vaccine.num; i++) {
                randomVillager = Math.floor(Math.random() * (numOfVillagers) - 0)
                if (!villagers[randomVillager].vaccinated) {
                    villagers[randomVillager].vaccinated = true;
                }
                else {
                    i--;
                }
            }
        }

        if ((mask.use || (doctor.use && doctor.num > 0) || handGel.use || (vaccine.use && vaccine.num > 0))) {
            setStartSimulation(true);
        }
        resetMousePosition();
    }

    //check if vaccine is clicked
    if (physics.clickCollisionDetected(vaccine, mouse)) {

        if (!vaccine.use) {
            vaccine.use = true;
        }
        else {
            vaccine.use = false;
            totalCost -= vaccine.currentCost;
            vaccine.currentCost = 0;
        }
        resetMousePosition();
    }

    //check if doctor is clicked
    if (physics.clickCollisionDetected(doctor, mouse)) {

        if (!doctor.use) {
            doctor.use = true;
        }
        else {
            doctor.use = false;
            totalCost -= doctor.currentCost;
            doctor.currentCost = 0;
        }
        resetMousePosition();
    }

    //check if mask is clicked
    if (physics.clickCollisionDetected(mask, mouse)) {

        if (!mask.use) {
            mask.use = true;
            totalCost += mask.cost;
        }
        else {
            mask.use = false;
            totalCost -= mask.cost;
        }
        resetMousePosition();
    }

    //check if handgel is clicked
    if (physics.clickCollisionDetected(handGel, mouse)) {

        if (!handGel.use) {
            handGel.use = true;
            totalCost += handGel.cost;
        }
        else {
            handGel.use = false;
            totalCost -= handGel.cost;
        }
        resetMousePosition();
    }

    if (mask.use) {
        smartboardMask.draw(ctx);
    }
    if (handGel.use) {
        smartboardHandGel.draw(ctx);
    }
    if (vaccine.use) {
        smartboardVaccine.draw(ctx);

        if (!document.getElementById("numOfVaccinations")) {
            createInput("numOfVaccinations", "vaccineWrap");
        }
        else {
            updateInputValue("numOfVaccinations", vaccine);
        }
    }
    else if (document.getElementById("numOfVaccinations")) {
        document.getElementById("numOfVaccinations").remove();
        vaccine.num = 0;
    }

    if (doctor.use) {
        smartboardDoctor.draw(ctx);

        if (!document.getElementById("numOfDoctors")) {
            createInput("numOfDoctors", "doctorWrap");
        }
        else {
            updateInputValue("numOfDoctors", doctor);
        }
    }
    else if (document.getElementById("numOfDoctors")) {
        document.getElementById("numOfDoctors").remove();
        doctor.num = 0;
    }
}

export { vaccine, doctor, mask, handGel, totalCost, numOfVillagers, startButton };
export { initSetupSimulation, setStartingPosition };
