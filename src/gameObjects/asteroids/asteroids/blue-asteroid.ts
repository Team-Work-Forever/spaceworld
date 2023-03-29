import { Scene } from "phaser";
import { Asteroid } from "../asteroid";

var sprite: string = 'blue_asteroid';

export default class BlueAsteroid extends Asteroid {

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, sprite);
    }

    protected setAnimention(): void {
        this.scene.anims.create({
            key: 'spin' + '-' + sprite,
            frames: this.scene.anims.generateFrameNumbers(
                sprite,
                { start: 0, end: 14 }),
            frameRate: 10,
            repeat: -1
        });
    }

}