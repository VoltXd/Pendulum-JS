class Pendulum
{
    constructor(mass, density, length, angle_t0)
    {
        this.mass = mass;
        this.density = density;
        this.length = length;
        this.angle = angle_t0;
        this.x = this.length * Math.sin(this.angle);
        this.y = -this.length *Math.cos(this.angle);
        
        this.angleSpeed = 0;
        this.radius = Math.pow(3 * mass / density / 4 / Math.PI, 1/3);
    }

    calculateNextPoint(dt)
    {
        let angleAcceleration = -GRAVITATIONNAL_ACCELERATION * Math.sin(this.angle) / this.length;
        this.angleSpeed += angleAcceleration * dt;
        this.angle += this.angleSpeed * dt;

        this.x = this.length * Math.sin(this.angle);
        this.y = -this.length * Math.cos(this.angle);
    }

    drawPendulum(context, width, height)
    {
        const size = Math.min(width, height);
        const x1 = width/2;
        const y1 = height/12;
        const x2 = x1 + this.x * size / 2.2;
        const y2 = y1 - this.y * size / 2.2;

        context.strokeStyle = "black";
        context.fillStyle = "red";
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2 - this.radius * Math.sin(this.angle) * size / 2.2, y2 - this.radius * Math.cos(this.angle) * size / 2.2);
        context.stroke();
        context.closePath();
        context.arc(x2, y2, this.radius * size / 2.2, 0, 2 * Math.PI);
        context.fill();
    }
}