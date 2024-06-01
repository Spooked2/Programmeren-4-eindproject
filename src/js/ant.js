import {Vector, Random, CollisionType} from "excalibur";
import {animate, Resources} from './resources.js';
import {Enemy} from "./enemy.js";

const random = new Random;

export class Ant extends Enemy {

    antWalk;
    constructor(spawnPosition) {
        super(Resources.Knight.width, Resources.Knight.height);

        this.antWalk = animate(Resources.AntWalk, 2, 1, 200);

        this.graphics.use(this.antWalk);

        this.scale = new Vector(0.4, 0.4);
        this.pos = spawnPosition;
    }

    onInitialize(engine) {
        this.initializeSuper(engine);

        this.health = 50;
        this.speed = 60;

    }


}