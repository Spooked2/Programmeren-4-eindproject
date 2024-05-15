import {Actor, Vector, Random, Keys, Timer, CollisionType} from "excalibur";
import {Resources} from './resources.js';
import {Bullet} from './bullet.js';
import {Gun} from './gun.js';

const random = new Random;

export class Knight extends Actor {

    //Properties (variables)

    moveSpeed;
    health;
    invincible = false;
    invincibilityTimer;

    constructor() {
        super({
            width: Resources.Knight.width,
            height: Resources.Knight.height,
            collisionType: CollisionType.Active
        });

        //Set properties
        this.moveSpeed = 100;
        this.health = 4;

        //Miscellaneous
        this.invincibilityTimer = new Timer({
            fcn: () => {this.invincible = false},
            repeats: false,
            interval: 3000
        })



        //Set sprite
        this.graphics.use(Resources.Knight.toSprite());
        this.pos = new Vector(750, 750);
        this.scale = new Vector(0.5, 0.5);

        //Set collision handler
        this.on('collisionstart', (e) => {
            this.collisionHandler(e);
        })

    }


    //Excalibur's methods (functions)

    onInitialize(engine) {
        engine.currentScene.add(this.invincibilityTimer);

        this.addChild(new Gun);

    }

    onPreUpdate(engine, delta) {

        //Handle movement
        let ySpeed = 0;
        let xSpeed = 0;
        let kb = engine.input.keyboard

        if (kb.isHeld(Keys.W)) {
            ySpeed -= this.moveSpeed;
        }

        if (kb.isHeld(Keys.S)) {
            ySpeed += this.moveSpeed;
        }

        if (kb.isHeld(Keys.A)) {
            xSpeed -= this.moveSpeed;
        }

        if (kb.isHeld(Keys.D)) {
            xSpeed += this.moveSpeed;
        }

        this.vel = new Vector(xSpeed, ySpeed);

        //Handle death
        if (this.health === 0) {
            this.kill();
        }


    }

    //Custom Methods

    collisionHandler(e) {

        //Don't do anything if player collides with player's own bullets, gun or if the player is invincible
        if (e.other instanceof Bullet || this.invincible === true || e.other instanceof Gun) {
            return;
        }

        //Subtract 1 health
        this.health--;

        //Update the UI
        const ui = document.getElementById('healthContainer');
        ui.removeChild(document.querySelector(`img:last-child`));

        //Don't bother with anything else if health is 0
        if (this.health === 0) {
            return;
        }

        //Push all enemies around player away

        //Turn player invincible for a few seconds after getting hit
        this.invincible = true;
        this.invincibilityTimer.start();


    }

}