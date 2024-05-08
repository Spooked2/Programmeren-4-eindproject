import '../css/style.css'
import {Actor, Engine, Input, Vector} from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Fish } from "./fish.js";
import { Knight } from "./knight.js";
import { Background } from "./background.js";

export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!");

        const background = new Background;
        this.add(background);

        const knight = new Knight;
        this.add(knight);

        for (let i = 0; i < 100; i++) {
            const fish = new Fish();
            this.add(fish);
        }

    }

}

new Game()
