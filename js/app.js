const canvasSP = document.querySelector("#canvasSimplePendulum");
const ctxSP = canvasSP.getContext("2d");
const widthSP = canvasSP.width;
const heightSP = canvasSP.height;

const canvasDP = document.querySelector("#canvasDoublePendulum");
const ctxDP = canvasDP.getContext("2d");
const widthDP = canvasDP.width;
const heightDP = canvasDP.height; 

const canvasDPF = document.querySelector("#canvasDoublePendulumFractal");
const ctxDPF = canvasDPF.getContext("2d");
const widthDPF = canvasDPF.width;
const heightDPF = canvasDPF.height; 

const entropyParagraph = document.querySelector("#entropyParagraph");
const delayParagraph = document.querySelector("#delayParagraph");

let pendulum = new Pendulum(1, 7860, 1, Math.PI / 2);

let doublePendulum1 = new DoublePendulum(1, 7860, 0.5, Math.PI * 3 / 4, 1, 7860, 0.5, Math.PI * 3 / 4);
let doublePendulum2 = new DoublePendulum(1, 7860, 0.5, Math.PI * 3 / 4, 1, 7860, 0.5, 1e-9 + Math.PI * 3 / 4);
let doublePendulum3 = new DoublePendulum(1, 7860, 0.5, Math.PI * 3 / 4, 1, 7860, 0.5, 2e-9 + Math.PI * 3 / 4);
let doublePendulum4 = new DoublePendulum(1, 7860, 0.5, Math.PI * 3 / 4, 1, 7860, 0.5, 3e-9 + Math.PI * 3 / 4);

let doublePendulumFractal = new DoublePendulumFractal(widthDPF, heightDPF, 5);

let previousTimestamp = null;

const pendulumsBlock = document.querySelector("#pendulums");
const fractalBlock = document.querySelector("#fractal");

let mode = "pendulums"
fractalBlock.hidden = true;
pendulumsBlock.hidden = false;

function pendulumRadioChanged(button)
{
    mode = button.value;
    previousTimestamp = performance.now();

    if (mode == "pendulums")
    {
        pendulum.reset();
        doublePendulum1.reset();
        doublePendulum2.reset();
        doublePendulum3.reset();
        doublePendulum4.reset();

        fractalBlock.hidden = true;
        pendulumsBlock.hidden = false;
    }
    else if (mode == "fractal")
    {
        doublePendulumFractal.reset();
        
        pendulumsBlock.hidden = true;
        fractalBlock.hidden = false;
    }
}

function update(dt)
{
    if (mode == "pendulums")
    {
        doublePendulum1.calculateNextPoint(dt);
        doublePendulum2.calculateNextPoint(dt);
        doublePendulum3.calculateNextPoint(dt);
        doublePendulum4.calculateNextPoint(dt);
        pendulum.calculateNextPoint(dt);
    }
    else if (mode == "fractal")
    {
        doublePendulumFractal.nextStep(delayParagraph, 5e-3);
    }
}

function draw()
{
    if (mode == "pendulums")
    {
        ctxDP.clearRect(0, 0, widthDP, heightDP);
        doublePendulum1.drawPendulum(ctxDP, widthDP, heightDP);
        doublePendulum2.drawPendulum(ctxDP, widthDP, heightDP);
        doublePendulum3.drawPendulum(ctxDP, widthDP, heightDP);
        doublePendulum4.drawPendulum(ctxDP, widthDP, heightDP);
        
        ctxSP.clearRect(0, 0, widthSP, heightSP);
        pendulum.drawPendulum(ctxSP, widthSP, heightSP);
    }
    else if (mode == "fractal")
    {
        ctxDPF.clearRect(0, 0, widthDPF, heightDPF);
        doublePendulumFractal.drawFractal(ctxDPF, widthDPF, heightDPF);
        doublePendulumFractal.updateEntropy(entropyParagraph, widthDPF, heightDPF);
    }
}

function loop(timestamp)
{
    if (!previousTimestamp)
        previousTimestamp = timestamp;
    let dt = (timestamp - previousTimestamp) * 1e-3;
    
    update(dt);
    draw();

    previousTimestamp = timestamp;
    window.requestAnimationFrame(loop);
}

addEventListener("visibilitychange", () => {
    previousTimestamp = performance.now();
});

window.requestAnimationFrame(loop);
