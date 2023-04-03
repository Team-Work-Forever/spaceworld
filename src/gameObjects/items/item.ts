import { Scene } from 'phaser';
import { ItemType } from './item-type';

export default class Item extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body;
    private _itemType: ItemType;

    constructor(scene: Scene, x: number, y: number, itemType: ItemType) {
        super(scene, x, y, itemType == ItemType.HEART ? 'heart' : 'item');

        this._itemType = itemType;

        // Define qual cristal escolher
        // Caso seja um heart
        this.setFrame(itemType == ItemType.HEART ? 1 : itemType, true);

        this.scene.physics.world.enableBody(this);
        this.scene.add.existing(this);
    }

    set itemType(itemType: ItemType) {
        this._itemType = itemType;
    }

    get itemType() {
        return this._itemType;
    }
}
