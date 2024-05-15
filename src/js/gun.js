import {Actor, Vector, Timer, CollisionType} from "excalibur";
import {Resources} from './resources.js';
import {Bullet} from './bullet.js';

export class Gun extends Actor {

    shotCooldown;
    shotCooldownTimer;
    shotCooldownActive;

    constructor() {
        super({
            width: Resources.Gun.width,
            height: Resources.Gun.height,
            collisionType: CollisionType.PreventCollision
        });

        this.shotCooldown = 200;
        this.shotCooldownActive = false;

        this.shotCooldownTimer = new Timer({
            fcn: () => {this.shotCooldownActive = false;},
            repeats: false,
            interval: this.shotCooldown
        })

        this.graphics.use(Resources.Gun.toSprite());
        this.graphics.flipHorizontal = true;

        this.scale = new Vector(0.5, 0.5);

        this.pos = new Vector(-70, 10);

    }

    onInitialize(engine) {
        engine.currentScene.add(this.shotCooldownTimer);

        console.log(this);
    }

    onPreUpdate(engine, delta) {
        engine.input.pointers.primary.on('down', (e) => {
            this.shoot(e, engine);
        });
    }

    shoot(e, engine) {

        if (this.shotCooldownActive) {
            return;
        }

        this.shotCooldownActive = true;
        this.shotCooldownTimer.start();

        let bullet = new Bullet(this.rotation);
        bullet.pos = this.getGlobalPos().clone();

        engine.add(bullet);

    }

}