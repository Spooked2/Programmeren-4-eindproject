import {Actor, ParallaxComponent, Vector} from "excalibur";
import { Resources } from './resources.js';

export class Background extends Actor {

    constructor() {
        super();

        this.graphics.use(Resources.Background.toSprite());

        // this.addComponent(new ParallaxComponent(new Vector(0.5, 0.5)));

        this.pos = new Vector(750, 750)

    }

}