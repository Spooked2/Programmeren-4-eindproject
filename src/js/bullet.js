import {Actor, Vector, Random, Keys} from "excalibur";
import {Resources} from './resources.js';

export class Bullet extends Actor {

    constructor() {
        super({width: Resources.Bullet.width, height: Resources.Bullet.height});

        this.graphics.use(Resources.Bullet.toSprite());

        this.vel = new Vector(200, 0);

    }

}