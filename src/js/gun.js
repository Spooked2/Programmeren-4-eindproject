import {Actor, Vector, Timer, CollisionType, RotationType, DegreeOfFreedom, Keys} from "excalibur";
import {Resources} from './resources.js';
import {Bullet} from './bullet.js';

export class Gun extends Actor {

    shotCooldown;
    shotCooldownTimer;
    shotCooldownActive;
    damage;
    maxAmmo;
    ammo;
    reloadTimer;
    reloadCooldown;
    reloadCooldownActive;

    constructor() {
        super({
            width: Resources.Gun.width,
            height: Resources.Gun.height,
            collisionType: CollisionType.PreventCollision,
        });

        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.shotCooldown = 400;
        this.reloadCooldown = 400;
        this.shotCooldownActive = true;
        this.reloadCooldownActive = false;
        this.damage = 25;
        this.maxAmmo = 8;
        this.ammo = 8;

        this.shotCooldownTimer = new Timer({
            fcn: () => {
                this.shotCooldownActive = false;
            },
            repeats: false,
            interval: this.shotCooldown
        });

        this.reloadTimer = new Timer({
            fcn: () => {
                this.reloadCooldownActive = false;
            },
            repeats: false,
            interval: this.reloadCooldown
        });

        this.graphics.use(Resources.Gun.toSprite());
        this.graphics.flipHorizontal = true;

        this.scale = new Vector(0.5, 0.5);

        this.pos = new Vector(-50, 10);

    }

    onInitialize(engine) {
        engine.currentScene.add(this.shotCooldownTimer);
        engine.currentScene.add(this.reloadTimer);
        this.shotCooldownTimer.start();
    }

    onPreUpdate(engine, delta) {
        const kb = engine.input.keyboard;

        if (kb.isHeld(Keys.ArrowRight) ||
            kb.isHeld(Keys.ArrowUp) ||
            kb.isHeld(Keys.ArrowLeft) ||
            kb.isHeld(Keys.ArrowDown)
        ){
            this.actions.rotateTo(this.getRotateAngle(engine), 20, RotationType.ShortestPath);
        }

        if (kb.isHeld(Keys.Space)) {
            this.shoot(engine)
        }

        if (kb.wasReleased(Keys.Space)) {
            this.shotCooldownTimer.stop();
            this.shotCooldownActive = false;
        }

        if (kb.isHeld(Keys.R)) {
            this.reload();
        }

        if (kb.wasReleased(Keys.R)) {
            this.reloadTimer.stop();
            this.reloadCooldownActive = false;
        }


    }


    shoot(engine) {

        //Don't do anything before the cooldown has ended or if the gun has no ammo
        if (this.shotCooldownActive || this.ammo <= 0) {
            return;
        }

        //Handle cooldown after shooting
        this.shotCooldownActive = true;
        this.shotCooldownTimer.start();


        //Create a bullet
        let bullet = new Bullet(this.rotation, this.getGlobalPos().clone(), this.damage);

        engine.currentScene.add(bullet);

        //Handle ammo
        this.ammo--;
        engine.currentScene.updateAmmoUi(this);

    }

    reload() {

        //Don't do anything if ammo is full or if the cooldown is active
        if (this.ammo >= this.maxAmmo || this.reloadCooldownActive) {
            return;
        }

        //Spin the gun?

        //Add a single bullet
        this.ammo++;

        //Update Ui
        this.scene.updateAmmoUi(this);

        //Set the timer
        this.reloadCooldownActive = true;
        this.reloadTimer.start();


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
