import MainScene from '../../scenes/main-scene';
import Item from '../items/item';
import { ItemType } from '../items/item-type';

export class Asteroid extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body;
    declare scene: MainScene;
    private _sprite: string;
    private _itemType: ItemType;

    constructor(
        scene: MainScene,
        x: number,
        y: number,
        sprite: string,
        itemType: ItemType,
    ) {
        super(scene, x, y, sprite, itemType);

        this._sprite = sprite;
        this._itemType = itemType;

        this.setSpin();
        this.setExplode();

        this.scene.physics.world.enableBody(this);
        this.scene.add.existing(this);
    }

    protected setSpin() {}

    protected setExplode(): void {}

    // TODO: Drop Item
    override destroy(fromScene?: boolean): void {
        this.scene._itemGroup.add(
            new Item(this.scene, this.x, this.y, this._itemType),
        );
        super.destroy(fromScene);
    }

    get sprite() {
        return this._sprite;
    }
}
