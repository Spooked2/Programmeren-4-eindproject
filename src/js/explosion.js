import {CollisionType, Actor, ParticleEmitter, Color, EmitterType, Vector} from "excalibur";
import {Enemy} from "./enemy.js";

export class Explosion extends Actor {

    damage;
    radius;
    buffer = true;

    constructor(spawnPosition, damage, radius) {
        super({radius: radius, collisionType: CollisionType.Active});

        this.damage = damage;
        this.pos = spawnPosition;
    }

    onInitialize(engine) {

        this.on('collisionstart', (e) => {
            this.collisionHandler(e);
        })

        let emitter = new ParticleEmitter({
            emitterType: EmitterType.Circle,
            radius: this.radius,
            minVel: 250,
            maxVel: 500,
            minAngle: 0,
            maxAngle: 6.2,
            isEmitting: true,
            emitRate: 250,
            opacity: 0.24,
            fadeFlag: false,
            particleLife: 250,
            maxSize: 10,
            minSize: 1,
            startSize: 50,
            endSize: 1,
            acceleration: new Vector(0, -900),
            beginColor: Color.Red,
            endColor: Color.Yellow
        });

        this.addChild(emitter);
    }

    onPostUpdate(engine, delta) {
        if (!this.buffer) {
        this.kill();
        }

        this.buffer = false;

    }

    collisionHandler(e) {

        if ((e.other instanceof Enemy)) {
            e.other.damageBy(this.damage);
        }

    }


}