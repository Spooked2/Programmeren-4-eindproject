import {Vector, Random, CollisionType} from "excalibur";
import {animate, Resources} from './resources.js';
import {Enemy} from "./enemy.js";
import {Explosion} from "./explosion.js";

const random = new Random;

export class Louse extends Enemy {

    louseWalk;

    constructor(spawnPosition) {
        super(128, 128, 80, 30, 2);

        this.specialDeath = true;

        this.louseWalk = animate(Resources.LouseWalk, 2, 1, 400);


        this.graphics.use(this.louseWalk);

        this.scale = new Vector(0.3, 0.3);
        this.pos = spawnPosition;
    }

    onInitialize(engine) {
        this.initializeSuper(engine);

    }

    onPreUpdate(engine, delta) {
        if (this.health <= 0) {
            this.explode(engine);
        }
    }

    explode(engine) {

        let explosion = new Explosion(this.pos.clone(), 50, 100);

        engine.add(explosion);

        this.deathHandler();
    }


}