import {Vector, Random, CollisionType} from "excalibur";
import {animate, Resources} from './resources.js';
import {Enemy} from "./enemy.js";

const random = new Random;

export class Caterpillar extends Enemy {

    caterpillarWalk;
    constructor(spawnPosition) {
        super(Resources.Knight.width, Resources.Knight.height);

        this.caterpillarWalk = animate(Resources.CaterpillarWalk, 2, 1, 500);


        this.graphics.use(this.caterpillarWalk);

        this.scale = new Vector(0.5, 0.5);
        this.pos = spawnPosition;
    }

    onInitialize(engine) {
        this.initializeSuper(engine);

        this.health = 100;
        this.speed = 40;

    }


}