import {Actor, Vector, Random, Keys, Timer, CollisionType} from "excalibur";
import {Resources} from './resources.js';
import {Bullet} from './bullet.js';
import {Gun} from './gun.js';
import {Crosshair} from "./crosshair.js";
import {Enemy} from "./enemy.js";

const random = new Random;

export class Knight extends Actor {

    //Properties (variables)

    moveSpeed;
    health;
    weapon;
    invincible = false;
    invincibilityTimer;
    engine;

    constructor(selectedWeapon) {
        super({
            width: Resources.Knight.width,
            height: Resources.Knight.height,
            collisionType: CollisionType.Active
        });

        //Set properties
        this.moveSpeed = 100;
        this.health = 4;
        this.weapon = selectedWeapon;

        //Miscellaneous
        this.invincibilityTimer = new Timer({
            fcn: () => {this.invincible = false; this.actions.clearActions()},
            repeats: false,
            interval: 2000
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
        this.engine = engine;

        this.addChild(this.weapon);

    }

    onPreUpdate(engine, delta) {

        //Handle movement
        let ySpeed = 0;
        let xSpeed = 0;
        let kb = engine.input.keyboard;

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

        //Don't do anything if player collides with things that aren't an enemy or if the player is invincible
        if (!(e.other instanceof Enemy)
            || this.invincible === true
            || document.querySelector(`img:last-child`) === null) {
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
        const enemies = this.engine.currentScene.actors.filter(this.filterEnemy);
        for (const enemy of enemies) {
            enemy.pushAway();
        }

        //Turn player invincible for a few seconds after getting hit
        this.invincible = true;
        this.actions.blink(100, 100, 99);
        this.invincibilityTimer.start();


    }

    filterEnemy(actor) {
        if (actor instanceof Enemy) {
            return actor;
        }
    }


}