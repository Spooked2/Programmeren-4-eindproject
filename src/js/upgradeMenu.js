import {Actor, Font, Keys, Label, Random, Scene, Timer, Vector} from "excalibur";
import {Resources} from "./resources.js";
import {Upgrades} from "./upgrades.js";

let random = new Random;

export class UpgradeMenu extends Scene {


    timer;
    allowSelect;
    upgradeActors;
    upgrades;
    selector;
    selectedIndex;
    selectedIndexChanged;
    upgradeDescription;
    upgradeList;

    onInitialize(engine) {

        let background = new Actor;
        background.graphics.use(Resources.LevelUpBackground.toSprite());
        background.pos = new Vector(960, 540);
        this.add(background);

        this.timer = new Timer({
            fcn: () => {
                this.allowSelect = true;
            },
            repeats: false,
            interval: 1000,
        })

        this.upgradeList = new Upgrades();
        this.upgrades = [];
        this.upgradeActors = [];
        this.selectedIndex = 0;
        this.selectedIndexChanged = false;
        this.allowSelect = false;
        this.upgradeDescription = new Label({pos: new Vector(530, 570), font: new Font({size: 24})});
        this.add(this.upgradeDescription);

        for (let i = 0; i < 4; i++) {
            let option = new Actor();
            let x = 583 + (i * 251);
            let y = 373;
            option.pos = new Vector(x, y);
            option.scale = new Vector(0.7, 0.7);
            this.add(option);
            this.upgradeActors.push(option);
        }

        this.selector = new Actor();
        this.selector.graphics.use(Resources.Selector.toSprite());
        this.selector.pos = new Vector(583, 373);
        this.selector.scale = new Vector(1.4, 1.4);



        this.camera.strategy.lockToActor(background);

        this.add(this.timer);
        this.add(this.selector);

    }

    onActivate(context) {

        //Fill upgrades array with random upgrades

        for (let i = 0; i < 4; i++) {
            let number = random.d6() - 1;

            while (this.upgrades.indexOf(this.upgradeList.list[number]) !== -1) {
                number = random.d6() - 1;
            }

            this.upgrades.push(this.upgradeList.list[number]);

        }

        let i = 0;
        for (const upgradeActor of this.upgradeActors) {
            upgradeActor.graphics.use(this.upgrades[i].sprite)
            i++;
        }

        this.selector.pos = new Vector(583, 373);


        this.upgradeDescription.text = this.upgrades[this.selectedIndex].description;


        //make the player wait a second before allowing them to proceed to avoid spamming through the menu
        this.timer.start();

    }

    onPreUpdate(engine, delta) {

        //Select upgrade

        if (engine.input.keyboard.wasPressed(Keys.A)) {
            this.selectedIndex--
            this.selectedIndexChanged = true;
            //If the selected index goes below 0, wrap back around to 3
            if (this.selectedIndex < 0) {
                this.selectedIndex = 3;
            }
        }

        if (engine.input.keyboard.wasPressed(Keys.D)) {
            this.selectedIndex++
            this.selectedIndexChanged = true;
            //If the selected index goes above 3, wrap back around to 0
            if (this.selectedIndex > 3) {
                this.selectedIndex = 0;
            }
        }

        //Update UI if selected index changed
        if (this.selectedIndexChanged) {
            this.selectedIndexChanged = false;


            switch (this.selectedIndex) {
                case 0: this.selector.pos.x = 583; break;
                case 1: this.selector.pos.x = 834; break;
                case 2: this.selector.pos.x = 1085; break;
                case 3: this.selector.pos.x = 1336;
            }

            this.upgradeDescription.text = this.upgrades[this.selectedIndex].description;



        }

        //Choose upgrade
        if (engine.input.keyboard.wasPressed(Keys.Space) && this.allowSelect) {

            let upgradeFunction = this.upgrades[this.selectedIndex].applyUp;

            //Reset stuff
            this.allowSelect = false;
            this.upgrades = [];
            this.selectedIndex = 0;

            //Go back to game
            engine.goToScene('church', {sceneActivationData: {applyUpgrade: upgradeFunction}});
        }
    }


}