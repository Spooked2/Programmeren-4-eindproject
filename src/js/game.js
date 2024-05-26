import '../css/style.css';
import {DisplayMode, Engine, Input, SolverStrategy} from "excalibur";
import {ResourceLoader} from './resources.js';
import {Church} from "./church.js";

export class Game extends Engine {

    constructor() {
        super({
            width: 1920,
            height: 1080,
            displayMode: DisplayMode.FitScreen,
            physics: {solver: SolverStrategy.Realistic},
            canvasElementId: 'game',
            pointerScope: Input.PointerScope.Canvas,
            fixedUpdateFps: 60,
            pixelArt: true
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }


    startGame() {
        console.log("start de game!");

        this.add('church', new Church);

        this.goToScene('church');

    }


}

new Game();

