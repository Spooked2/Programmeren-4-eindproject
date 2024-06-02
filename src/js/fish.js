import {Vector} from "excalibur";
import {Resources} from './resources.js';
import {Enemy} from "./enemy.js";


export class Fish extends Enemy {

    constructor(spawnPosition) {
        super(Resources.Fish.width, Resources.Fish.height, 60, 50, 1);

        this.graphics.use(Resources.Fish.toSprite());

        this.scale = new Vector(0.4, 0.4);
        this.pos = spawnPosition;
    }

    onInitialize(engine) {
        this.initializeSuper(engine);

    }


}