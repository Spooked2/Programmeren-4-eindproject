import {BoundingBox, Random, Scene, Timer, Vector} from "excalibur";
import {Background} from "./background.js";
import {Knight} from "./knight.js";
import {Gun} from "./gun.js";
import {Fish} from "./fish.js";


export class Church extends Scene {

    random = new Random;
    countdown = 600;
    ui;
    uiClock;
    enemySpawnRate = 5;
    enemySpawnAmount = 3;
    allowedEnemies = {
        fish: true
    };

    onInitialize(engine) {

        this.ui = document.getElementById('ui');

        const background = new Background;
        this.add(background);

        const knight = new Knight(new Gun());
        this.add(knight);

        const surviveTimer = new Timer({
            fcn: () => {
                this.secondHandler()
            },
            repeats: true,
            interval: 1000,
            numberOfRepeats: 600
        })

        this.add(surviveTimer);
        surviveTimer.start();

        //Create UI elements with HTML
        this.createUI(knight);


        this.camera.strategy.lockToActor(knight)
        this.camera.zoom = 2;
        const boundingBox = new BoundingBox(0, 0, 1500, 1500)
        this.camera.strategy.limitCameraBounds(boundingBox);

    }


    enemySpawnPosition() {
        let vector = new Vector(0, 0)
        let vp = this.camera.viewport;

        switch (this.random.d4()) {
            case 1:
                vector.y = vp.top;
                vector.x = this.random.floating(vp.left, vp.right);
                break;
            case 2:
                vector.y = vp.bottom;
                vector.x = this.random.floating(vp.left, vp.right);
                break;
            case 3:
                vector.x = vp.left;
                vector.y = this.random.floating(vp.top, vp.bottom);
                break;
            case 4:
                vector.x = vp.right;
                vector.y = this.random.floating(vp.top, vp.bottom);
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

        let clock = document.createElement('h2');
        this.uiClock = clock;
        clock.innerText = '10:00';
        clockContainer.appendChild(clock);


        //Add hearts equal to knight's starting health
        for (let i = 0; i < knight.health; i++) {
            let heart = document.createElement('img');
            heart.src = 'images/heart.png';
            healthContainer.appendChild(heart);
        }

        //Add them to the ui
        statContainer.appendChild(healthContainer);
        statContainer.appendChild(clockContainer);

        this.ui.appendChild(statContainer);
    }

    secondHandler() {

        //Handle ui and countdown
        this.countdown--;

        let extraZero;

        if ((this.countdown % 60) < 10) {
            extraZero = 0;
        } else {
            extraZero = '';
        }

        this.uiClock.innerText = `${Math.floor(this.countdown / 60)}:${extraZero}${this.countdown % 60}`;


        //Handle enemy spawning
        if ((this.countdown % this.enemySpawnRate) === 0) {
            for (let i = 0; i < this.enemySpawnAmount; i++) {
                let fish = new Fish(this.enemySpawnPosition());
                this.add(fish);
            }
        }


    }

}