import {Actor, Keys, Label, Scene, Vector} from "excalibur";
import {Resources} from "./resources.js";


export class UpgradeMenu extends Scene {


    onInitialize(engine) {

        let background = new Actor;
        background.graphics.use(Resources.LevelUpBackground.toSprite());
        background.pos = new Vector(960, 540);

        this.camera.strategy.lockToActor(background);

        this.add(background);

    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene('church');
        }
    }


}