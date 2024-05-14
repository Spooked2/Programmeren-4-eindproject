import {Actor, Vector, Random, Keys} from "excalibur";
import {Resources} from './resources.js';

const random = new Random;

export class Knight extends Actor {
    constructor() {
        super({width: Resources.Knight.width, height: Resources.Knight.height});

        //Set properties
        this.moveSpeed = 100;

        //Set sprite
        this.graphics.use(Resources.Knight.toSprite());
        this.pos = new Vector(750, 750);
        this.scale = new Vector(0.5, 0.5);

    }

    //Properties (variables)
    moveSpeed;

    //Excalibur's methods (functions)

    onPreUpdate(engine, delta) {

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


    }

    //Custom Methods

}