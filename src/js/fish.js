import {Actor, Vector, Random, CollisionType} from "excalibur";
import { Resources } from './resources.js';

const random = new Random;

export class Fish extends Actor {
    constructor() {
        super({
            width: Resources.Fish.width,
            height: Resources.Fish.height,
            collisionType: CollisionType.Active
        });

        this.graphics.use(Resources.Fish.toSprite());

        this.scale = new Vector (0.4, 0.4);

        this.on('pointerdown', () => {this.kill()});

        this.on('collisionstart', () => {this.collisionHandler})

    }

    onInitialize(engine) {


    }

    collisionHandler() {




    }


}