import {Actor, Vector, Random, Keys, Timer, CollisionType, DegreeOfFreedom, Collider, CircleCollider} from "excalibur";
import {Resources} from './resources.js';
import {Enemy} from "./enemy.js";
import {Exp} from "./exp.js";

const random = new Random;

export class Knight extends Actor {

    //Properties (variables)
    moveSpeed;
    health;
    healthMax;
    weapon;
    invincible = false;
    invincibilityTimer;
    engine;
    totalExp;
    newExp;
    levelThreshold;
    level;

    constructor(selectedWeapon) {
        super({
            width: Resources.Knight.width,
            height: Resources.Knight.height,
            collisionType: CollisionType.Active
        });

        //Set properties
        this.moveSpeed = 100;
        this.health = 4;
        this.healthMax = 4;
        this.weapon = selectedWeapon;
        this.totalExp = 0;
        this.newExp = 0;
        this.levelThreshold = 10;
        this.level = 0;
        this.body.bounciness = 1;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);


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

        //Upon colliding with an exp orb, pick it up
        if (e.other instanceof Exp) {
            this.expHandler(e.other);
            return;
        }

        //Don't do anything if player collides with things that aren't an enemy or if the player is invincible
        if (!(e.other instanceof Enemy) || this.invincible === true) {
            return;
        }

        //Subtract 1 health
        this.health--;

        //Update the UI
        this.engine.currentScene.updateHealthUi(this);

        //Don't bother with anything else if health is 0
        if (this.health === 0) {
            this.engine.currentScene.gameOver = true;
            return;
        }

        //Push all enemies around player away
        const enemies = this.engine.currentScene.actors.filter(actor => actor instanceof Enemy);
        for (const enemy of enemies) {
            enemy.pushAway();
        }

        //Turn player invincible for a few seconds after getting hit
        this.invincible = true;
        this.actions.blink(100, 100, 99);
        this.invincibilityTimer.start();


    }

    expHandler(expOrb) {
        //Track total exp
        this.totalExp += expOrb.value;

        //Track unused exp
        this.newExp += expOrb.value;

        //Let the orb do its thing
        //Note: This deletes the orb, so if you need it: place the code above this line
        expOrb.pickup(this);

        //Update the UI
        this.engine.currentScene.updateExpUi(this);

        //Check for a level up
        if (this.newExp >= this.levelThreshold) {
            this.newExp -= this.levelThreshold;
            this.levelUp();

            //Update the exp again
            this.engine.currentScene.updateExpUi(this);
        }


    }

    levelUp() {

        //Prompt player to pick an upgrade
        //Pause the entire game until upgrade is chosen

        //Update variable
        this.level++;

        //Update the threshold
        this.levelThreshold += this.level;

        //Update the UI
        this.engine.currentScene.updateLevelUi(this);

    }


}