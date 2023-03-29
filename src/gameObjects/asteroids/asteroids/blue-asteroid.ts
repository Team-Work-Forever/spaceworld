import { Scene } from "phaser";
import { ItemType } from "../../items/item-type";
import { Asteroid } from "../asteroid";

var sprite: string = 'blue_asteroid';

export default class BlueAsteroid extends Asteroid {

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, sprite, ItemType.BLUE);
    }

    protected setSpin(): void {
        this.scene.anims.create({
            key: 'spin' + '-' + sprite,
            frames: this.scene.anims.generateFrameNumbers(
                sprite,
                { start: 0, end: 14 }),
            frameRate: 10,
            repeat: -1
        });
    }

    protected setExplode(): void {
        this.scene.anims.create({
            key: 'explode' + '-' + sprite,
            frames: [{
                key: sprite,
                frame: 15
            }],
            frameRate: 1,
            repeat: -1
        });
    }

}