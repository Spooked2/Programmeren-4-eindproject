import {Actor, Vector, Random, CollisionType, Timer} from "excalibur";
import {Knight} from "./knight.js";

const random = new Random;

export class Enemy extends Actor {

    pushAwayTimer;
    speed;
    health;
    knight;

    constructor(width, height) {
        super({
            height: height,
            width: width,
            collisionType: CollisionType.Active
        });

        this.health = 25;
        this.speed = 60;

    }

    initializeSuper(engine) {
        this.knight = engine.currentScene.actors.find((element) => element instanceof Knight);

        this.pushAwayTimer = new Timer({
            fcn: () => {this.actions.clearActions(); this.actions.meet(this.knight, this.speed)},
            repeats: false,
            interval: 750
        })

        engine.add(this.pushAwayTimer);

        this.actions.meet(this.knight, this.speed);
    }

    pushAway() {
        this.actions.clearActions();
        this.actions.meet(this.knight, -250);

        this.pushAwayTimer.start();

    }


    damageBy(damage) {

        this.health -= damage;

        if (this.health <= 0) {
            this.kill();
        }

    }


}