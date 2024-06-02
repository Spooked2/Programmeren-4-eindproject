import {Resources} from "./resources.js";


export class Upgrades {

    list;

    constructor() {

        this.list = [];

        this.fillList();

    }

    fillList() {

        //6 upgrades: Health, damage, ammo capacity, move speed, reload speed, fan fire


        let healthUp = {
            description: 'Restores 1 health. If already at full health, increase health cap by 1',
            sprite: Resources.Heart.toSprite(),
            applyUp(knight) {

                if (knight.health === knight.healthMax) {
                    knight.healthMax++
                }

                knight.health++
                knight.hitFor(0);

            }
        }

        let damageUp = {
            description: 'Increases the damage of your shots by 5',
            sprite: Resources.Scroll.toSprite(),
            applyUp(knight) {

                knight.weapon.damage += 5;

            }
        }

        let ammoCapUp = {
            description: 'Increases the maximum amount of bullets you can have in the chamber',
            sprite: Resources.Chest.toSprite(),
            applyUp(knight) {

                knight.weapon.maxAmmo += 2;

            }
        }

        let speedUp = {
            description: 'Increases your movement speed',
            sprite: Resources.Cookie.toSprite(),
            applyUp(knight) {

                knight.moveSpeed += 15;

            }
        }

        let reloadUp = {
            description: 'Increases the amount of bullets you reload per reload',
            sprite: Resources.Water.toSprite(),
            applyUp(knight) {

                knight.weapon.reloadAmount++

            }
        }

        let shotsUp = {
            description: 'Increases the amount of shots fired at once',
            sprite: Resources.Book.toSprite(),
            applyUp(knight) {

                knight.weapon.fireAmount++;

            }
        }

        this.list.push(healthUp);
        this.list.push(speedUp);
        this.list.push(damageUp);
        this.list.push(ammoCapUp);
        this.list.push(reloadUp);
        this.list.push(shotsUp);

    }


}