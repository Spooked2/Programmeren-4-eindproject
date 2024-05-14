import '../css/style.css'
import {Actor, BoundingBox, DisplayMode, Engine, Input, Vector} from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Fish } from "./fish.js";
import { Knight } from "./knight.js";
import { Background } from "./background.js";

export class Game extends Engine {

    constructor() {
        super({ width: 1920, height: 1080, displayMode: DisplayMode.FitScreen })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!");


        const background = new Background;
        this.add(background);


        const knight = new Knight;
        this.add(knight);

        for (let i = 0; i < 10; i++) {
            const fish = new Fish();
            this.add(fish);
        }

        this.currentScene.camera.strategy.lockToActor(knight)
        this.currentScene.camera.zoom = 2;
        const boundingBox = new BoundingBox(0, 0, 1500, 1500)
        this.currentScene.camera.strategy.limitCameraBounds(boundingBox);

    }

}

new Game()
