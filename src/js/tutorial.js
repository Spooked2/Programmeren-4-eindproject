import {Actor, Font, Keys, Label, Scene, Vector} from "excalibur";
import {Resources} from "./resources.js";


export class Tutorial extends Scene {

    onInitialize(engine) {

        let background = new Actor;
        background.graphics.use(Resources.Tutorial.toSprite());
        background.pos = new Vector(960, 540);
        this.add(background);

        this.camera.strategy.lockToActor(background);

    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene('church');
        }

        if (engine.input.keyboard.wasPressed(Keys.Q)) {
            engine.goToScene('mainMenu');
        }
    }


}