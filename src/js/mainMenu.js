import {Keys, Label, Scene, Vector} from "excalibur";


export class MainMenu extends Scene {



    onInitialize(engine) {
        let label = new Label({
            text: 'Press fire to start'
        });

        label.pos = new Vector(960, 540);
        label.scale = new Vector(6, 6);

        this.add(label);
    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene('church');
        }
    }


}