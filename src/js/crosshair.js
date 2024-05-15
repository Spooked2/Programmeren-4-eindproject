import {Actor, Vector} from "excalibur";
import { Resources } from './resources.js';

export class Crosshair extends Actor {

    constructor() {
        super();

        this.graphics.use(Resources.Crosshair.toSprite());

        this.scale = new Vector(0.5, 0.5);

    }

    onInitialize(engine) {
        this.pos = engine.input.pointers.primary.lastWorldPos.clone();
    }

    onPreUpdate(engine, delta) {
        this.pos = engine.input.pointers.primary.lastWorldPos.clone();
    }

}