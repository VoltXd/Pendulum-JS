let pendulum = new Pendulum(1, 7860, 1, Math.PI / 2);

let previousTimestamp = null;
let x = 0;
let y = 0;
const xSpeed = 0.1;

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height; 

ctx.fillStyle = "red";

function update(dt)
{
    pendulum.calculateNextPoint(dt);
}

function draw()
{
    ctx.clearRect(0, 0, width, height);
    pendulum.drawPendulum(ctx, width, height);
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
