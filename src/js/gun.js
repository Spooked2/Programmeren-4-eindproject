import {Actor, Vector} from "excalibur";
import {Resources} from './resources.js';
import {Bullet} from './bullet.js';

export class Gun extends Actor {

    constructor() {
        super({width: Resources.Gun.width, height: Resources.Gun.height});

        this.graphics.use(Resources.Gun.toSprite());

        this.pos = new Vector(-15, 0)

    }

    onPreUpdate(engine, delta) {
        engine.input.pointers.primary.once('down', (e) => {
            this.shoot(e, engine)
        });
    }

    shoot(e, engine) {

        let bullet = new Bullet;
        bullet.pos = this.pos;

        engine.currentScene.add(bullet);

    }

}