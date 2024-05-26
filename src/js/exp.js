import {Actor, Vector} from "excalibur";
import {Resources} from "./resources.js";

/*
Small orb dropped after killing an enemy or opening a chest.
If picked up by the player, it should increase their exp total by the orb's value.
 */
export class Exp extends Actor {

    value;

    constructor(value, position) {
        super({radius: 400});

        this.graphics.use(Resources.Exp.toSprite());

        this.value = value;
        this.pos = position;
        this.scale = new Vector(0.25, 0.25);
    }


    pickup(knight) {

        this.actions.meet(knight, 600);

        this.actions.die();
    }


}