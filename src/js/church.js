import {BoundingBox, Random, Scene, Timer, Vector} from "excalibur";
import {Background} from "./background.js";
import {Knight} from "./knight.js";
import {Gun} from "./gun.js";
import {Ant} from "./ant.js";
import {Caterpillar} from "./caterpillar.js";
import {Louse} from "./louse.js";
import {Enemy} from "./enemy.js";


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
    enemySpawnData;
    gameOver = true;
    knight;

    onInitialize(engine) {

        this.ui = document.getElementById('ui');

        this.resetGame();


    }

    onActivate(context) {
        super.onActivate(context);

        if (this.gameOver) {
            this.resetGame();
            return;
        }

        if (context.data !== undefined) {
        context.data.applyUpgrade(this.knight);
        this.updateMaxAmmoUi(this.knight.weapon);
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

        //Handle win
        if (this.countdown <= 0) {
            this.gameOver = true;

            //Stop the timer and clear the UI
            this.surviveTimer.stop();
            this.ui.innerHTML = '';

            //Kill all enemies
            for (const actor of this.actors) {
                if ((actor instanceof Enemy)) {
                actor.deathHandler();
                }
            }

            //Save score
            let victories = Number(localStorage.getItem("victories"));
            victories++;
            localStorage.setItem("attempts", `${victories}`);

            const victoryTimer = new Timer({
                fcn: () => {
                    this.engine.goToScene('gameWon')
                },
                repeats: false,
                interval: 5000,
            });

            this.add(victoryTimer);
            victoryTimer.start();

            return;
        }


        //Handle enemy spawning

        for (const [key, enemy] of Object.entries(this.enemySpawnData)) {

            //Don't do anything if the enemy doesn't have a spawn rate
            if (enemy.spawnRate === 0) {
                continue
            }

            if ((this.countdown % enemy.spawnRate) === 0) {

                //Add enemies to scene based on the spawn amount
                for (let i = 0; i < enemy.spawnAmount; i++) {
                    this.add(enemy.makeNew())
                }

            }


        }

        //Handle changes based on time
        this.handleTime(this.uiClock.innerText);


    }

    updateHealthUi(knight) {

        while (knight.healthMax > this.uiHearts.length) {

            let heart = document.createElement('img');
            heart.classList.add('heart');
            this.uiHearts.unshift(heart);
            this.uiHealthContainer.appendChild(heart);

        }


        //If the knight's health is negative or 0, just set every heart to broken
        if (knight.health <= 0) {
            for (const uiHeart of this.uiHearts) {
                uiHeart.classList.replace('heart', 'broken');
            }
            return;
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

        let attempts = Number(localStorage.getItem("attempts"));
        attempts++;
        localStorage.setItem("attempts", `${attempts}`);

        this.gameOver = false;

        for (const actor of this.actors) {
            actor.kill();
        }

        this.uiHearts = [];

        this.countdown = 600;

        let game = this;

        this.enemySpawnData = {
            ant: {spawnAmount: 3, spawnRate: 5, makeNew() {return new Ant(game.enemySpawnPosition())}},
            caterpillar: {spawnAmount: 0, spawnRate: 0, makeNew() {return new Caterpillar(game.enemySpawnPosition())}},
            louse: {spawnAmount: 0, spawnRate: 0, makeNew() {return new Louse(game.enemySpawnPosition())}}
        };

        const background = new Background;
        this.add(background);

        const knight = new Knight(new Gun());
        this.add(knight);
        this.knight = knight;

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

    handleTime(time) {

        const ant = this.enemySpawnData.ant;
        const louse = this.enemySpawnData.louse;
        const caterpillar = this.enemySpawnData.caterpillar;

        if (time === '9:00') {

            //Make ants spawn slightly faster
            ant.spawnRate = 4;

            //Make lice spawn
            louse.spawnAmount = 1;
            louse.spawnRate = 8;
        }

        if (time === '8:30') {

            //More lice
            louse.spawnRate = 5;

        }

        if (time === '8:00') {

            //More ants
            ant.spawnAmount = 5;

        }

        if (time === '7:00') {

            //Fewer lice
            louse.spawnAmount = 2;
            louse.spawnRate = 10;

            //Yet more ants
            ant.spawnRate = 3;

        }

        if (time === '6:00') {

            //MORE. ANTS.
            ant.spawnRate = 2;
            ant.spawnAmount = 7;

        }

        if (time === '5:20') {

            //A moment to breathe
            ant.spawnRate = 0;
            ant.spawnAmount = 0;
            louse.spawnAmount = 0;
            louse.spawnRate = 0;

        }

        if (time === '5:00') {

            //The caterpillars approach
            caterpillar.spawnAmount = 2;
            caterpillar.spawnRate = 5;

        }

        if (time === '4:30') {

            //Add more caterpillars
            caterpillar.spawnRate = 4;

        }

        if (time === '4:00') {

            //Bring back the lice
            louse.spawnAmount = 1;
            louse.spawnRate = 2;

            //Make the caterpillars spawn more 'wave-y'
            caterpillar.spawnAmount = 4;
            caterpillar.spawnRate = 5;

        }

        if (time === '3:00') {

            //Add some ants
            ant.spawnRate = 3;
            ant.spawnAmount = 3;

        }

        if (time === '2:00') {

            //Ant rush
            ant.spawnAmount = 8;
            ant.spawnRate = 2;
            louse.spawnRate = 6;
            caterpillar.spawnAmount = 0;

        }

        if (time === '1:00') {

            //Caterpillar rush
            ant.spawnAmount = 0;
            ant.spawnRate = 0;
            caterpillar.spawnAmount = 6;
            caterpillar.spawnRate = 2;


        }

        if (time === '0:30') {

            //Final stand
            ant.spawnAmount = 5;
            ant.spawnRate = 2;
            louse.spawnAmount = 2;

        }

        if (time === '0:10') {

            //Cleanup time
            ant.spawnRate = 1;
            ant.spawnAmount = 1;
            louse.spawnAmount = 1;
            louse.spawnRate = 5;
            caterpillar.spawnAmount = 1;
            caterpillar.spawnRate = 3;
        }



    }

}

