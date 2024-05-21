import '../css/style.css'
import {Actor, BoundingBox, DisplayMode, Engine, Input, Vector, Random, SolverStrategy} from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Fish } from "./fish.js";
import { Knight } from "./knight.js";
import { Background } from "./background.js";
import { Crosshair } from "./crosshair.js";

let ui;

export class Game extends Engine {

    random = new Random;

    constructor() {
        super({
            width: 1920,
            height: 1080,
            displayMode: DisplayMode.FitScreen,
            physics: { solver: SolverStrategy.Arcade },
            canvasElementId: 'game',
            pointerScope: Input.PointerScope.Canvas,
            fixedUpdateFps: 60
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }


    startGame() {
        console.log("start de game!");

        ui = document.getElementById('ui');

        const background = new Background;
        this.add(background);

        const knight = new Knight;
        this.add(knight);

        // this.add(new Crosshair());

        //Create UI elements with HTML
        this.createUI(knight);

        for (let i = 0; i < 40; i++) {
            const fish = new Fish();
            fish.pos = this.enemySpawnPosition();
            fish.actions.meet(knight, 60);
            this.add(fish);
        }

        this.currentScene.camera.strategy.lockToActor(knight)
        this.currentScene.camera.zoom = 2;
        const boundingBox = new BoundingBox(0, 0, 1500, 1500)
        this.currentScene.camera.strategy.limitCameraBounds(boundingBox);

    }

    enemySpawnPosition() {
        let vector = new Vector(0, 0)
        let vp = this.currentScene.camera.viewport;

        switch (this.random.d4()) {
            case 1: vector.y = vp.top; vector.x = this.random.floating(vp.left, vp.right); break;
            case 2: vector.y = vp.bottom; vector.x = this.random.floating(vp.left, vp.right); break;
            case 3: vector.x = vp.left; vector.y = this.random.floating(vp.top, vp.bottom); break;
            case 4: vector.x = vp.right; vector.y = this.random.floating(vp.top, vp.bottom);
        }

        return vector;

    }

    createUI(knight) {
        //Make containers for health and clock
        let statContainer = document.createElement('div');
        statContainer.id = 'statContainer';

        let healthContainer = document.createElement('div');
        healthContainer.id = 'healthContainer';

        let clockContainer = document.createElement('div');
        clockContainer.id = 'clockContainer';


        //Add hearts equal to knight's starting health
        for (let i = 0; i < knight.health; i++) {
            let heart = document.createElement('img');
            heart.src = 'images/heart.png';
            healthContainer.appendChild(heart);
        }

        //Add them to the ui
        statContainer.appendChild(healthContainer);
        statContainer.appendChild(clockContainer);

        ui.appendChild(statContainer);
    }

}

new Game()

