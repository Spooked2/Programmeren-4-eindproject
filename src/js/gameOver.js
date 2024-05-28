import {Keys, Label, Scene, Vector} from "excalibur";


export class GameOver extends Scene {


    onInitialize(engine) {
        let label = new Label({
            text: 'Game over! Press fire to restart'
        });

        label.pos = new Vector(960, 540);
        label.scale = new Vector(4, 4);

        this.add(label);
    }



    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene('mainMenu');
        }
    }


}