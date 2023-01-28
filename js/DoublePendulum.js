class DoublePendulum
{
    constructor (m1, rho1, l1, theta1_t0, m2, rho2, l2, theta2_t0)
    {
        this.m1 = m1;
        this.rho1 = rho1;
        this.l1 = l1;
        this.theta1_t0 = theta1_t0;
        this.theta1 = theta1_t0;
        this.omega1 = 0;
        this.omega1_1 = 0;
        this.gamma1_1 = 0;
        this.x1 = this.l1 * Math.sin(theta1_t0);
        this.y1 = this.l1 * Math.cos(theta1_t0);
        this.r1 = Math.pow(3 * m1 / rho1 / 4 / Math.PI, 1/3);

        this.m2 = m2;
        this.rho2 = rho2;
        this.l2 = l2;
        this.theta2_t0 = theta2_t0;
        this.theta2 = theta2_t0;
        this.omega2 = 0;
        this.omega2_1 = 0;
        this.gamma2_1 = 0;
        this.x2 = this.l2 * Math.sin(theta2_t0);
        this.y2 = this.l2 * Math.cos(theta2_t0);
        this.r2 = Math.pow(3 * m2 / rho2 / 4 / Math.PI, 1/3);
    }

    reset()
    {
        this.theta1 = this.theta1_t0;
        this.theta2 = this.theta2_t0;
        this.omega1 = 0;
        this.omega1_1 = 0;
        this.gamma1_1 = 0;
        this.omega2 = 0;
        this.omega2_1 = 0;
        this.gamma2_1 = 0;
    }

    calculateNextPoint(dt)
    {
        let gamma1 = (-GRAVITATIONNAL_ACCELERATION * (2 * this.m1 + this.m2) * Math.sin(this.theta1) - this.m2 * GRAVITATIONNAL_ACCELERATION * Math.sin(this.theta1 - 2 * this.theta2) - 2 * Math.sin(this.theta1 - this.theta2) * this.m2 * (this.omega2 * this.omega2 * this.l2 + this.omega1 * this.omega1 * this.l1 * Math.cos(this.theta1 - this.theta2))) / (this.l1 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.theta1 - 2 * this.theta2)));
        let gamma2 = (2 * Math.sin(this.theta1 - this.theta2) * (this.omega1 * this.omega1 * this.l1 * (this.m1 + this.m2) + GRAVITATIONNAL_ACCELERATION * (this.m1 + this.m2) * Math.cos(this.theta1) + this.omega2 * this.omega2 * this.l2 * this.m2 * Math.cos(this.theta1 - this.theta2))) / (this.l2 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.theta1 - 2 * this.theta2)));

        this.omega1 += (gamma1 + this.gamma1_1) * dt / 2;
        this.omega2 += (gamma2 + this.gamma2_1) * dt / 2;

        this.theta1 += (this.omega1 + this.omega1_1) * dt / 2;
        this.theta2 += (this.omega2 + this.omega2_1) * dt / 2;

        this.x1 = this.l1 * Math.sin(this.theta1);
        this.y1 = -this.l1 * Math.cos(this.theta1);
        this.x2 = this.x1 + this.l2 * Math.sin(this.theta2);
        this.y2 = this.y1 - this.l2 * Math.cos(this.theta2);

        this.gamma1_1 = gamma1;
        this.gamma2_1 = gamma2;
        this.omega1_1 = this.omega1;
        this.omega2_1 = this.omega2;
    }

    drawPendulum(context, width, height)
    {
        const size = Math.min(width, height);
        const x1 = width/2;
        const y1 = height/2;
        const x2 = x1 + this.x1 * size / 2.2;
        const y2 = y1 - this.y1 * size / 2.2;
        const x3 = x1 + this.x2 * size / 2.2;
        const y3 = y1 - this.y2 * size / 2.2;

        context.strokeStyle = "black";
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2 - this.r1 * Math.sin(this.theta1) * size / 2.2, y2 - this.r1 * Math.cos(this.theta1) * size / 2.2);
        context.stroke();
        context.beginPath();
        context.moveTo(x2, y2);
        context.lineTo(x3 - this.r2 * Math.sin(this.theta2) * size / 2.2, y3 - this.r2 * Math.cos(this.theta2) * size / 2.2);
        context.stroke();
        context.beginPath();
        context.fillStyle = "green";
        context.arc(x2, y2, this.r1 * size / 2.2, 0, 2 * Math.PI);
        context.fill();
        context.beginPath();
        context.fillStyle = "red";
        context.arc(x3, y3, this.r2 * size / 2.2, 0, 2 * Math.PI);
        context.fill();
    }
}