import {Vector, Random, CollisionType} from "excalibur";
import {Resources} from './resources.js';
import {Enemy} from "./enemy.js";

const random = new Random;

export class Fish extends Enemy {

    constructor() {
        super(Resources.Fish.width, Resources.Fish.height);

        this.graphics.use(Resources.Fish.toSprite());

        this.scale = new Vector(0.4, 0.4);
    }

    onInitialize(engine) {
        this.initializeSuper(engine);

        this.health = 75;
        this.speed = 60;

    }


}