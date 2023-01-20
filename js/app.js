let pendulum1 = new DoublePendulum(1, 7860, 0.5, Math.PI * 3 / 4, 1, 7860, 0.5, Math.PI * 3 / 4);
let pendulum2 = new DoublePendulum(1, 7860, 0.5, Math.PI * 3 / 4, 1, 7860, 0.5, 1e-9 + Math.PI * 3 / 4);

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
    pendulum1.calculateNextPoint(dt);
    pendulum2.calculateNextPoint(dt);
}

function draw()
{
    ctx.clearRect(0, 0, width, height);
    pendulum1.drawPendulum(ctx, width, height);
    pendulum2.drawPendulum(ctx, width, height);
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
