import { Scene } from 'phaser';
import { ItemType } from './item-type';

export default class Item extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body;
    private _itemType: ItemType;

    constructor(scene: Scene, x: number, y: number, itemType: ItemType) {
        super(scene, x, y, 'item');

        this._itemType = itemType;

        // Define qual cristal escolher
        this.setFrame(itemType, true);

        this.scene.physics.world.enableBody(this);
        this.scene.add.existing(this);
    }

    // display(x: number, y: number) {
    //     this.body.reset(x, y);
    //     this.setActive(true);
    //     this.setVisible(true);

    //     this.setVelocityX(70);
    //     this.setVelocityY(70);
    // }

    set itemType(itemType: ItemType) {
        this._itemType = itemType;
    }

    get itemType() {
        return this._itemType;
    }
}
