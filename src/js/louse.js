import {Vector, Random, CollisionType} from "excalibur";
import {animate, Resources} from './resources.js';
import {Enemy} from "./enemy.js";

const random = new Random;

export class Louse extends Enemy {

    louseWalk;

    constructor(spawnPosition) {
        super(Resources.Knight.width, Resources.Knight.height);

        this.louseWalk = animate(Resources.LouseWalk, 2, 1, 400);


        this.graphics.use(this.louseWalk);

        this.scale = new Vector(0.3, 0.3);
        this.pos = spawnPosition;
    }

    onInitialize(engine) {
        this.initializeSuper(engine);

        this.health = 25;
        this.speed = 90;

    }


}