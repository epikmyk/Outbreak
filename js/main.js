import GameObject from './gameObject.js';
import setupSimulation, { vaccine, doctor, mask, handGel, initSetupSimulation } from './setupSimulation.js'
import runSimulation, { initRunSimulation, lastTime } from './runSimulation.js';
import showEndResults, { initEndResults } from './showEndResults.js';
import Physics from './physics.js';

const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;
let canvas = document.getElementById("gameScreen");
let ctx;

let room;
let yanomamiHut;
let yanomamiDesigns;
let smartboard;
let table;

let villagers;
let doctors;

let startSimulation;
let endSimulation;

let mouse;
let physics;

let init = () => {

    ctx = canvas.getContext("2d");

    villagers = [];
    doctors = [];

    startSimulation = false;
    endSimulation = false;

    mouse = {
        position: {
            x: 0,
            y: 0
        },
        hover: {
            x: 0,
            y: 0
        }
    }

    physics = new Physics();
    room = new GameObject("../images/room.jpg", 0, 0, 1920, 1080);
    yanomamiHut = new GameObject("../images/YanomamiHut.png", 69, 206, 323, 252);
    yanomamiDesigns = new GameObject("../images/YanomamiDesigns.png", 1495, 206, 327, 254);
    smartboard = new GameObject("../images/smartboard.png", 451, 154, 944, 647);
    table = new GameObject("../images/table.png", 0, 0, 1920, 1080);

    yanomamiHutModal.style.height = Math.floor((canvas.clientHeight / 6.5)) + "px";
    yanomamiDesignsModal.style.height = Math.floor((canvas.clientHeight / 6.5)) + "px";
    initSetupSimulation();
    initRunSimulation();
    initEndResults();

    simulationLoop();
}

let yanomamiHutModal = document.getElementById("yanomamiHutModal");
let yanomamiHutSpan = document.getElementsByClassName("close")[0];
yanomamiHutModal.style.display = "none";
yanomamiHutSpan.onclick = function () {

    yanomamiHutModal.style.display = "none";
}

let yanomamiDesignsModal = document.getElementById("yanomamiDesignsModal");
let yanomamiDesignsSpan = document.getElementsByClassName("close")[1];
yanomamiDesignsModal.style.display = "none";
yanomamiDesignsSpan.onclick = function () {

    yanomamiDesignsModal.style.display = "none";
}

//Start Main Loop
let simulationLoop = (timestamp) => {
    
    let dt = (timestamp - lastTime)
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    yanomamiHutModal.style.height = Math.floor((canvas.clientHeight / 6.5)) + "px";
    yanomamiDesignsModal.style.height = Math.floor((canvas.clientHeight / 6.5)) + "px";

    smartboard.draw(ctx);
    clickPainting(yanomamiHut, yanomamiHutModal)
    clickPainting(yanomamiDesigns, yanomamiDesignsModal)
    
    //Set up simulation
    if (!startSimulation && !endSimulation) {
        setupSimulation(doctors, villagers, startSimulation);
    }
    //Start Simulation
    else if (startSimulation && !endSimulation) {
        runSimulation(timestamp, dt, doctors, villagers);
    }
    //end simulation
    else if (endSimulation) {
        showEndResults(doctors, villagers);
    }

    yanomamiHut.draw(ctx);
    yanomamiDesigns.draw(ctx);
    table.draw(ctx);
    mask.draw(ctx);
    handGel.draw(ctx);
    vaccine.draw(ctx);
    doctor.draw(ctx);

    requestAnimationFrame(simulationLoop);
}

init();

canvas.addEventListener("click", function (event) {
    let rect = canvas.getBoundingClientRect();
    mouse.position.x = (event.clientX - rect.left) * (SCREEN_WIDTH / canvas.clientWidth);
    mouse.position.y = (event.clientY - rect.top) * (SCREEN_HEIGHT / canvas.clientHeight);
})


canvas.addEventListener("mousemove", function(event) {
    let rect = canvas.getBoundingClientRect();
    mouse.hover.x = (event.clientX - rect.left) * (SCREEN_WIDTH / canvas.clientWidth);
    mouse.hover.y = (event.clientY - rect.top) * (SCREEN_HEIGHT / canvas.clientHeight);
})

function clickPainting(painting, modal) {
    if (physics.clickCollisionDetected(painting, mouse)) {
        if (modal.style.display == "none") {
            modal.style.display = "block";
        }
        else {
            modal.style.display = "none"
        }

        resetMousePosition();
    }
}


let resetMousePosition = () => {
    mouse.position.x = 0;
    mouse.position.y = 0;
}

let resetSimulation = () => {

    startSimulation = true;
    endSimulation = false;
    resetMousePosition();
}

let setStartSimulation = (start) => {
    startSimulation = start;
}

let setEndSimulation = (end) => {
    endSimulation = end;
}

export { villagers, doctors, mouse, smartboard, yanomamiDesigns, yanomamiHut };

export { setStartSimulation, setEndSimulation, resetMousePosition, resetSimulation, init };



