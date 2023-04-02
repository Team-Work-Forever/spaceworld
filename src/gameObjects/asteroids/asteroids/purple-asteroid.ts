import MainScene from "../../../scenes/main-scene";
import { ItemType } from "../../items/item-type";
import { Asteroid } from "../asteroid";

var sprite: string = 'purple_asteroid'

export default class PurpleAsteroid extends Asteroid {

    constructor(scene: MainScene, x: number, y: number) {
        super(scene, x, y, sprite, ItemType.PURPLE);
    }

    protected setSpin(): void {
        this.scene.anims.create({
            key: 'spin' + '-' + sprite,
            frames: this.scene.anims.generateFrameNumbers(
                sprite,
                { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
    }

    protected setExplode(): void {
        this.scene.anims.create({
            key: 'explode' + '-' + sprite,
            frames: [{
                key: sprite,
                frame: 10
            }],
            frameRate: 1
        });
    }

}