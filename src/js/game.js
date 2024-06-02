import '../css/style.css';
import {DisplayMode, Engine, Input, SolverStrategy, vec, Vector} from "excalibur";
import {ResourceLoader} from './resources.js';
import {Church} from "./church.js";
import {MainMenu} from "./mainMenu.js";
import {GameOver} from "./gameOver.js";
import {UpgradeMenu} from "./upgradeMenu.js";
import {Tutorial} from "./tutorial.js";
import {GameWon} from "./gameWon.js";

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
            pixelArt: true,
            suppressPlayButton: true
        })
        this.start(ResourceLoader).then(() => this.startGame());
    }


    startGame() {
        console.log("start de game!");

        this.add('mainMenu', new MainMenu);
        this.add('church', new Church);
        this.add('gameOver', new GameOver);
        this.add('gameWon', new GameWon);
        this.add('tutorial', new Tutorial);
        this.add('upgradeMenu', new UpgradeMenu);

        this.screen.events.on('resize', () => calculateExPixelConversion(this.screen));
        calculateExPixelConversion(this.screen);


        this.goToScene('mainMenu');

        console.log(this.scenes)

    }




}

new Game();

const calculateExPixelConversion = (screen) => {
    const origin = screen.screenToPageCoordinates(Vector.Zero);
    const singlePixel = screen.screenToPageCoordinates(vec(1, 0)).sub(origin);
    const pixelConversion = singlePixel.x;
    document.documentElement.style.setProperty('--pixel-conversion', pixelConversion.toString());
}



