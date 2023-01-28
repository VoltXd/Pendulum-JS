class DoublePendulumFractal
{
    constructor(width, height, divider)
    {
        this.doublePendulums = [];
        this.startAngle = - Math.PI;
        this.divider = divider;
        const step1 = 2.0 * Math.PI / width * divider;
        const step2 = 2.0 * Math.PI / height * divider;
        let angle1 = this.startAngle;
        let angle2 = this.startAngle;
        for (let i = 0; i < width / divider; i++)
        {
            for (let j = 0; j < height / divider; j++)
            {
                this.doublePendulums.push(new DoublePendulum(1, 7860, 0.5, angle1, 1, 7860, 0.5, angle2));
                angle2 += step2;
            }
            angle2 = this.startAngle;
            angle1 += step1;
        }
        this.numberOfPendulum = width * height / divider / divider;
    }

    reset()
    {
        for (let i = 0; i < this.numberOfPendulum; i++)
            this.doublePendulums[i].reset();
    }

    nextStep(delayParagraph, dt) 
    {
        delayParagraph.innerHTML = dt.toPrecision(3);
        for (const doublePendulum of this.doublePendulums)
        {
            doublePendulum.calculateNextPoint(dt);
        }
    }

    drawFractal(context, width, height)
    {
        for (let i = 0; i < width / this.divider; i++)
        {
            for (let j = 0; j < height / this.divider; j++)
            {
                const theta1 = this.doublePendulums[j + i * height / this.divider].theta1;
                const theta2 = -this.doublePendulums[j + i * height / this.divider].theta2;
                const hue = Math.round((theta1 - this.startAngle) * RAD_TO_DEG);
                const saturation = Math.round(100.0 * (theta2 - this.startAngle) / (-2 * this.startAngle));
                context.fillStyle = "hsl(" + hue.toString() + "," + saturation.toString() + "%,50%)";
                context.fillRect(i * this.divider, j * this.divider, this.divider, this.divider);
            } 
        }
    }

    updateEntropy(textBlock, width, height)
    {
        this.hist = new Array(361);
        for (let i = 0; i < 361; i++)
            this.hist[i] = new Array(101).fill(0);
     
        const numberOfPoint = width * height / this.divider / this.divider;
        for (let i = 0; i < width / this.divider; i++)
        {
            for (let j = 0; j < height / this.divider; j++)
            {
                const theta1 = this.doublePendulums[j + i * height / this.divider].theta1;
                const theta2 = this.doublePendulums[j + i * height / this.divider].theta2;
                const hue = Math.max(Math.min(Math.round((theta1 - this.startAngle) * RAD_TO_DEG), 100), 0);
                const saturation = Math.round(100.0 * (theta2 - this.startAngle) / (-2 * this.startAngle));

                this.hist[hue][saturation]++;
            } 
        }

        let entropy = 0;
        for (let i = 0; i < 361; i++)
        {
            for (let j = 0; j < 101; j++)
            {
                if (this.hist[i][j] != 0)
                {
                    entropy -= Math.log2(this.hist[i][j] / numberOfPoint) * this.hist[i][j];
                }
            }
        }
        entropy /= numberOfPoint;

        textBlock.innerHTML = entropy.toPrecision(3);
    }
}