import {Actor, Timer, Vector} from "excalibur";
import {Resources} from './resources.js';

export class Bullet extends Actor {

    gunRotation;
    lifeTime;
    lifeTimeTimer;
    speed;

    constructor(gunRotation) {
        super({width: Resources.Bullet.width, height: Resources.Bullet.height});

        this.lifeTime = 2500;
        this.lifeTimeTimer = new Timer({
            fcn: () => {this.kill()},
            repeats: false,
            interval: this.lifeTime
        });

        this.graphics.use(Resources.Bullet.toSprite());

        this.gunRotation = gunRotation;
        this.speed = -800;

    }

    onInitialize(engine) {
        engine.currentScene.add(this.lifeTimeTimer);

        this.lifeTimeTimer.start();

        this.vel = new Vector(
            Math.cos(this.gunRotation) * this.speed,
            Math.sin(this.gunRotation) * this.speed
        );

    }

}