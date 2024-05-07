import '../css/style.css'
import { Actor, Engine, Vector } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!");
        const fish = new Actor();
        fish.graphics.use(Resources.Fish.toSprite());
        fish.pos = new Vector(400, 300);
        fish.vel = new Vector(-10,0);
        this.add(fish);

        const knight = new Actor();
        knight.graphics.use(Resources.Knight.toSprite());
        knight.pos = new Vector(50, 300);
        knight.vel = new Vector(10,0);
        this.add(knight);

        const bullet = new Actor();
        bullet.graphics.use(Resources.Bullet.toSprite());
        bullet.pos = new Vector(75, 300);
        bullet.vel = new Vector(30,0);
        this.add(bullet);

    }
}

new Game()
