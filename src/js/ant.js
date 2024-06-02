import {Vector, Random} from "excalibur";
import {animate, Resources} from './resources.js';
import {Enemy} from "./enemy.js";

const random = new Random;

export class Ant extends Enemy {

    antWalk;
    constructor(spawnPosition) {
        super(128, 128, 60, 60, 1);

        this.antWalk = animate(Resources.AntWalk, 2, 1, 200);

        this.graphics.use(this.antWalk);

        this.scale = new Vector(0.4, 0.4);
        this.pos = spawnPosition;
    }

    onInitialize(engine) {
        this.initializeSuper(engine);

    }


}