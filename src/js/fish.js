import { Actor, Vector, Random } from "excalibur";
import { Resources } from './resources.js';

const random = new Random;

export class Fish extends Actor {
    constructor() {
        super();

        this.graphics.use(Resources.Fish.toSprite());
        this.pos = new Vector(random.integer(1, 800), random.integer(1, 600));
        this.vel = new Vector(random.integer(-20, 20), random.integer(-20, 20));

        this.pointer.useGraphicsBounds = true;

        this.on('pointerdown', () => {this.kill()})

    }


}