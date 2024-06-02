import {Actor, Font, Keys, Label, Scene, Vector} from "excalibur";
import {Resources} from "./resources.js";


export class GameWon extends Scene {

    onInitialize(engine) {

        let background = new Actor;
        background.graphics.use(Resources.Win.toSprite());
        background.pos = new Vector(960, 540);
        this.add(background);

        this.camera.strategy.lockToActor(background);

    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene('mainMenu');
        }

    }


}