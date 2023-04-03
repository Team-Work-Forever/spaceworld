import { Scene } from 'phaser';
import { ItemType } from './item-type';

export default class Item extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body;
    private _itemType: ItemType;
    private _probability: number;

    constructor(
        scene: Scene,
        x: number,
        y: number,
        itemType: ItemType,
        sprite: string,
        probability: number,
    ) {
        super(scene, x, y, sprite);

        this._itemType = itemType;
        this._probability = probability;

        this.scene.physics.world.enableBody(this);
        this.scene.add.existing(this);
    }

    set itemType(itemType: ItemType) {
        this._itemType = itemType;
    }

    get itemType() {
        return this._itemType;
    }

    get probability() {
        return this._probability;
    }
}
