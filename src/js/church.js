import {BoundingBox, Random, Scene, Timer, Vector} from "excalibur";
import {Background} from "./background.js";
import {Knight} from "./knight.js";
import {Gun} from "./gun.js";
import {Fish} from "./fish.js";


export class Church extends Scene {

    random = new Random;
    countdown;
    ui;
    uiClock;
    expBar;
    levelText;
    uiHearts;
    uiHealthContainer;
    uiAmmo;
    uiMaxAmmo;
    surviveTimer;
    enemySpawnRate;
    enemySpawnAmount ;
    allowedEnemies = {
        fish: true
    };
    gameOver = true;

    onInitialize(engine) {

        this.ui = document.getElementById('ui');

        this.resetGame();

    }

    onActivate(context) {
        super.onActivate(context);
        if (this.gameOver) {
            this.resetGame()
        }
    }


    enemySpawnPosition() {
        let vector = new Vector(0, 0)
        let vp = this.camera.viewport;

        switch (this.random.d4()) {
            case 1:
                vector.y = vp.top - 100;
                vector.x = this.random.floating(vp.left, vp.right);
                break;
            case 2:
                vector.y = vp.bottom + 100;
                vector.x = this.random.floating(vp.left, vp.right);
                break;
            case 3:
                vector.x = vp.left - 100;
                vector.y = this.random.floating(vp.top, vp.bottom);
                break;
            case 4:
                vector.x = vp.right + 100;
                vector.y = this.random.floating(vp.top, vp.bottom);
        }

        return vector;

    }

    createUI(knight) {
        //Make containers for health, exp and clock
        let statContainer = document.createElement('div');
        statContainer.id = 'statContainer';

        //Make container for health and ammo
        let healthAndAmmoContainer = document.createElement('div');
        healthAndAmmoContainer.id = 'healthAndAmmoContainer';

        //Ammo
        let ammoContainer = document.createElement('div');
        ammoContainer.id = 'ammoContainer';

        this.uiAmmo = document.createElement('p');
        ammoContainer.appendChild(this.uiAmmo);
        this.updateAmmoUi(knight.weapon);

        let divider = document.createElement('p');
        divider.innerText = '/';
        ammoContainer.appendChild(divider);

        this.uiMaxAmmo = document.createElement('p');
        ammoContainer.appendChild(this.uiMaxAmmo);
        this.updateMaxAmmoUi(knight.weapon);


        //Health
        this.uiHealthContainer = document.createElement('div');
        this.uiHealthContainer.id = 'healthContainer';

        //Add hearts equal to knight's starting health
        this.updateHealthUi(knight);

        healthAndAmmoContainer.appendChild(this.uiHealthContainer);
        healthAndAmmoContainer.appendChild(ammoContainer);


        //Exp
        let expContainer = document.createElement('div');
        expContainer.id = 'expContainer';

        this.expBar = document.createElement('div');
        this.expBar.id = 'expBar';

        expContainer.appendChild(this.expBar);

        //Level
        let levelContainer = document.createElement('div');
        levelContainer.id = 'levelContainer';

        this.levelText = document.createElement('h3');
        this.levelText.innerText = 'Level 0';
        levelContainer.appendChild(this.levelText);


        //Clock
        let clockContainer = document.createElement('div');
        clockContainer.id = 'clockContainer';

        let clock = document.createElement('h2');
        this.uiClock = clock;
        clock.innerText = '10:00';
        clockContainer.appendChild(clock);


        //Add them to the ui
        statContainer.appendChild(healthAndAmmoContainer);
        statContainer.appendChild(expContainer);
        statContainer.appendChild(levelContainer);
        statContainer.appendChild(clockContainer);

        this.ui.appendChild(statContainer);
    }

    secondHandler() {

        //Stop the timer if the game ended
        if (this.gameOver) {
            this.surviveTimer.stop();
            this.ui.innerHTML = '';
            this.engine.goToScene('gameOver');
            return;
        }

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

    updateHealthUi(knight) {

        while (knight.healthMax > this.uiHearts.length) {

            let heart = document.createElement('img');
            heart.classList.add('heart');
            this.uiHearts.unshift(heart);
            this.uiHealthContainer.appendChild(heart);

        }

        let difference = knight.healthMax - knight.health;

        //Not sure if this is a good optimization thing
        // if (difference === 0 && this.uiHearts.every((heart) => heart.classList.contains('heart'))) {
        //     return
        // }

        for (let i = 0; i < knight.healthMax; i++) {

            if (difference > i) {
                this.uiHearts[i].classList.replace('heart', 'broken');
            } else {
                this.uiHearts[i].classList.replace('broken', 'heart');
            }

        }

    }

    updateAmmoUi(gun) {
        this.uiAmmo.innerText = gun.ammo;
    }

    updateMaxAmmoUi(gun) {
        this.uiMaxAmmo.innerText = gun.maxAmmo;
    }

    updateExpUi(knight) {
        let percentage;

        if (knight.newExp >= knight.levelThreshold) {
            percentage = 100;
        } else {
            percentage = Math.floor((knight.newExp / knight.levelThreshold) * 100);
        }

        this.expBar.style.width = `${percentage}%`;


    }

    updateLevelUi(knight) {
        this.levelText.innerText = `Level ${knight.level}`;
    }

    resetGame() {
        this.gameOver = false;

        for (const actor of this.actors) {
            actor.kill();
        }

        this.uiHearts = [];

        this.countdown = 600;
        this.enemySpawnRate = 5;
        this.enemySpawnAmount = 3;

        const background = new Background;
        this.add(background);

        const knight = new Knight(new Gun());
        this.add(knight);

        this.surviveTimer = new Timer({
            fcn: () => {
                this.secondHandler()
            },
            repeats: true,
            interval: 1000,
            numberOfRepeats: 600
        })

        this.add(this.surviveTimer);
        this.surviveTimer.start();

        //Create UI elements with HTML
        this.createUI(knight);


        this.camera.strategy.lockToActor(knight)
        this.camera.zoom = 2;
        const boundingBox = new BoundingBox(0, 0, 1500, 1500)
        this.camera.strategy.limitCameraBounds(boundingBox);
    }

}