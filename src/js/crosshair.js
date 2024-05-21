import {Actor, Vector} from "excalibur";
import { Resources } from './resources.js';

export class Crosshair extends Actor {

    constructor() {
        super();

        this.graphics.use(Resources.Crosshair.toSprite());

        this.scale = new Vector(0.5, 0.5);

    }

    onInitialize(engine) {
        this.pos = new Vector(-750, -750)
        // this.pos = engine.input.pointers.primary.lastScreenPos.clone();
        // this.pos = engine.input.pointers.primary.lastPagePos.clone();
    }

    onPreUpdate(engine, delta) {
        this.pos = engine.input.pointers.primary.lastWorldPos.clone();
        this.pos.x -= 750;
        this.pos.y -= 750;
    }

}