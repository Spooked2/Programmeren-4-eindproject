import {Actor, Vector, Timer, CollisionType, RotationType} from "excalibur";
import {Resources} from './resources.js';
import {Bullet} from './bullet.js';

export class Gun extends Actor {

    shotCooldown;
    shotCooldownTimer;
    shotCooldownActive;
    damage;

    constructor() {
        super({
            width: Resources.Gun.width,
            height: Resources.Gun.height,
            collisionType: CollisionType.PreventCollision
        });

        this.shotCooldown = 200;
        this.shotCooldownActive = false;
        this.damage = 25;

        this.shotCooldownTimer = new Timer({
            fcn: () => {
                this.shotCooldownActive = false;
            },
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
    }

    onPreUpdate(engine, delta) {
        const kb = engine.input.keyboard;

        if (kb.isHeld('ArrowRight') ||
            kb.isHeld('ArrowUp') ||
            kb.isHeld('ArrowLeft') ||
            kb.isHeld('ArrowDown')
        ){
            this.shoot(engine);
        }
    }


    shoot(engine) {

        //Don't do anything before the cooldown has ended
        if (this.shotCooldownActive) {
            return;
        }

        //Handle cooldown after shooting
        this.shotCooldownActive = true;
        this.shotCooldownTimer.start();

        //Rotate the gun based on input
        this.actions.rotateTo(this.getRotateAngle(engine), 20, RotationType.ShortestPath);


        //Create a bullet
        let bullet = new Bullet(this.rotation, this.getGlobalPos().clone(), this.damage);

        engine.currentScene.add(bullet);

    }

    getRotateAngle(engine) {

        const kb = engine.input.keyboard;
        const left = kb.isHeld('ArrowLeft');
        const up = kb.isHeld('ArrowUp');
        const right = kb.isHeld('ArrowRight');
        const down = kb.isHeld('ArrowDown');


        if (left && up) {
            return (Math.PI * 0.25);
        }

        if (left && down) {
            return (Math.PI * 1.75);
        }

        if (right && up) {
            return (Math.PI * 0.75);
        }

        if (right && down) {
            return (Math.PI * 1.25);
        }

        if (left) {
            return 0;
        }

        if (up) {
            return (Math.PI * 0.5);
        }

        if (right) {
            return (Math.PI);
        }

        if (down) {
            return (Math.PI * 1.5);
        }


    }

}
