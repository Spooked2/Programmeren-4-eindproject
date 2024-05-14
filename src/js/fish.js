import { Actor, Vector, Random } from "excalibur";
import { Resources } from './resources.js';

const random = new Random;

export class Fish extends Actor {
    constructor(position) {
        super();

        this.graphics.use(Resources.Fish.toSprite());

        this.scale = new Vector (0.4, 0.4);

        this.pointer.useGraphicsBounds = true;

        this.on('pointerdown', () => {this.kill()})

    }


}