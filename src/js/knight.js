import {Actor, Vector, Random, MotionComponent, Input} from "excalibur";
import {Resources} from './resources.js';

const random = new Random;

export class Knight extends Actor {
    constructor() {
        super();

        this.graphics.use(Resources.Knight.toSprite());
        this.pos = new Vector(400, 300);

        this.addComponent(new MotionComponent())


    }

    update(Engine, delta) {

        if (Engine.input.keyboard.isHeld(Input.Keys.W)) {
            this.motion.vel.y = -50;
        } else if (Engine.input.keyboard.isHeld(Input.Keys.S)) {
            this.motion.vel.y = 50;
        } else {
            this.motion.vel.y = 0;
        }

        if (Engine.input.keyboard.isHeld(Input.Keys.D)) {
            this.motion.vel.x = 50;
        } else if (Engine.input.keyboard.isHeld(Input.Keys.A)) {
            this.motion.vel.x = -50;
        } else {
            this.motion.vel.x = 0;
        }

    }

}