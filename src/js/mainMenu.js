import {Actor, Font, Keys, Label, Scene, Vector} from "excalibur";
import {Resources} from "./resources.js";


export class MainMenu extends Scene {


    attempts;
    victories;

    onInitialize(engine) {

        let background = new Actor;
        background.graphics.use(Resources.Splash.toSprite());
        background.pos = new Vector(960, 540);
        this.add(background);

        this.victories = new Label({pos: new Vector(175, 600), font: new Font({size: 42})});
        this.attempts = new Label({pos: new Vector(1739, 600), font: new Font({size: 42})});

        this.camera.strategy.lockToActor(background);

        this.add(this.victories);
        this.add(this.attempts);

    }

    onActivate(context) {
        super.onActivate(context);

        if (localStorage.getItem("victories") === null) {
            localStorage.setItem("victories", "0")
        }

        if (localStorage.getItem("attempts") === null) {
            localStorage.setItem("attempts", "0")
        }

        this.victories.text = localStorage.getItem("victories");
        this.attempts.text = localStorage.getItem("attempts");

    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene('church');
        }

        if (engine.input.keyboard.wasPressed(Keys.Q)) {
            engine.goToScene('tutorial');
        }
    }


}