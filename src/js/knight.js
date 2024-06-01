import {Actor, Vector, Random, Keys, Timer, CollisionType, DegreeOfFreedom, Collider, CircleCollider} from "excalibur";
import {Resources, animate} from './resources.js';
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
    knightIdle;
    knightWalk;

    constructor(selectedWeapon) {
        super({
            width: Resources.Knight.width,
            height: Resources.Knight.height,
            collisionType: CollisionType.Active
        });

        this.knightIdle = animate(Resources.KnightIdle, 2, 1, 600);
        this.knightWalk = animate(Resources.KnightWalk, 5, 4, 300);

        //Set properties
        this.moveSpeed = 120;
        this.health = 4;
        this.healthMax = 4;
        this.weapon = selectedWeapon;
        this.totalExp = 0;
        this.newExp = 0;
        this.levelThreshold = 10;
        this.level = 0;
        this.body.mass = 30;
        this.body.bounciness = 1;
        // this.body.friction = 300;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);


        //Miscellaneous
        this.invincibilityTimer = new Timer({
            fcn: () => {
                this.invincible = false;
                this.actions.clearActions()
            },
            repeats: false,
            interval: 2000
        })


        //Set sprite
        this.graphics.use(this.knightIdle);
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

        let kb = engine.input.keyboard;
        let acceleration = this.moveSpeed / 1.5;

        if (kb.isHeld(Keys.W) || kb.isHeld(Keys.S) || kb.isHeld(Keys.A) || kb.isHeld(Keys.D)) {
            this.graphics.use(this.knightWalk);
        } else {
            this.graphics.use(this.knightIdle);
        }

        if (kb.isHeld(Keys.W)) {
            this.body.applyImpulse(this.pos, new Vector(0, -acceleration));
        } else if (this.vel.y < 0) {
            this.body.applyImpulse(this.pos, new Vector(0, this.moveSpeed));
        }

        if (kb.isHeld(Keys.S)) {
            this.body.applyImpulse(this.pos, new Vector(0, acceleration));
        } else if (this.vel.y > 0) {
            this.body.applyImpulse(this.pos, new Vector(0, -this.moveSpeed));
        }

        if (kb.isHeld(Keys.A)) {
            this.body.applyImpulse(this.pos, new Vector(-acceleration, 0));
        } else if (this.vel.x < 0) {
            this.body.applyImpulse(this.pos, new Vector(this.moveSpeed, 0));
        }

        if (kb.isHeld(Keys.D)) {
            this.body.applyImpulse(this.pos, new Vector(acceleration, 0));
        } else if (this.vel.x > 0) {
            this.body.applyImpulse(this.pos, new Vector(-this.moveSpeed, 0));
        }

        if (this.vel.x > this.moveSpeed) {
            this.vel.x = this.moveSpeed;
        } else if (this.vel.x < -this.moveSpeed) {
            this.vel.x = -this.moveSpeed;
        }

        if (this.vel.y > this.moveSpeed) {
            this.vel.y = this.moveSpeed;
        } else if (this.vel.y < -this.moveSpeed) {
            this.vel.y = -this.moveSpeed;
        }

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

        this.engine.goToScene('upgradeMenu');

    }


}