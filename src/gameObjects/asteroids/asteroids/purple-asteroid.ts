import { Scene } from "phaser";
import { Asteroid } from "../asteroid";

var sprite: string = 'purple_asteroid'

export default class PurpleAsteroid extends Asteroid {

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, sprite);
    }

    protected setAnimention(): void {
        this.scene.anims.create({
            key: 'spin' + '-' + sprite,
            frames: this.scene.anims.generateFrameNumbers(
                sprite,
                { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
    }

}