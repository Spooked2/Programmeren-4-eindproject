import {Actor, Vector, Random, CollisionType, Timer, DegreeOfFreedom} from "excalibur";
import {Knight} from "./knight.js";
import {Exp} from "./exp.js";

const random = new Random;

export class Enemy extends Actor {

    pushAwayTimer;
    speed;
    health;
    knight;
    engine;
    expValue;

    constructor(width, height) {
        super({
            height: height,
            width: width,
            collisionType: CollisionType.Active
        });

        //Initialize some default values just in case
        this.health = 25;
        this.speed = 60;
        this.expValue = 1;
        this.body.bounciness = 0;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.body.mass = 40;

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

        this.engine = engine;
    }

    pushAway() {
        this.actions.clearActions();
        this.actions.meet(this.knight, -250);

        this.pushAwayTimer.start();

    }


    damageBy(damage) {

        this.health -= damage;

        if (this.health <= 0) {
            this.deathHandler();
        }

    }

    deathHandler() {

        this.engine.add(new Exp(this.expValue, this.pos.clone()));

        this.kill();
    }


}