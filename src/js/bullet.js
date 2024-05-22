import {Actor, Timer, Vector} from "excalibur";
import {Resources} from './resources.js';
import {Enemy} from "./enemy.js";

export class Bullet extends Actor {

    // gunRotation;
    lifeTime;
    lifeTimeTimer;
    speed;
    damage;

    constructor(gunRotation, gunPosition, damage) {
        super({width: Resources.Bullet.width, height: Resources.Bullet.height});

        this.lifeTime = 2500;
        this.lifeTimeTimer = new Timer({
            fcn: () => {this.kill()},
            repeats: false,
            interval: this.lifeTime
        });

        this.graphics.use(Resources.Bullet.toSprite());

        this.gunRotation = gunRotation;
        this.pos = gunPosition;
        this.damage = damage;
        this.speed = -800;

        this.on('collisionstart', (e) => {
            this.collisionHandler(e);
        })

    }

    onInitialize(engine) {
        engine.currentScene.add(this.lifeTimeTimer);

        this.lifeTimeTimer.start();

        this.vel = new Vector(
            Math.cos(this.gunRotation) * this.speed,
            Math.sin(this.gunRotation) * this.speed
        );

    }


    collisionHandler(e) {

        if (!(e.other instanceof Enemy)) {
            return
        }

        e.other.damageBy(this.damage);
        this.lifeTimeTimer.stop();
        this.kill();

    }

}