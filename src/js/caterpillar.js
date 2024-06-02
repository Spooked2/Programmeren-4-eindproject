import {Vector, Random} from "excalibur";
import {animate, Resources} from './resources.js';
import {Enemy} from "./enemy.js";

const random = new Random;

export class Caterpillar extends Enemy {

    caterpillarWalk;
    constructor(spawnPosition) {
        super(128, 64, 40, 160, 5);

        this.caterpillarWalk = animate(Resources.CaterpillarWalk, 2, 1, 500);


        this.graphics.use(this.caterpillarWalk);

        this.scale = new Vector(0.5, 0.5);
        this.pos = spawnPosition;
    }

    onInitialize(engine) {
        this.initializeSuper(engine);

    }


}